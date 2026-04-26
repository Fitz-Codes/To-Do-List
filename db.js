const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const dbPath = path.join(__dirname, "todo.db");
const db = new sqlite3.Database(dbPath);

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

async function initDb() {
  await run(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

function getTodos() {
  return all("SELECT id, task, created_at FROM todos ORDER BY id DESC");
}

async function createTodo(text) {
  const result = await run("INSERT INTO todos (task) VALUES (?)", [text]);
  return { id: result.lastID, task: text };
}

async function removeTodo(id) {
  const result = await run("DELETE FROM todos WHERE id = ?", [id]);
  return result.changes > 0;
}

module.exports = { initDb, getTodos, createTodo, removeTodo};