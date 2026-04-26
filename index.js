const task = document.getElementById("task");
const addTaskBtn = document.getElementById("add-task-btn");
const taskContainer = document.getElementById("tasks-container");

function renderTask(todo){
  const todoWrapper = document.createElement("div");
    const taskText = document.createElement("p");
    const trashIcon = document.createElement("img");

    todoWrapper.classList.add("todo-container");
    taskText.classList.add("task-text");

    taskText.textContent = todo.task;
    trashIcon.src = "Images/TrshCanSprite.png";
    trashIcon.alt = "Delete";

    todoWrapper.append(taskText);
    todoWrapper.append(trashIcon);
    taskContainer.append(todoWrapper);

    trashIcon.addEventListener("click", async () => {
    await fetch("/api/todos/" + todo.id, { method: "DELETE" });
    todoWrapper.remove();
  });
}

async function loadTasks() {
  taskContainer.innerHTML = "";
  const res = await fetch("/api/todos");
  const todos = await res.json();
  todos.forEach(renderTask);
}

addTaskBtn.addEventListener("click", async () => {
  const text = task.value.trim();
  if (!text) return;

  const res = await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  const todo = await res.json();
  renderTask(todo);
  task.value = "";
});

loadTasks();