from flask import Flask, request, jsonify
import requests
import cv2
import numpy as np

app = Flask(__name__)

# Image Processing Function
def process_image(image_data):
    image = cv2.imdecode(np.frombuffer(image_data, np.uint8), cv2.IMREAD_COLOR)
    processed_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)  # Convert to grayscale
    return processed_image

@app.route("/process", methods=["POST"])
def process_task():
    file_url = request.json.get("file_url")

    response = requests.get(file_url)
    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch file"}), 400

    processed_image = process_image(response.content)
    result_cid = "RESULT_CID_IMAGE"  # Placeholder for uploaded processed image CID

    return jsonify({"result_cid": result_cid})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
