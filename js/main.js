const packs = [

{
    id: 1,
    title:"Aventura en la naturaleza",
    subtitle:"Destinos incluidos:",
    destination1: "Patagonia Argentina",
    destination2: "Costa Rica",
    duration: "14 dias",
    price: 5000
},
{
    id: 2,
    title:"Cultura y Tradición",
    subtitle:"Destinos incluidos:",
    destination1: "Japon",
    destination2: "Italia",
    duration: "12 dias",
    price: 5100
},
{
    id: 3,
    title:"Relax y Bienestar",
    subtitle:"Destinos incluidos:",
    destination1: "Islas Maldivas",
    destination2: "Tailandia",
    duration: "10 dias",
    price: 6000
}
]

let cartPacks = []
let combos = document.getElementById("packs")
function showpacks (itemsArray){
    itemsArray.forEach(item =>{
        const card = document.createElement("div")
        card.classList.add("card")
        card.innerHTML = `
                         <div class="card-body">
                          <h2 class= "card-title">${item.title}</h2>
                          <h3 class= "card-title">${item.subtitle}</h3>         
                          <p class= "card-text">* ${item.destination1}</p> 
                          <p class= "card-text">* ${item.destination2}</p> 
                          <p class= "card-text"> 🗓️ ${item.duration}</p>    
                          <p class= "card-text">$ ${item.price} por persona</p>              
                         <button class="packReserve" id="${item.id}">Reserve </button>
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
            
            let itemExist = cartPacks.find(item => item.id == selectedPack.id)  
            if(itemExist){
                itemExist.quantity = itemExist.quantity +1
           }
            else{
            selectedPack.quantity = 1
            cartPacks.push(selectedPack)

           }
           
            console.log(cartPacks) 
       
            localStorage.setItem("cartPacks",JSON. stringify(cartPacks))
       
        }
    })

}  


