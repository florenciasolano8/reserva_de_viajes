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


