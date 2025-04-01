from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import base64
import cv2
import numpy as np
from translator import Translator 
import traceback

# Initialize Flask app
app = Flask(__name__)
# Enable CORS to allow requests from React app
CORS(app)

# Create folder to hold temporary images if it does not exist
UPLOAD_FOLDER = 'temp_images'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Initialize translator
translator = Translator()


@app.route('/api/status', methods=['GET'])
def get_status():
    """Endpoint to check if the server is running"""
    return jsonify({
        'status': 'success',
        'message': 'Flask server is running'
    })

@app.route('/api/process-image', methods=['POST'])
def process_image():
    """Endpoint to process an image with translator"""
    try:
        # Check if image data received
        if 'image' not in request.json:
            return jsonify({
                'status': 'error',
                'message': 'No image data received'
            }), 400
        
        # Get the base64 image data
        image_data = request.json['image']
        
        # Remove the header from the base64 string (if present)
        image_data = image_data.split(",")[1]
        
        # # Decode the base64 data
        # image_binary = base64.b64decode(image_data)
        
        # # Convert to numpy array for OpenCV
        # nparr = np.frombuffer(image_binary, np.uint8)
        
        # # Decode image
        # frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # if frame is None:
        #     return jsonify({
        #         'status': 'error',
        #         'message': 'Failed to decode image'
        #     }), 400
        
        # # Save the image to a temporary file (optional, for debugging)
        # filename = os.path.join(UPLOAD_FOLDER, 'latest_capture.jpg')
        # cv2.imwrite(filename, frame)
        
        # Process with your translator
        result = translator.translate(image_data)
        
        # Return the result
        return jsonify({
            'status': 'success',
            'message': 'Image processed successfully',
            'result': result['text']
        })
    
    except Exception as e:
        print(f"Error processing image: {e}")
        traceback.print_exc()
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
