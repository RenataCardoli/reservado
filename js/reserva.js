//OBJETO RESERVA
var Reserva = function(horario, cantidadPersonas, precioPorPersona, codigoDescuento)
{
    //PROPIEDADES
    this.horario = horario;
    this.cantidadPersonas = cantidadPersonas;
    this.precioPorPersona = precioPorPersona;
    this.codigoDescuento = codigoDescuento;
}

//METODOS
Reserva.prototype.CalcularPrecioBase = function(){
    return this.cantidadPersonas * this.precioPorPersona;
}

Reserva.prototype.CalcularPrecioTotal = function(){
    var monto = this.CalcularPrecioBase();
    monto = AgregarAdicionales(monto, this.horario);
    monto = AplicarDescuento(monto, this.codigoDescuento, this.cantidadPersonas, this.precioPorPersona);
    return monto;
}


//REFACTORING

function AgregarAdicionales(monto, fecha){
    var precioConAdicionales = monto;
    
    //Adicional por franja horaria
    if ( (fecha.getHours() >= 13 && fecha.getHours() <= 14) || (fecha.getHours() >= 20 && fecha.getHours() <= 21) )
    {
        precioConAdicionales = precioConAdicionales + ( (5 * precioConAdicionales) / 100 );
    }

    //Adicional por día de la semana
    var dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", ];
    if (dias[fecha.getDay()] == "Viernes" || dias[fecha.getDay()] == "Sabado" || dias[fecha.getDay()] == "Domingo")
    {
        precioConAdicionales = precioConAdicionales + ( (10 * precioConAdicionales) / 100 );
    }

    return Math.round(precioConAdicionales * 10) / 10;
}


function AplicarDescuento(monto, codigo, cantidadPersonas, precioPorPersona){
    var precioConDescuento = monto;

    if (cantidadPersonas >= 4 || cantidadPersonas <= 6)
    {
        precioConDescuento = precioConDescuento - ( (5 * precioConDescuento) / 100 );
    }

    if (cantidadPersonas >= 7 || cantidadPersonas <= 8)
    {
        precioConDescuento = precioConDescuento - ( (10 * precioConDescuento) / 100 );
    }

    if (cantidadPersonas >= 8)
    {
        precioConDescuento = precioConDescuento - ( (15 * precioConDescuento) / 100 );
    }

    switch(codigo)
    {
        case "DES15":
            precioConDescuento = precioConDescuento - ( (15 * precioConDescuento) / 100 );
            break;
        case "DES200":
            precioConDescuento = precioConDescuento - 200;
            break;
        case "DES1":
            precioConDescuento = precioConDescuento - precioPorPersona;
            break;
    }

    return Math.round(precioConDescuento * 10) / 10;
}


//IMPLEMENTACION

var reservar = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
var reservarNuevamente = new Reserva (new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");

/* OBSERVACION
En la guía:  3.2 Reservando - Guia 3, no se especifica si el descuento sobre el codigo es aplicable antes o despues del descuento por cantidad de personas. En mi caso apliqué primero el de cantidad de personas, y luego el de codigo de descuento.

Por otra parte, por lo que entiendo indica que el descuento por grupos es:
>= 4 y <= 6
>= 6 y <= 8
> 8

Entre el primero y el segundo no se contempla si son 6, es decir si entra en el primer descuento o en el segundo.
Yo utilice:
>= 4 y <= 6
>= 7 y <= 8  (entre 7 y 8 personas)
> 8

*/ 