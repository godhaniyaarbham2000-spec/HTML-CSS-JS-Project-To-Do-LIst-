let input = document.getElementById("task");
let list = document.getElementById("list");

// Load tasks when page opens
window.onload = function () {
  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  savedTasks.forEach(task => {
    createTask(task);
  });
};

// Add task
function addTask() {
  if (input.value.trim() === "") return;

  let taskText = input.value;
  createTask(taskText);

  saveTask(taskText);

  input.value = "";
}

// Create task UI
function createTask(taskText) {
  let li = document.createElement("li");

  li.innerHTML = `
    <span>${taskText}</span>
    <i class="fas fa-trash delete" onclick="removeTask(this, '${taskText}')"></i>
  `;

  list.appendChild(li);
}

// Save to localStorage
function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task
function removeTask(icon, taskText) {
  icon.parentElement.remove();

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(t => t !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Enter key support
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});