# import opencv, base64, numpy
import cv2
import base64
import google.generativeai as genai
from flask import Flask, Response, request, jsonify
from flask_cors import CORS

API_KEY = "AIzaSyAv1QNdeHX25MnEvW4tp4sXrSwknuNAoU0"
genai.configure(api_key=API_KEY)

app = Flask(__name__)
CORS(app)

camera = cv2.VideoCapture(0) # initialize camera

def generate_frames():
    while True: # loop while true and read feed from camera
        success, frame = camera.read()
        if not success:
            break
        else:
            _, buffer = cv2.imencode(".jpg", frame)
            frame_bytes = buffer.tobytes()
            yield(b"--frame\r\n"
                  b"Content-Type: image/jpeg\r\n\r\n" + frame_bytes + b"\r\n")



def process_frame():
    success,frame = camera.read()
    if not success:
        return jsonify({"error": "Failed to capture image"}), 500
    # convert to base64 for api usage
    _, buffer = cv2.imencode(".jpg", frame)
    image_base64 = base64.b64encode(buffer).decode("utf-8")
    model = genai.GenerativeModel("gemini-pro-vision")
    response = model.generate_content([image_base64, "What is the ASL sign in this image?"])

    return jsonify({"translation": response.text})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)


 