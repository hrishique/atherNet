const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

const STORACHA_API_URL = "https://api.storacha.network/upload";
const API_KEY = process.env.STORACHA_API_KEY; // Set this in a .env file

async function uploadToStoracha(filePath) {
    try {
        const fileStream = fs.createReadStream(filePath);
        const response = await axios.post(STORACHA_API_URL, fileStream, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.data && response.data.cid) {
            console.log(`File uploaded successfully! CID: ${response.data.cid}`);
            return response.data.cid;
        } else {
            throw new Error("Upload failed: No CID returned");
        }
    } catch (error) {
        console.error("Error uploading file:", error);
        return null;
    }
}

// Example Usage
uploadToStoracha("sample.txt").then(cid => {
    if (cid) console.log(`Stored on Storacha with CID: ${cid}`);
});
