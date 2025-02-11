const express = require('express');
const app = express();
app.use(express.json());

let tasks = [];

app.post('/submit-task', (req, res) => {
    const { fileCID, taskType } = req.body;
    const taskId = tasks.length;
    tasks.push({ taskId, fileCID, taskType, status: "pending" });
    res.json({ message: "Task submitted!", taskId });
});

app.listen(3000, () => console.log("API running on port 3000"));