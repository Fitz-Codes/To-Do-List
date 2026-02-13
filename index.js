const task = document.getElementById("task");
const addTaskBtn = document.getElementById("add-task-btn");
const taskContainer = document.getElementById("tasks-container");

addTaskBtn.addEventListener("click", () => {
    const todoWrapper = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const taskText = document.createElement("p");
    todoWrapper.classList.add("todo-container");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "DELETE";
    taskText.classList.add("task-text");
    taskText.textContent = task.value;
    todoWrapper.append(taskText);
    todoWrapper.append(deleteBtn);
    taskContainer.append(todoWrapper);
    deleteBtn.addEventListener("click", () => {
        todoWrapper.remove();
    });
    task.value = "";
});
