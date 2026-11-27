const initSqlJs = require("sql.js");
const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "taskflow.sqlite");

let db;

async function connectDatabase() {
    const SQL = await initSqlJs({
        locateFile: file => require.resolve("sql.js/dist/" + file)
    });

    if (fs.existsSync(dbPath)) {
        const fileBuffer = fs.readFileSync(dbPath);
        db = new SQL.Database(fileBuffer);
    } else {
        db = new SQL.Database();
    }

    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT DEFAULT '',
            status TEXT DEFAULT 'todo',
            priority TEXT DEFAULT 'medium',
            dueDate TEXT DEFAULT NULL,
            createdAt TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `);

    saveDatabase();
    console.log("SQLite database connected successfully!");
}

function saveDatabase() {
    const data = db.export();
    fs.writeFileSync(dbPath, Buffer.from(data));
}

module.exports = {
    connectDatabase,
    saveDatabase,
    getDatabase: () => db
};