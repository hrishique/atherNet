import React, { useState } from "react";
import { motion } from "framer-motion";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Container, TextField, Button, Typography, Switch } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00ffcc" },
    background: { default: "#121212", paper: "#1e1e1e" },
    text: { primary: "#ffffff" },
  },
});

function App() {
  const [fileCID, setFileCID] = useState("");
  const [taskType, setTaskType] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  const submitTask = async () => {
    await fetch("http://localhost:3000/submit-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileCID, taskType }),
    });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="sm" style={{ textAlign: "center", paddingTop: "50px" }}>
        <Switch
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          color="primary"
          style={{ position: "absolute", top: 20, right: 20 }}
        />
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h2" color="primary" gutterBottom>
            Decentralized AI Task Submission
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <TextField
            label="File CID"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setFileCID(e.target.value)}
            InputProps={{ style: { color: "#fff" } }}
          />
          <TextField
            label="Task Type"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setTaskType(e.target.value)}
            InputProps={{ style: { color: "#fff" } }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={submitTask}
            sx={{ marginTop: "20px", fontWeight: "bold" }}
          >
            Submit Task
          </Button>
        </motion.div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
