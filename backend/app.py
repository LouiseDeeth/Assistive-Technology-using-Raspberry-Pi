from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import base64
from gemini import GeminiAPI

app = Flask(__name__)
CORS(app)

# Create folder for temporary images
UPLOAD_FOLDER = 'temp_images'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Initialize Gemini API client
gemini_client = GeminiAPI()
    
@app.route('/api/status', methods=['GET'])
def get_status():
    """Simple endpoint to check if the server is running"""
    return jsonify({
        'status': 'success',
        'message': 'Flask server is running'
    })

@app.route('/api/process-image', methods=['POST'])
def process_image():
    """Endpoint to process an image with Gemini API"""
    try:
        # Check if we received image data
        if 'image' not in request.json:
            return jsonify({
                'status': 'error',
                'message': 'No image data received'
            }), 400
        
        # Get the base64 image data
        image_data = request.json['image']
        
        # Remove the header from the base64 string (if present)
        if 'base64,' in image_data:
            image_data = image_data.split('base64,')[1]
        
        # Decode the base64 data
        image_binary = base64.b64decode(image_data)
        
        # Save the image to a temporary file
        filename = os.path.join(UPLOAD_FOLDER, 'latest_capture.jpg')
        with open(filename, 'wb') as f:
            f.write(image_binary)
        
        # Process with Gemini API
        prompt = "Describe this image in detail. What can you see?"
        description = gemini_client.describe_image(filename, prompt)
        
        # Return the result
        return jsonify({
            'status': 'success',
            'message': 'Image processed successfully',
            'result': description
        })
    
    except Exception as e:
        print(f"Error processing image: {e}")
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
