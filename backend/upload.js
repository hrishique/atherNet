const ethers = require("ethers");
const dotenv = require("dotenv");

dotenv.config();

// Initialize provider and wallet
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Contract address & ABI
const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your deployed contract address
const abi = [
    "    function getTask(uint256 _taskId) public view returns (uint256, string memory, string memory, address, string memory, string memory, bool)",
    "function claimTask(uint256 _taskId) public",
    "function completeTask(uint256 _taskId, string memory _resultCID) public",
    "function getAllTasks() public view returns (tuple(string memory, address, bool, string memory)[])",
    " function createTask(string memory _fileCID, string memory _taskType) public"
];

// Initialize contract instance
const contract = new ethers.Contract(contractAddress, abi, wallet);


/**
 * Fetches all tasks from the smart contract.
 */
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await contract.getAllTasks();
    
    // Format the tasks into a JSON response
    const formattedTasks = tasks.map(task => ({
        taskId: task[0].toString(),
        fileCID: task[1],
        taskType: task[2],
        assignedNode: task[3],
        resultCID: task[4],
        status: task[5],
        completed: task[6]
    }));

    console.log("Fetched Tasks:", formattedTasks);
    return formattedTasks;
} catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks from the smart contract.");
}
}

exports.createTask = async (req, res) => {
  try {
      const { fileCID } = req.body;
      const tx = await contract.createTask(fileCID);
      await tx.wait();
      res.json({ message: "Task submitted successfully" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// Complete a task
exports.completeTask = async (req, res) => {
  try {
      const { taskId, resultCID } = req.body;
      const tx = await contract.completeTask(taskId, resultCID);
      await tx.wait();
      res.json({ message: "Task completed successfully" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


exports.handleFileUpload = async (req, res) => {
  try {
    
    const { fileData } = req.body;
   console.log("File received:", req.body)

   for (const pair of req.entries()) {
    console.log("Here it is",pair[0], pair[1]);
  }

    // Extract file details
    const fileBuffer = req.file.buffer;
    const fileMimeType = req.file.mimetype;
    const fileName = req.file.originalname;

    console.log("File Buffer Length:", fileBuffer.length);
    console.log("File Type:", fileMimeType);
    console.log("File Name:", fileName);


    //If Does not work, Convert file to blob
    // const file = new File([fileContent], 'filename');
    console.log("Inside handleUpload ");
    const { create } = await import("@web3-storage/w3up-client");
    // console.log("After import ");

    // const client = await create();
    // await client.login("h.munshi97@gmail.com");
    // console.log("After Login ");
    // await client.setCurrentSpace(
    //   z6MkfgyJBtaSePE4dRgA98AzvXh97494hfSxdoAU2gDZDRAS
    // );
    // console.log("Set Space");

    // const directoryCid = await client.uploadFile(fileData);
    // console.log("Upload file ");

    // console.log("Response : ------->>>>> CID :  ----- >>> " + directoryCid);
    // res.json({ cid: directoryCid });

    //create client
    const client = await create();

    //log into account & replace with your email
    //const account = await client.login('h.munshi97@gmail.com')

   

    //set new space as current
    await client.setCurrentSpace("did:key:z6Mkn2e33GhGRkuvCj1edQtvKRqYS1YV4Tz9bFLjzAS2gEoB");
    console.log("Current space Declared");


    console.log("File Data:", fileData);

   // Assuming fileData is the uploaded file buffer from the user
   const fileContent = fileData.buffer || fileData;; // fileData should be a Buffer or Uint8Array
console.log("File Data:", fileData);
// Create a Blob from the uploaded file content
const blob = new Blob([fileContent], { type: mime });

    //upload file
    const cid = await client.uploadFile(blob);
    console.log(`File uploaded successfully. CID: ${cid}`);

    res.json({ cid: cid });

  } catch (error) {
    res.status(500).json({ error: "Upload failed at server 2" });
  }
};

