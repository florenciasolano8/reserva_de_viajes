let reservaStorage = localStorage.getItem("cartPacks")
reservaStorage = reservaStorage ? JSON.parse(reservaStorage) : []

let cart = document.getElementById("reservation")

function carrito(cartItems){
    let totalPagar = 0
    const cardsContainer = document.createElement("div")
    cardsContainer.classList.add("cards-container")
    cartItems.forEach(item =>{
        
        const card = document.createElement("div")
        const total = item.precio * item.cantidad
        totalPagar += total
        card.classList.add("card")
        card.innerHTML =  `
                        <div class="card-body">
                        <h2 class= "card-title">${item.titulo}</h2>
                        <p class="card-text">Cantidad de vuelos:  ${item.cantidad}</p>
                        <p class="card-text">Total: $${total}</p>
                        </div>`
                        cardsContainer.appendChild(card)
    })
            cart.appendChild(cardsContainer)
    
    const totalFinal= document.createElement("div")
    totalFinal.classList.add("totalfinal")
    totalFinal.innerHTML= `
                        <h3 class="subtitulopagar">TOTAL A PAGAR: $${totalPagar}</h3>`
                        cart.appendChild(totalFinal)
                    }
carrito(reservaStorage)



const meses = [
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
    
 document.addEventListener('DOMContentLoaded', function(){   
 let inputNombre = document.getElementById("nombre")
 let inputApellido = document.getElementById("apellido")
 let inputMes = document.getElementById("searchMes")
 let inputDia = document.getElementById("searchDia")
 let searchBtn = document.getElementById("searchBtn")

 
if(inputMes && inputDia && searchBtn){
    searchBtn.onclick = () =>{
        const nombreValue = inputNombre.value
        const apellidoValue = inputApellido.value
        const mesValue = inputMes.value.toLowerCase()
        const diaValue = parseInt(inputDia.value)
        const element = meses.find ((mes) => mes.nombremes.toLowerCase() === mesValue)
    
        let reservas = localStorage.getItem('reservas')
        reservas = reservas ? JSON.parse(reservas) : []  
        
       
            if(!element || !(diaValue > 0 && diaValue <=element.dias)){
               console.log(`No tenemos disponible`)
               }else{
                const reservaExistente = reservas.find(reserva =>
                    reserva.mes === mesValue && reserva.dia === diaValue
                )
            if(reservaExistente){
                    console.log(`Ya hay una reserva para el ${diaValue} de ${element.nombremes}. Ingrese otra fecha`)

                }
                else{
                    console.log(`Tenemos disponible el ${diaValue} de ${element.nombremes} `)

                    const reserva={
                        nombre:nombreValue,
                        apellido:apellidoValue,
                        mes:mesValue,
                        dia:diaValue
                    }

                    reservas.push(reserva)
                    localStorage.setItem('reservas', JSON.stringify(reservas))
                    mensaje.innerHTML= `<p>${nombreValue} ${apellidoValue} tiene una reserva para el ${diaValue} de ${element.nombremes}</p>`
                }
               }
            }
    }
})


