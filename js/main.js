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
        card.classList.add("card")
        card.innerHTML = `
                         <div class="card-body">
                          <h2 class= "card-title">${item.titulo}</h2>
                          <h3 class= "card-title">${item.subtitulo}</h3>         
                          <p class= "card-text">* ${item.destino1}</p> 
                          <p class= "card-text">* ${item.destino2}</p> 
                          <p class= "card-text"> 🗓️ ${item.duracion}</p>    
                          <p class= "card-text">$ ${item.precio} por persona</p>              
                         <button class="btn btn-primary" id="${item.id}">Reservar </button>
                        </div>`
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
           
            console.log(cartPacks) 
       
            localStorage.setItem("cartPacks",JSON. stringify(cartPacks))
       
        }
    })

}  


