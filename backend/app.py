from flask import Flask, request, jsonify
from flask_cors import CORS
import os
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
    """
        Endpoint to process an image with translator
        - Receieves base64 image from frontend
        - Processes image and removes any headers
        - Translates image with Translator
        - Returns JSON result    
    """
    try:
        # Check if image data received
        if 'image' not in request.json:
            return jsonify({
                'status': 'error',
                'message': 'No image data received'
            }), 400
        
        # Process image
        image_data = request.json['image']
        image_data = image_data.split(",")[1]
        
        result = translator.translate(image_data)
        
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
