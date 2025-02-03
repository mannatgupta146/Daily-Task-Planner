const listContainer = document.getElementById("list-container");
const inputBox = document.getElementById("input-box");
const errorMsg = document.getElementById("error-msg");

function addTask() {
    if (inputBox.value.trim() === "") {
        errorMsg.style.display = "block";
        errorMsg.textContent = "Please enter a task!";
        return;
    }
    
    errorMsg.style.display = "none";
    
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    
    li.appendChild(span);
    listContainer.appendChild(li);
    
    inputBox.value = "";
    saveTask();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveTask();
    } else if (e.target.tagName === "SPAN") {
        let confirmDelete = confirm("Are you sure you want to delete this task?");
        if (confirmDelete) {
            e.target.parentElement.remove();
            saveTask();
        }
    }
});

function saveTask() {
    localStorage.setItem("tasks", listContainer.innerHTML);
}

function showTask() {
    let storedTasks = localStorage.getItem("tasks");
    if (storedTasks) listContainer.innerHTML = storedTasks;
}

showTask();
