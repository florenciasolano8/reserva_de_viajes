let reservationStorage = localStorage.getItem("cartPacks")
reservationStorage = reservationStorage ? JSON.parse(reservationStorage) : []

let cart = document.getElementById("reservation")

function reservationCart(cartItems) {
  let totalToPay = 0
  let err = ""
  const cardsContainer = document.createElement("div")
  cardsContainer.classList.add("cards-container")

  try{
  cartItems.forEach((item, index) => {
    const card = document.createElement("div")
    const total = item.price * item.quantity
    totalToPay += total
    card.classList.add("card")
    card.innerHTML = `
                        <div class="card-body">
                        <h2 class= "card-title">${item.title}</h2>
                        <p class="card-text">Cantidad de vuelos:  ${item.quantity}</p>
                        <p class="card-text">Total: $${total}</p>
                        <button class="delete-btn" onclick="deleteCard(${index})"> X </button>
                        </div>`
    cardsContainer.appendChild(card)
  })
}catch(error){
  console.error("Error al generar las tarjetas",error)
  err=error
}
  cart.appendChild(cardsContainer)


  const totalFinal = document.createElement("div")
  totalFinal.classList.add("totalfinal")
  totalFinal.innerHTML = `
                         <button class="button-clear btn " onclick="deleteAllCards()">Vaciar carrito</button>
                         <h3 class="subtitulopagar">TOTAL A PAGAR: $${totalToPay}</h3>`
  cart.appendChild(totalFinal)
}


function deleteAllCards() {
  Swal.fire({
    title: "Estas seguro?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Si vaciar!"
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("cartPacks")
      document.getElementById("reservation").innerHTML = ""
      document.getElementById("message").innerHTML = ""
      reservationCart([])

      Swal.fire({
        title: "Listo!",
        icon: "success"
      })
    }
  })

}

function deleteCard(index) {
  Swal.fire({
    title: "Estas seguro?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Si borrar!"
  }).then((result) => {
    if (result.isConfirmed) {
      reservationStorage.splice(index, 1)
      localStorage.setItem("cartPacks", JSON.stringify(reservationStorage))
      document.getElementById("reservation").innerHTML = ""
      reservationCart(reservationStorage)

      Swal.fire({
        title: "Borrado!",
        icon: "success"
      })
    }
  })

}

function clearForm() {
  Swal.fire({
    title: "Estas seguro?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Si borrar!"
  }).then((result) => {
    if (result.isConfirmed) {

      const name = document.getElementById("name").value
      const lastname = document.getElementById("lastname").value
      const date = document.getElementById("datePicker").value

      let reservations = localStorage.getItem("reservations")
      reservations = reservations ? JSON.parse(reservations) : []

      const reservationIndex = reservations.findIndex(reservation =>
        reservation.name === name &&
        reservation.lastName === lastname &&
        reservation.date === date
      )

      if (reservationIndex !== -1) {
        reservations.splice(reservationIndex, 1)
        localStorage.setItem("reservations", JSON.stringify(reservations))
      }
      document.getElementById("name").value = ""
      document.getElementById("lastname").value = ""
      document.getElementById("datePicker").value = ""
      document.getElementById("message").innerHTML = ""



      Swal.fire({
        title: "Reserva eliminada!",
        icon: "success"
      })
    }
  })


}

reservationCart(reservationStorage)

/* The minimum day for booking is today. */

const { DateTime } = luxon
const today = DateTime.now().toFormat('yyyy-MM-dd')
const inputDate = document.getElementById('datePicker')
if (inputDate) {
  inputDate.setAttribute('min', today)
}



let inputName = document.getElementById("name")
let inputLastName = document.getElementById("lastname")
let searchBtn = document.getElementById("searchBtn")
let message = document.getElementById("message")

if (inputDate && searchBtn) {
  searchBtn.onclick = () => {
    const nameValue = inputName.value
    const lastNameValue = inputLastName.value
    const dateValue = inputDate.value

    const namePattern = /^[a-zA-Z]+$/

    if (!nameValue || !lastNameValue || !dateValue) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor completa todos los campos",
      })
      return
    }

    if (!nameValue.match(namePattern) || !lastNameValue.match(namePattern)) {

      Toastify({
        text: "Ingrese solo letras en los campos nombre y apellido",
        duration: 4000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #3a47b4, #a25be8)",
        },
        onClick: function () { }
      }).showToast()
      return
    }

    let reservations = localStorage.getItem("reservations")
    reservations = reservations ? JSON.parse(reservations) : []

    const existingReservation = reservations.find(
      (reserva) => reserva.date === dateValue
    )
    if (existingReservation) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ya hay una reserva para esa fecha ",
      })
      message.innerHTML = `<p>Ya hay una reserva para el ${dateValue} . Ingrese otra fecha</p>`
    }
    else {

      const reserva = {
        name: nameValue,
        lastName: lastNameValue,
        date: dateValue,
      }

      reservations.push(reserva)
      localStorage.setItem("reservations", JSON.stringify(reservations))
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Reservado",
        showConfirmButton: false,
        timer: 1500
      })
      message.innerHTML = `<p>${nameValue} ${lastNameValue} tiene una reserva para el ${dateValue} </p>`

    }
  }

}

/* I'll integrate my holidays API into the booking calendar.*/

fetch("../db/holidays.JSON")
  .then(response => response.json())
  .then(data => {
    const holidays = data.map(item => item.fecha)

    inputDate.addEventListener('change', (event) => {
      const selectedDate = event.target.value
      if (holidays.includes(selectedDate)) {
        Swal.fire({
          icon: "error",
          title: "Feriado"
        }).then(() => {
          inputDate.value = ""
        })
      }
    })
  })

/*show current time with Luxon*/

const now = DateTime.now()
const footer = document.getElementsByName('footer')
message.innerHTML = now.toLocaleString(DateTime.DATETIME_SHORT)
message.innerHTML = now.toFormat('dd/MM/yyyy HH:mm')