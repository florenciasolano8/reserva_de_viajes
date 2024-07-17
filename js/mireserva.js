let reservationStorage = localStorage.getItem("cartPacks");
reservationStorage = reservationStorage ? JSON.parse(reservationStorage) : [];

let cart = document.getElementById("reservation");

function reservationCart(cartItems) {
    let totalToPay = 0;
    const cardsContainer = document.createElement("div");
    cardsContainer.classList.add("cards-container");
    cartItems.forEach((item) => {
        const card = document.createElement("div");
        const total = item.price * item.quantity;
        totalToPay += total;
        card.classList.add("card");
        card.innerHTML = `
                        <div class="card-body">
                        <h2 class= "card-title">${item.title}</h2>
                        <p class="card-text">Cantidad de vuelos:  ${item.quantity}</p>
                        <p class="card-text">Total: $${total}</p>
                        <button class="delete-btn" onclick="deleteCard(event)"> X </button>
                        </div>` 
        cardsContainer.appendChild(card);
    });
    cart.appendChild(cardsContainer);


    const totalFinal = document.createElement("div");
    totalFinal.classList.add("totalfinal");
    totalFinal.innerHTML = `<h3 class="subtitulopagar">TOTAL A PAGAR: $${totalToPay}</h3>
                         <button class="button-clear btn " onclick="deleteAllCards()">Vaciar carrito</button>`;
    cart.appendChild(totalFinal);
}

function deleteAllCards() {
    localStorage.removeItem("cartPacks");
    document.getElementById("reservation").innerHTML = "";
    reservationCart([]);
}

function deleteCard(index) {
    reservationStorage.splice(index, 1);
    localStorage.setItem("cartPacks", JSON.stringify(reservationStorage));

    document.getElementById("reservation").innerHTML = "";
    reservationCart(reservationStorage);
}

function clearForm(){
    const name = document.getElementById("name").value
    const lastname = document.getElementById("lastname").value
    const month = document.getElementById("searchMonth").value.toLowerCase()
    const day = parseInt(document.getElementById("searchDay").value)

    let reservations = localStorage.getItem("reservations")    
    reservations = reservations ? JSON.parse(reservations) : []     //ver esto 

    const reservationIndex = reservations.findIndex(reservation =>
        reservation.name === name &&
        reservation.lastName === lastname &&
        reservation.month === month &&
        reservation.day === day
    )

    if(reservationIndex !== -1){
        reservations.splice(reservationIndex, 1)
        localStorage.setItem("reservations", JSON.stringify(reservations))
    }
    document.getElementById("name").value = ""
    document.getElementById("lastname").value = ""
    document.getElementById("searchMonth").value = ""
    document.getElementById("searchDay").value = ""
    
}

reservationCart(reservationStorage);



const months = [
    { monthname: "enero", days: 31 },
    { monthname: "febrero", days: 29 },
    { monthname: "marzo", days: 31 },
    { monthname: "abril", days: 30 },
    { monthname: "mayo", days: 31 },
    { monthname: "junio", days: 30 },
    { monthname: "julio", days: 31 },
    { monthname: "agosto", days: 31 },
    { monthname: "septiembre", days: 30 },
    { monthname: "octubre", days: 31 },
    { monthname: "noviembre", days: 30 },
    { monthname: "diciembre", days: 31 },
];

let inputName = document.getElementById("name");
let inputLastName = document.getElementById("lastname");
let inputMonth = document.getElementById("searchMonth");
let inputDay = document.getElementById("searchDay");
let searchBtn = document.getElementById("searchBtn");

if (inputMonth && inputDay && searchBtn) {
    searchBtn.onclick = () => {
        const nameValue = inputName.value;
        const lastNameValue = inputLastName.value;
        const monthValue = inputMonth.value.toLowerCase();
        const dayValue = parseInt(inputDay.value);
        const element = months.find(
            (month) => month.monthname.toLowerCase() === monthValue
        );

        let reservations = localStorage.getItem("reservations");
        reservations = reservations ? JSON.parse(reservations) : [];

        if (!element || !(dayValue > 0 && dayValue <= element.days)) {
            message.innerHTML = `<p><br>No tenemos disponible</p>`;
        } else {
            const existingReservation = reservations.find(
                (reserva) => reserva.month === monthValue && reserva.day === dayValue
            );
            if (existingReservation) {
                message.innerHTML = `<p>Ya hay una reserva para el ${dayValue} de ${element.monthname}. Ingrese otra fecha</p>`;
            }
            else{

                const reserva = {
                    name: nameValue,
                    lastName: lastNameValue,
                    month: monthValue,
                    day: dayValue,
                };

                reservations.push(reserva);
                localStorage.setItem("reservations", JSON.stringify(reservations));
                message.innerHTML = `<p>${nameValue} ${lastNameValue} tiene una reserva para el ${dayValue} de ${element.monthname}</p>`;
            }
        }
    };
}
