const meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]
const reservasRealizadas = []


function NombreyApellido(){
    alert("Es importante que se complete con los datos del responsable, ya que los mismos serán registrados")
    var nombre
    var apellido
    
    while(true){
    nombre = prompt("Ingrese su nombre:")
    apellido = prompt("Ingrese su apellido:")

    console.log("Nombre y Apellido: "+nombre+" "+apellido)
    if(nombre && apellido){
        alert("Hola, "+ nombre + " " + apellido + "\nBienvenido.")
        break
    }
    else{
        alert("Por favor,ingrese su nombre y apellido correctamente")
    }
    }
}


function obtenerDiasEnElMes(mes){
    mes = mes.toLowerCase()
    if(!meses.includes(mes)){
        alert("Error.Ingrese un mes valido")
    }

switch (mes){ 
    case "enero":
    case "marzo":
    case "mayo":
    case "julio" :
    case "agosto":
    case "octubre":
    case "diciembre":
    return 31

    case "febrero":
    return 29
    
    case "abril":
    case "junio":
    case "septiembre":
    case "noviembre":
    return 30

}
}

function realizarReserva(){
    var reservaMesdeviaje = prompt("Ingrese el mes que desea viajar, de Enero a Diciembre")
    var reservaDiadeviaje = parseInt(prompt("Ingrese el numero del dia que desea reservar"))

    var DiasEnElMes = obtenerDiasEnElMes(reservaMesdeviaje)

    console.log("El mes seleccionado tiene"+" "+ DiasEnElMes)
    if( DiasEnElMes === 0){
        alert("Por favor ingrese un nombre de mes valido")
    }else if( reservaDiadeviaje >=1 && reservaDiadeviaje<=DiasEnElMes){ /*rango de dias segun el mes ingresado*/

        var reserva ={
            mes: reservaMesdeviaje,
            dia: reservaDiadeviaje
        }
        
        reservasRealizadas.push(reserva)
        alert("Buenisimo! reservamos tu viaje para el día"+ " " + reservaDiadeviaje +" "+ "de " + reservaMesdeviaje+"\nSi desea modificar su reserva, contactarse con holaviaje@viaje.com")
    }
    else{
        alert("No tenemos disponibilidad.Por favor,ingrese otro día.")
    }

}

NombreyApellido()

realizarReserva()

console.log("Reservas realizadas:");

console.log(reservasRealizadas)




/*hacer que  guarde el array a pesar que se reinicie la pagnina que guarde para siempre*/


/*tener en cuenta que debo sacar los dias que vaya inscribiendo y actualizando lo que tengo disponible*/






/*preguntar si puedo usr:

preguntar tambien si se ppuede guardar siempre o no

*/
