const express = require("express");
const path = require("path");
const {initDb, getTodos, createTodo, removeTodo } = require("./db");

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json());
app.use(express.static(__dirname));
app.use("/Images", express.static(path.join(__dirname, "../Images")));

app.get("/api/todos", async (_req, res) => {
  try {
    const todos = await getTodos();
    res.json(todos);
  } catch (err) {
    console.error("Failed to fetch todos:", err);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

app.post("/api/todos", async (req, res) => {
  const text = String(req.body?.text || "").trim();
  if (!text) {
    return res.status(400).json({ error: "Task text is required" });
  }

  try {
    const todo = await createTodo(text);
    res.status(201).json(todo);
  } catch (err) {
    console.error("Failed to create todo:", err);
    res.status(500).json({ error: "Failed to create todo" });
  }
});

app.delete("/api/todos/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid task id" });
  }

  try {
    const deleted = await removeTodo(id);
    if (!deleted) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ success: true });
  } catch (err) {
    console.error("Failed to delete todo:", err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

app.use((_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

async function start() {
  try {
    await initDb();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();