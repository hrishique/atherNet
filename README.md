# atherNet

# 🚀 Decentralized AI Infrastructure on Filecoin

## 📌 Overview
This project enables **decentralized AI computation** using **Filecoin** for storage and **FVM smart contracts** for rewards.

---


## 📁 Project Structure

atherNet/
│── backend/                   # Node.js API for task management
│   ├── server.js              # Express API
│   ├── upload.js              # File upload to Filecoin
│   ├── package.json           # Dependencies
│
│── compute-node/              # Python script for AI computation
│   ├── compute.py             # AI task execution
│   ├── requirements.txt       # Dependencies
│
│── smart-contract/            # Solidity smart contract for rewards
│   ├── AICompute.sol          # FVM smart contract
│
│── frontend/                  # (Optional) React dashboard for users
│   ├── App.js                 # React App
│
│── docs/                      # Documentation
│   ├── README.md              # Setup & execution guide
│
└── .gitignore

## 🚀 How to Run

### **1️⃣ Install Dependencies**
- Backend:
  ```sh
  cd backend
  npm install

  Compute Node

  cd compute-node
pip install -r requirements.txt


 Run Backend

 cd backend
node server.js

