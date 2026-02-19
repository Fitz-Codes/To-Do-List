const task = document.getElementById("task");
const addTaskBtn = document.getElementById("add-task-btn");
const taskContainer = document.getElementById("tasks-container");

addTaskBtn.addEventListener("click", () => {
    const todoWrapper = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const taskText = document.createElement("p");
    todoWrapper.classList.add("todo-container");
    deleteBtn.classList.add("delete-btn");
    taskText.classList.add("task-text");
    const trashIcon = document.createElement("img");
    trashIcon.src = "Images/TrshCanSprite.png";
    trashIcon.alt = "Delete";
    taskText.textContent = task.value;
    todoWrapper.append(taskText);
    todoWrapper.append(trashIcon);
    taskContainer.append(todoWrapper);
    trashIcon.addEventListener("click", () => {
        todoWrapper.remove();
    });
    task.value = "";
});
