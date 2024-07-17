const packs = [
{
    id: 1,
    image: "img/aventuraenlanaturaleza.png" ,
    title:"Aventura y Naturaleza",
    duration: "14 dias",
    price: 5000
},
{
    id: 2,
    image: "img/culturaytradicion.png" ,
    title:"Cultura y Tradición",
    duration: "12 dias",
    price: 5100
},
{
    id: 3,
    image: "img/relaxybienestar.png" ,
    title:"Relax y Bienestar",
    duration: "10 dias",
    price: 6000
}
]

let cartPacks = loadCartPacks()

function loadCartPacks(){
    const storedCartsPacks = localStorage.getItem("cartPacks")
    return storedCartsPacks ? JSON.parse(storedCartsPacks) : []
}

function saveCartPacks(){
    localStorage.setItem("cartPacks", JSON.stringify(cartPacks))
}




function showpacks (itemsArray){
    let combos = document.getElementById("packs")
    combos.innerHTML=""
    itemsArray.forEach(item =>{
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
    addReservationButton()
}
showpacks(packs)

function addReservationButton(){
    addButton = document.querySelectorAll(".packReserve")
    addButton.forEach(button=>{
        button.onclick = (e)=>{
            const itemId = e.currentTarget.id
            const selectedPack = packs.find(item => item.id == itemId)
            
            const quantityInput = document.querySelector(`#quantity-${itemId}`)
            const quantity = parseInt(quantityInput.value)

            
            if(isNaN(quantity) || quantity < 1){
               alert("ERRORR, aca va una card")
                return
            }


            let itemExist = cartPacks.find(item => item.id == selectedPack.id)  
            if(itemExist){
                itemExist.quantity = quantity
           }
            else{
            selectedPack.quantity = quantity
            cartPacks.push(selectedPack)

           }
           
            console.log(cartPacks) 
            saveCartPacks()
       
       
        }
    })

}  

