/*const meses = [
    { nombremes:"enero",dias:31},
    { nombremes:"febrero",dias:29},
    { nombremes:"marzo",dias:31},
    { nombremes:"abril",dias:30},
    { nombremes:"mayo",dias:31},
    { nombremes:"junio",dias:30},
    { nombremes:"julio",dias:31},
    { nombremes:"agosto",dias:31},
    { nombremes:"septiembre",dias:30},
    { nombremes:"octubre",dias:31},
    { nombremes:"noviembre",dias:30},
    { nombremes:"diciembre",dias:31}]

    const reservasRealizadas = []

function NombreyApellido(){
    alert("ℹ️ Es importante que se complete con los datos del responsable, ya que los mismos serán registrados ℹ️")
    let nombre
    let apellido
    
    while(true){
    nombre = prompt("Ingrese su nombre: 📝")
    apellido = prompt("Ingrese su apellido: 📝")

    console.log("Nombre y Apellido: "+nombre+" "+apellido +"😊")
    if(nombre && apellido){
        alert("Hola, "+ nombre + " " + apellido + "\nBienvenido!. 🙌")
        break
    }
    else{
        alert("Por favor,ingrese su nombre y apellido correctamente 👋👋")
    }
    }
}

*/
/*chequear esta funcion*/


/*
function obtenerDiasEnElMes(mes){
    mes = mes.toLowerCase()
    for(let i=0; i<meses.length; i++){
    if(meses[i].nombremes === mes){
        return meses[i].dias    
    }
}
    alert("Error. Ingrese un mes valido.")
    return 0
}

function realizarReserva(){
    let reservaMesdeviaje = prompt("Ingrese el Mes que desea viajar! 🗓️")
    let reservaDiadeviaje = parseInt(prompt("Ingrese el día que desea reservar 🗓️"))

    let DiasEnElMes = obtenerDiasEnElMes(reservaMesdeviaje)

    console.log("El mes seleccionado tiene"+" "+ DiasEnElMes+" dias 🗓️")
    if( DiasEnElMes === 0){
        alert("Por favor ingrese un nombre de mes valido!")
    }if( reservaDiadeviaje >=1 && reservaDiadeviaje<=DiasEnElMes){ 

        let reserva ={
            mes: reservaMesdeviaje,
            dia: reservaDiadeviaje
        }
        
        reservasRealizadas.push(reserva)
        alert("Buenisimo!🙌 Reservamos tu viaje para el día"+ " " + reservaDiadeviaje +" "+ "de " + reservaMesdeviaje+"\nSi desea modificar su reserva, contactarse con holaviaje@viaje.com 👋👋")
    }
    else{
        alert("No tenemos disponibilidad🤚.Por favor,ingrese otro día.")
    }

}

*/


const packs = [

{
    id: 1,
    titulo:"Aventura en la naturaleza",
    subtitulo:"Destinos incluidos:",
    destino1: "Patagonia Argentina",
    destino2: "Costa Rica",
    duracion: "14 dias",
    precio: 5000
},
{
    id: 2,
    titulo:"Cultura y Tradición",
    subtitulo:"Destinos incluidos:",
    destino1: "Japon",
    destino2: "Italia",
    duracion: "12 dias",
    precio: 5100
},
{
    id: 3,
    titulo:"Relax y Bienestar",
    subtitulo:"Destinos incluidos:",
    destino1: "Islas Maldivas",
    destino2: "Tailandia",
    duracion: "10 dias",
    precio: 6000
}
]

let cartPacks = []
let combos = document.getElementById("packs")
function showpacks (itemsArray){
    itemsArray.forEach(item =>{
        const card = document.createElement("div")
        card.innerHTML = `<h2>${item.titulo}</h2>
                          <h3>${item.subtitulo}</h3>         
                          <p>* ${item.destino1}</p> 
                          <p>* ${item.destino2}</p> 
                          <p> 🗓️ ${item.duracion}</p>    
                          <p>$ ${item.precio} por persona</p>              
                        <button class="packReservar" id="${item.id}">Reservar </button>`
        combos.appendChild(card)    
    })
    addReservationButton()
}
showpacks(packs)

function addReservationButton(){
    addButton = document.querySelectorAll(".packReservar")
    addButton.forEach(button=>{
        button.onclick = (e)=>{
            const itemId = e.currentTarget.id
            const selectedPack = packs.find(item => item.id == itemId)
            
            let existeItem = cartPacks.find(item => item.id == selectedPack.id)  
            if(existeItem){
            existeItem.cantidad = existeItem.cantidad +1
           }
            else{
            selectedPack.cantidad = 1
            cartPacks.push(selectedPack)

           }
           
            console.log(cartPacks)  /*preguntar de este console*/
       
            localStorage.setItem("cartPacks",JSON. stringify(cartPacks))
       
        }
    })

}  


