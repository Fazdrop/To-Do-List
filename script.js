const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("Please enter a task!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    let edit = document.createElement("edit");
    edit.innerHTML = "\u270e";
    edit.className = "edit-btn";
    li.appendChild(edit);
  }
  inputBox.value = "";
  saveData();
}
function editTask(e) {
  if (e.target.classList.contains("edit-btn")) {
    let listItem = e.target.parentElement;
    let taskText = listItem.firstChild;
    let newText = prompt("Edit task:", taskText.textContent);
    if (newText !== null) {
      taskText.textContent = newText;
      saveData();
    }
  }
}

listContainer.addEventListener("click", editTask);
function Enter(event) {
  if (event.keyCode === 13) {
    addTask();
  }
}
inputBox.addEventListener("keypress", Enter);
listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("check");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
