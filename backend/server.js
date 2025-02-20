const express = require('express');
const app = express();
const upload = require('./upload');
const cors = require('cors');
const taskManager = require('./taskManager');
import { getAllTasks, handleFileUpload, upload,createTask } from "./upload.js";
app.use(express.json());


app.use(cors({
    origin: 'http://localhost:3001',  // Allow requests from frontend only
    methods: 'GET,POST',  // Allowed request methods
    allowedHeaders: 'Content-Type'  // Allowed headers
}));

// File Upload Route
app.post('/upload', handleFileUpload);
app.post('/get-all-tasks', getAllTasks);
app.post('/create-task', createTask);
app.post('/complete-task', completeTask);


app.listen(3000, () => console.log("API running on port 3000"));