let reservaStorage = localStorage.getItem("cartPacks")
reservaStorage = JSON.parse(reservaStorage)

let cart = document.getElementById("reservation")

function carrito(cartItems){
    let totalPagar = 0
    cartItems.forEach(item =>{
        const card = document.createElement("div")
        const total = item.precio * item.cantidad
        totalPagar += total
        card.innerHTML =  `
                        <h2>${item.titulo}</h2>
                        <p>Cantidad de vuelos:  ${item.cantidad}</p>
                        <p>Total: $${total}</p>`
                        cart.appendChild(card)
    })
    const totalFinal= document.createElement("div")
    totalFinal.innerHTML= `
                        <h3>TOTAL A PAGAR: $${totalPagar}</h3>`
                        cart.appendChild(totalFinal)
                    }
carrito(reservaStorage)