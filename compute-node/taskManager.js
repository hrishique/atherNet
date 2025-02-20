import { ethers } from "ethers";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = process.env.FVM_CONTRACT_ADDRESS;
const abi = [
    "function getTask(uint256 _taskId) public view returns (string memory, address, bool, string memory)",
    "function claimTask(uint256 _taskId) public",
    "function completeTask(uint256 _taskId, string memory _resultCID) public"
];



const contract = new ethers.Contract(contractAddress, abi, wallet);

async function processTasks() {
    try {
        let taskId = 0;

        while (true) {
            const [fileCID, assignedNode, completed, resultCID] = await contract.getTask(taskId);

            if (!completed && assignedNode === ethers.ZeroAddress) {
                console.log(`Claiming Task ${taskId}`);
                await contract.claimTask(taskId);

                console.log(`Processing Image for Task ${taskId}`);
                const response = await axios.post("http://localhost:5001/process", {
                    file_url: `https://storacha.io/ipfs/${fileCID}`
                });

                if (response.data.result_cid) {
                    await contract.completeTask(taskId, response.data.result_cid);
                    console.log(`Task ${taskId} completed!`);
                }
            }
            taskId++;
        }
    } catch (error) {
        console.error("Error processing tasks:", error);
    }
}

app.listen(3000, () => {
    console.log("Node.js backend running on port 3000...");
processTasks();
});