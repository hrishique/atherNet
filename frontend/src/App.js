import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Container, TextField, Button, Typography, Switch, Input } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00ffcc" },
    background: { default: "#121212", paper: "#1e1e1e" },
    text: { primary: "#ffffff" },
  },
});

function App() {
  const [fileData, setFileData] = useState(null);
  const [fileCID, setFileCID] = useState("");
  const [taskType, setTaskType] = useState("");
  const [uploading, setUploading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // 📌 Upload File to Storacha Backend (Then Gets CID)
  const uploadFile = async () => {
    if (!fileData) return alert("Please select a file!");
    console.log("FileData : ---->>>>" ,fileData )

    setUploading(true);
    const formData = new FormData();
    formData.append("file", fileData);
    console.log("FileData : ---->>>>" ,fileData + "FormData : ----->>>", formData)

    for (const pair of formData.entries()) {
      console.log("Here it is",pair[0], pair[1]);
    }

    try {
      const response = await axios.post("http://localhost:3000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data && response.data.cid) {
        setFileCID(response.data.cid);
        console.log("Upload Response:", response.data);
        alert("File uploaded successfully! CID: " + response.data.cid);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  // 📌 Submit Task (Using CID from Upload OR Manual Entry)
  const submitTask = async () => {
    if (!fileCID || !taskType) return alert("Enter a CID and a task type!");

    await fetch("http://localhost:3000/submit-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileCID, taskType }),
    });

    alert("Task submitted successfully!");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="sm" style={{ textAlign: "center", paddingTop: "50px" }}>
        <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} color="primary" style={{ position: "absolute", top: 20, right: 20 }} />

        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <Typography variant="h2" color="primary" gutterBottom>Decentralized AI Task Submission</Typography>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }}>
          <Input type="file" onChange={(e) => setFileData(e.target.files[0])} style={{ color: "#fff", marginBottom: "20px" }} />
          <Button variant="contained" color="primary" onClick={uploadFile} disabled={uploading} fullWidth>
            {uploading ? "Uploading..." : "Upload File"}
          </Button>

          {fileCID && (
            <TextField label="Generated File CID" variant="outlined" fullWidth margin="normal" value={fileCID} InputProps={{ readOnly: true, style: { color: "#fff" } }} />
          )}

          <Typography variant="h6" color="primary" gutterBottom>OR Enter File CID Manually</Typography>
          <TextField label="Enter File CID" variant="outlined" fullWidth margin="normal" onChange={(e) => setFileCID(e.target.value)} InputProps={{ style: { color: "#fff" } }} />

          <TextField label="Task Type" variant="outlined" fullWidth margin="normal" onChange={(e) => setTaskType(e.target.value)} InputProps={{ style: { color: "#fff" } }} />

          <Button variant="contained" color="primary" fullWidth onClick={submitTask} sx={{ marginTop: "20px", fontWeight: "bold" }}>
            Submit Task
          </Button>
        </motion.div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
