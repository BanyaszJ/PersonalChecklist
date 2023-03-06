const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
const colorsArray = localStorage.getItem('colors') ? JSON.parse(localStorage.getItem('colors')) : [];
// const firstDayOnTheJob = localStorage.getItem('isFirstDay') ? JSON.parse(localStorage.getItem('isFirstDay')) : [];
var firstDayOnTheJob = localStorage.getItem("first_time");
const defaults = ["1. Welcome", "2. Drink coffee", "3. Help"]

if(!firstDayOnTheJob) {
    localStorage.setItem("first_time","1");
    initialize_itemsArray();
}

document.querySelector("#add").addEventListener("click", () => {
  const item = document.querySelector("#new_item")
  createItem(item)
})

document.querySelector("#new_item").addEventListener("keypress", (add) => {
  if(add.key === "Enter"){
    const item = document.querySelector("#new_item")
    createItem(item)
  }
})

function initialize_itemsArray(){

  // var fs = require("fs");
  // var text = fs.readFileSync("./default.txt");
  // var textByLine = text.split(";;;")
  for(let i=0; i<defaults.length; i++){

    itemsArray.push(defaults[i])
    colorsArray.push("#5b7065")
    localStorage.setItem('items', JSON.stringify(itemsArray))
    localStorage.setItem('colors', JSON.stringify(colorsArray))
  }
  // localStorage.setItem('isfirstday', JSON.stringify(firstDayOnTheJob))
  // location.reload()
}

function displayItems(){
  let items = ""
  for(let i = 0; i < itemsArray.length; i++){
    items += `<div class="new_item" id="colorarea">
                <div class="input-controller">
                  <textarea disabled>${itemsArray[i]}</textarea>
                  <div class="edit-controller">
                    <i class="fa-solid fa-check strikeBtn"></i>
                    <i class="fa-solid fa-pen-to-square editBtn"></i>
                    <i class="fa-solid fa-trash deleteBtn"></i>
                  </div>
                </div>
                <div class="update-controller">
                  <button class="saveBtn">Save</button>
                  <button class="cancelBtn">Cancel</button>
                </div>
              </div>`
  }
  document.querySelector(".to-do-list").innerHTML = items
  activateStrikeListeners()
  activateEditListeners()
  activateSaveListeners()
  activateCancelListeners()
  activateDeleteListeners()
}

function activateStrikeListeners(){
  const strikeBtn = document.querySelectorAll(".strikeBtn")
  strikeBtn.forEach((sB, i) => {
    sB.style.color = colorsArray[i];
    sB.addEventListener("click", () => 
      {
        if (colorsArray[i] == "#32CD32"){
          colorsArray[i] = "#5b7065"
        }
        else{
          colorsArray[i] = "#32CD32"
        }

      sB.style.color = colorsArray[i];
      localStorage.setItem('colors', JSON.stringify(colorsArray))})
  })
}

// }
// else{
// }

// localStorage.setItem('items', JSON.stringify(itemsArray))
// localStorage.setItem('colors', JSON.stringify(colorsArray))
// location.reload()

function activateDeleteListeners(){
  let deleteBtn = document.querySelectorAll(".deleteBtn")
  deleteBtn.forEach((dB, i) => {
    dB.addEventListener("click", () => 
      { deleteItem(i) })
  })
}

function activateEditListeners(){
  const editBtn = document.querySelectorAll(".editBtn")
  const updateController = document.querySelectorAll(".update-controller")
  const inputs = document.querySelectorAll(".input-controller textarea")

  editBtn.forEach((eB, i) => {
    eB.addEventListener("click", () => { 
      updateController[i].style.display = "block"
      inputs[i].disabled = false })
  })
}

function activateSaveListeners(){
  const saveBtn = document.querySelectorAll(".saveBtn")
  const inputs = document.querySelectorAll(".input-controller textarea")
  saveBtn.forEach((sB, i) => {
    sB.addEventListener("click", () => {
      updateItem(inputs[i].value, i)
    })
  })
}

function activateCancelListeners(){
  const cancelBtn = document.querySelectorAll(".cancelBtn")
  const updateController = document.querySelectorAll(".update-controller")
  const inputs = document.querySelectorAll(".input-controller textarea")
  cancelBtn.forEach((cB, i) => {
    cB.addEventListener("click", () => {
      updateController[i].style.display = "none"
      inputs[i].disabled = true
      inputs[i].style.border = "none"
    })
  })
}

function createItem(item){
  itemsArray.push(item.value)
  colorsArray.push("#5b7065")
  localStorage.setItem('items', JSON.stringify(itemsArray))
  localStorage.setItem('colors', JSON.stringify(colorsArray))
  location.reload()
}

function deleteItem(i){
  itemsArray.splice(i,1)
  colorsArray.splice(i,1)
  localStorage.setItem('items', JSON.stringify(itemsArray))
  localStorage.setItem('colors', JSON.stringify(colorsArray))
  location.reload()
}

function updateItem(text, i){
  itemsArray[i] = text
  localStorage.setItem('items', JSON.stringify(itemsArray))
  localStorage.setItem('colors', JSON.stringify(colorsArray))
  location.reload()
}

window.onload = function() {
  displayItems()
};

