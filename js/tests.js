var expect = chai.expect

// teste de horarios, si es valido retiro uno, si es válido y esta disponible, si el horario no existe y no es valido..

describe('Reserva de horarios', function(){
it('Cuando quiero reservar un horario valido, el array de horarios se disminuye en 1', function(){
    var restaurant = new Restaurant(1,
        'nombre',
        'rubro',
        'ubicacion',
        ['10','11','12'],
        'imagen',
        [2,3]);

        var cantidadPrevia = restaurant.horarios.length;
        restaurant.reservarHorario('11');
        expect(restaurant.horarios).to.not.include('11');
        expect(restaurant.horarios.length).to.equal(cantidadPrevia - 1);
})

})


describe('Reserva de un horario no disponible', function(){
	it('El horario a reservar no está disponible en la lista de horarios del restaurant',function(){
        var idRestaurante = 4;             //El restaurant con Id 4 es Bleecker Street Pizza
        var horarioReservar = "22:00"      //Este horario no existe en el listado de horarios disponibles de este restaurant
      
        var rest = listado.buscarRestaurante(idRestaurante);  //obtengo el objeto restaurante
        
        var HorariosAntesDeReservar = [];   //Guardo en un array los horarios del restaurant antes de hacer la reserva (uso push para evitar que se pase por referencia y no por valor)
        for (var i = 0; i < rest.horarios.length; i++)
        {
            HorariosAntesDeReservar.push(rest.horarios[i]);
        }
       
        listado.reservarUnHorario(idRestaurante, horarioReservar);  //se hace la reserva

        for(var i = 0; i < rest.horarios.length; i++)  //comparo cada posicion del restaurante luego de la reserva, con el array de los horarios antes de reservar
        {
            expect(rest.horarios[i]).to.equal(HorariosAntesDeReservar[i]);  //hago la comparacion del objeto restaurante con el arreglo antes de la reserva
        }        
	})
})


//TESTS DE LA FUNCION obtenerPuntuacion() 

describe('El promedio de calificaciones se calcula correctamente', function(){
	it('Verificar que el promedio se calcule correctamente',function(){
        var idRestaurante = 1;        //El restaurant con Id 1 es TAO Uptown, con calificaciones [6, 7, 9, 10, 5]

        var rest = listado.buscarRestaurante(idRestaurante);  //obtengo el objeto restaurante
        
        var sumaDeCalificaciones = 0;   //guardo las calificaciones del resturant para sacar el promedio esperado
        for (var i = 0; i < rest.calificaciones.length; i++)
        {
            sumaDeCalificaciones += rest.calificaciones[i];
        }
        var promedioEsperado = sumaDeCalificaciones / rest.calificaciones.length;  //obtengo el promedio esperado

        expect(rest.obtenerPuntuacion()).to.equal(promedioEsperado);  //hago la comparacion del promedio obtenido por el objeto restaurante con el promedio esperado calculado anteriormente
	})
})

describe('Restaurant sin calificaciones con promedio 0', function(){
	it('Verificar que el promedio sea 0 cuando el restaurant no tiene calificaciones',function(){
        //creo un restaurant sin calificaciones
        var rest = new Restaurant(6, "Green salad", "Ensalada", "Berlín", ["17:00", "19:00", "20:30"], "../img/ensalada2.jpg", []);

        expect(rest.obtenerPuntuacion()).to.equal(0);
	})
})

// TESTS DE LA FUNCION calificar()


describe('La calificación se agrega correctamente al restaurant', function(){
	it('Verificar que dada una calificacion mayor a 0 y menor a 10, se ingrese correctamente al arreglo de calificaciones',function(){
        var idRestaurante = 8;        //El restaurant con Id 8 es Cafe Francoeur, con 5 calificaciones

        var rest = listado.buscarRestaurante(idRestaurante);  //obtengo el objeto restaurante
        var cantidadCalificacionesAntesDeCalificar = rest.calificaciones.length;  //guardo la cantidad de calificaciones

        rest.calificar(6);  //hago una calificacion

        expect(rest.calificaciones.length).to.equal(cantidadCalificacionesAntesDeCalificar + 1);  //la cantidad de calificaciones del restaurant ahora deben ser igual a la cantidad de calificaciones guardadas antes de calificar una nueva, + 1
	})
})


//TESTS DE LA FUNCION buscarRestaurante()

describe('Restaurant no encontrado', function(){
	it('Verificar que al buscar un restaurant inexistente, devuelta que no se encontró el restaurant',function(){
        var idRestaurante = 29;        //El restaurant con Id 29 no existe

        var rest = listado.buscarRestaurante(idRestaurante);  //Intento obtener el objeto restaurante
        
        expect(rest).to.equal("No se ha encontrado ningún restaurant");  
	})
})

//TESTS DE LA FUNCION obtenerRestaurantes()
describe('Obtener cantidad de restaurantes por parámetro', function(){
	it('Verificar que se obtengan los restaurantes esperados de acuerdo a los parámetros dados',function(){
        var cantidadRestaurantes = listado.obtenerRestaurantes.length;        //El restaurant con Id 29 no existe

        var rest = listado.obtenerRestaurantes("Pasta", "Roma", "14:30");  //Debe obtener como resultado un solo restaurant (el restaurant Pastasciutta)
        
        expect(rest.length).to.equal(1);  
	})
})

//TESTS DEL OBJETO RESERVA
describe('Calcular correctamente el precio base de una reserva', function(){
	it('Verificar que se obtengan el precio base esperado de reservar',function(){
        //Se usan las reservas creadas en Reserva.js para testear
        var precioBase = reservar.CalcularPrecioBase();
        expect(precioBase).to.equal(2800);  
    })
    it('Verificar que se obtengan el precio base esperado de reservarNuevamente',function(){
        //Se usan las reservas creadas en Reserva.js para testear
        var precioBase = reservarNuevamente.CalcularPrecioBase();
        expect(precioBase).to.equal(300);  
	})
})

describe('Calcular correctamente el precio final de una reserva', function(){
	it('Verificar que se obtengan el precio final esperado de reservar',function(){
        //Se usan las reservas creadas en Reserva.js para testear
        var precioFinal = reservar.CalcularPrecioTotal();
        expect(precioFinal).to.equal(1888.4);  
    })
    it('Verificar que se obtengan el precio final esperado de reservarNuevamente',function(){
        //Se usan las reservas creadas en Reserva.js para testear
        var precioFinal = reservarNuevamente.CalcularPrecioTotal();
        expect(precioFinal).to.equal(56.5);  
	})
})

