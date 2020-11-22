
// ****** select items **********

const form = document.querySelector(".item-form");
const alert = document.querySelector(".alert");
const item = document.getElementById("input-item");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".item-container");
const list = document.querySelector(".item-list");
const clearBtn = document.querySelector(".clr-btn");
// edit option
let editElement;
let editFlag = false;
let editID = "";
// ****** event listeners **********

// submit form
form.addEventListener("submit", addItem);
// clear list
clearBtn.addEventListener("click", clearItems);
// display items onload
window.addEventListener("DOMContentLoaded", setupItems);

// ****** functions **********

// add item
function addItem(e) {
  e.preventDefault();
  const value = item.value;
  const id = new Date().getTime().toString();

  if (value !== "" && !editFlag) {
    const element = document.createElement("div");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("item");
    element.innerHTML = `<div class="item"> ${value}
            <span class="float-right">
              <button class="fas fa-edit btn btn-md btn-success edit-btn"></button>
              <button class="fas fa-trash btn btn-md btn-danger delete-btn"></button>
            </span> 
          </div>
          `;
    // add event listeners to both buttons;
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);

    // append child
    list.appendChild(element);
    // display alert
    displayAlert("item added to the list", "success");
    // show container
    container.classList.add("item-container");
    // set local storage
    addToLocalStorage(id, value);
    // set back to default
    setBackToDefault();
  } else if (value !== "" && editFlag) {
    editElement.innerHTML = value;
    displayAlert("value changed", "success");

    // edit  local storage
    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    displayAlert("please enter value", "danger");
  }
}
// display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  // remove alert
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 3000);
}

// clear items
function clearItems() {
  const items = document.querySelectorAll(".item");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove("item-container");
  displayAlert("empty list", "danger");
  setBackToDefault();
  localStorage.removeItem("list");
}

// delete item

function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;

  list.removeChild(element);

  if (list.children.length === 0) {
    container.classList.remove("item-container");
  }
  displayAlert("item removed", "danger");

  setBackToDefault();
  // remove from local storage
  removeFromLocalStorage(id);
}
// edit item
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  // set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;
  // set form value
  item.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  //
  submitBtn.textContent = "Edit";
}
// set backt to defaults
function setBackToDefault() {
  item.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "Submit";
}

// ****** local storage **********

// add to local storage
function addToLocalStorage(id, value) {
  const grocery = { id, value };
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });

  localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value) {
  let items = getLocalStorage();

  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}

// SETUP LOCALSTORAGE.REMOVEITEM('LIST');

// ****** setup items **********

function setupItems() {
  let items = getLocalStorage();

  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.id, item.value);
    });
    container.classList.add("item-container");
  }
}

function createListItem(id, value) {
  const element = document.createElement("div");
  let attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.classList.add("item");
  element.innerHTML = `<p class="item"> ${value}
              <span class="float-right">
                <button class="fas fa-edit btn btn-md btn-success edit-btn"></button>
                <button class="fas fa-trash btn btn-md btn-danger delete-btn"></button>
              </span> 
            </p>
          `;
  // add event listeners to both buttons;
  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);
  const editBtn = element.querySelector(".edit-btn");
  editBtn.addEventListener("click", editItem);

  // append child
  list.appendChild(element);
}
