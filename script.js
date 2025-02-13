let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
// toggle the task form visibility
function toggleTaskForm() {
    const formContainer = document.getElementById("task-form-container");
    formContainer.style.display = formContainer.style.display === "block" ? "none" : "block";
}
// add a task
function addTask(event) {
    event.preventDefault();
    const taskInput = document.getElementById("task-input");
    const taskDueDate = document.getElementById("task-due-date").value;
    const taskPriority = document.getElementById("task-priority").value;
    
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        tasks.push({ 
            text: taskText, 
            completed: false, 
            dueDate: taskDueDate,
            priority: taskPriority
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));  // Save tasks to local storage
        renderTasks();
        taskInput.value = "";
        document.getElementById("task-due-date").value = "";
        toggleTaskForm();
    }
}
// Function to render all tasks
function renderTasks() {
    const taskListContainer = document.getElementById("task-list");
    taskListContainer.innerHTML = ""; // Clear the existing list

    tasks.forEach((task, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        if (task.completed) {
            taskDiv.classList.add("completed");
        }

        const taskText = document.createElement("span");
        taskText.innerText = `${task.text} (Due: ${task.dueDate}, Priority: ${task.priority})`;

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.onclick = () => deleteTask(index);

        const completeBtn = document.createElement("button");
        completeBtn.innerText = task.completed ? "Undo" : "Complete";
        completeBtn.onclick = () => toggleCompletion(index);

        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.onclick = () => editTask(index);

        taskDiv.appendChild(taskText);
        taskDiv.appendChild(completeBtn);
        taskDiv.appendChild(deleteBtn);
        taskDiv.appendChild(editBtn);
        taskListContainer.appendChild(taskDiv);
    });
}
// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));  // Update tasks in local storage
    renderTasks();
}
// Function to toggle task completion status
function toggleCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));  // Update tasks in local storage
    renderTasks();
}
// Function to edit a task
function editTask(index) {
    const task = tasks[index];
    document.getElementById("task-input").value = task.text;
    document.getElementById("task-due-date").value = task.dueDate;
    document.getElementById("task-priority").value = task.priority;
    
    deleteTask(index);
    toggleTaskForm();
}
// Function to clear all tasks
function clearAllTasks() {
    tasks = [];
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}
// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
// Render tasks initially
renderTasks();
