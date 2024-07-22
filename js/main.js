let cartPacks = loadCartPacks()

function loadCartPacks() {
    const storedCartsPacks = localStorage.getItem("cartPacks")
    return storedCartsPacks ? JSON.parse(storedCartsPacks) : []
}

function saveCartPacks() {
    localStorage.setItem("cartPacks", JSON.stringify(cartPacks))
}


let combos = document.getElementById("packs")
fetch("./db/packs.JSON")
    .then(response => response.json())
    .then(packs => {
        packs.forEach(item => {
            const card = document.createElement("div")
            card.classList.add("card")
            card.innerHTML = `
                         <div class="card-body">
                          <img  class="card-img-top" src="${item.image}" alt="naturaleza">
                          <h2 class= "card-title">${item.title}</h2>
                          <p class= "card-text"> 🗓️ ${item.duration}</p>    
                          <p class= "card-text">Desde $${item.price} por persona</p>        
                          <div class= "input-card">
                          <label for= "quantity-${item.id}">Cantidad de reservas</label>
                          <input type="number" id="quantity-${item.id}" name = "quantity-${item.id} value="1" min="1" required>
                          <button class="packReserve btn " id="${item.id}">Reservar </button>
                          </div>      
                        </div>`
            combos.appendChild(card)
        })
        addReservationButton(packs)
    })

    .catch(error => {
        console.error('error', error)
    })


function addReservationButton(packs) {
    addButton = document.querySelectorAll(".packReserve")
    addButton.forEach(button => {
        button.onclick = (e) => {
            const itemId = e.currentTarget.id
            const selectedPack = packs.find(item => item.id == itemId)

            const quantityInput = document.querySelector(`#quantity-${itemId}`)
            const quantity = parseInt(quantityInput.value)


            if (isNaN(quantity) || quantity < 1) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ingrese la cantidad de reserva que desea!",
                })
                return
            }


            let itemExist = cartPacks.find(item => item.id == selectedPack.id)
            if (itemExist) {
                itemExist.quantity = quantity
            }
            else {
                selectedPack.quantity = quantity
                cartPacks.push(selectedPack)

            }

            saveCartPacks()

            Toastify({
                text: "Reservado",
                duration: 4000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #3a47b4, #a25be8)",
                },
                onClick: function () { }
            }).showToast()


        }
    })

}

