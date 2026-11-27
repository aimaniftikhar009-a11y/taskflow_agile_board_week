const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDatabase } = require("./database");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "TaskFlow API is running!" });
});

app.use("/api/tasks", require("./routes/tasks"));

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await connectDatabase();

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Database error:", error.message);
    }
}

startServer();