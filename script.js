let shoppingList=[]

const newItemInput=document.getElementById('new-item-input')
const addItemButton= document.getElementById("add-item-btn")
const clearListButton= document.getElementById("clear-list-btn")
const shoppingListContainer= document.getElementById("shopping-list")

if(localStorage.getItem("shoppingList")){
    shoppingList=JSON.parse(localStorage.getItem("shoppingList"))
    renderShoppingList()
}

addItemButton.addEventListener("click", addItem)
shoppingListContainer.addEventListener("click", togglePurchased)
clearListButton.addEventListener("click",clearList)

function addItem(event){
    event.preventDefault()
    const itemName = newItemInput.value.trim()

    if(itemName !== ''){
        const newItem={
            id:Date.now(),
            name:itemName,
            purchased:false
        }
        shoppingList.push(newItem)
        saveToLocalStorage()
        newItemInput.value=''
        renderShoppingList()

    
    }
}

function renderShoppingList(){
    shoppingListContainer.innerHTML=''
    shoppingList.forEach(item =>{
        const li =document.createElement('li')
        li.dataset.id=item.id
        li.textContent=item.name

        if(item.purchased){
            li.classList.add('purchased')
        }
        const markButton= document.createElement('button')
        markButton.textContent=item.purchased?'Unmark' : "Mark"
        li.appendChild(markButton)

        shoppingListContainer.appendChild(li)
    })
}

function togglePurchased(event){
    if(event.target.tagName==="BUTTON"){
        const itemId=parseInt(event.target.parentElement.dataset.id)
        const selectedItem= shoppingList.find(item=>item.id=== itemId)

        if(selectedItem){
            selectedItem.purchased = !selectedItem.purchased
            saveToLocalStorage()
            renderShoppingList()
        }
    }
}
function clearList(){
    shoppingList=[]
    saveToLocalStorage()
    renderShoppingList()
}

function saveToLocalStorage(){
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList))
}