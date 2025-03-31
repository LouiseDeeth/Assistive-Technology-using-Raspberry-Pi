import os
import base64
import requests
import json
import cv2
from dotenv import load_dotenv

class Translator:
    def __init__(self):
        """Initialize the Gemini API-based sign language translator."""
        load_dotenv() 

        # Get API key from environment variable
        self.api_key = os.getenv("key")
        if not self.api_key:
            print("Warning: API key not found. Please set 'key' in your .env file")
        
        # Base URL for Gemini Pro Vision API
        self.api_url = "https://generativelanguage.googleapis.com/v1/models/gemini-pro-vision:generateContent"
    
    def encode_image(self, frame):
        """
        Encode an image frame to base64 for API submission.
        
        Args:
            frame: OpenCV image frame (numpy array)
            
        Returns:
            Base64 encoded string of the image
        """
        _, buffer = cv2.imencode('.jpg', frame)
        return base64.b64encode(buffer).decode('utf-8')
    
    def translate(self, frame):
        """
        Translate sign language from a frame using Gemini API.
        
        Args:
            frame: The image frame containing the sign gesture
            
        Returns:
            Dictionary with translation results
        """
        if self.api_key is None:
            return {"text": "API key not configured", "confidence": 0.0}
        
        # Encode image to base64
        base64_image = self.encode_image(frame)
        
        # Build the complete URL with API key
        url = f"{self.api_url}?key={self.api_key}"
        
        # Prepare the request payload
        payload = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": "Translate this sign language gesture into text. Only respond with the translated word or phrase. If you're not confident it's a sign language gesture, respond with 'Uncertain'."
                        },
                        {
                            "inline_data": {
                                "mime_type": "image/jpeg",
                                "data": base64_image
                            }
                        }
                    ]
                }
            ],
            "generationConfig": {
                "temperature": 0.2,
                "topP": 0.8,
                "topK": 16,
                "maxOutputTokens": 256,
            }
        }
        
        print("Sending image to Gemini API for translation...")
        
        try:
            # Make API request
            response = requests.post(url, json=payload)
            
            if response.status_code == 200:
                # Parse response
                response_data = response.json()
                
                # Extract the translated text
                translated_text = "Unknown"
                confidence = 0.5  # Default confidence
                
                if "candidates" in response_data and response_data["candidates"]:
                    candidate = response_data["candidates"][0]
                    
                    if "content" in candidate and "parts" in candidate["content"]:
                        for part in candidate["content"]["parts"]:
                            if "text" in part:
                                translated_text = part["text"].strip()
                                break
                    
                    # If confidence score is available, extract it
                    if "safetyRatings" in candidate:
                        # Use the highest safety score as a rough confidence proxy
                        confidence = max([rating.get("probability", 0.5) for rating in candidate["safetyRatings"]])
                
                return {
                    "text": translated_text,
                    "confidence": confidence
                }
            else:
                error_message = f"API error: {response.status_code}"
                try:
                    error_detail = response.json()
                    error_message += f" - {error_detail.get('error', {}).get('message', 'Unknown error')}"
                except:
                    pass
                
                print(error_message)
                return {"text": "API Error", "confidence": 0.0}
                
        except Exception as e:
            print(f"Error calling Gemini API: {e}")
            return {"text": "Error", "confidence": 0.0}
    
    def translate_from_file(self, image_path):
        """
        Translate sign language from an image file using Gemini API.
        
        Args:
            image_path: Path to the image file
            
        Returns:
            Dictionary with translation results
        """
        try:
            # Read image from file
            frame = cv2.imread(image_path)
            
            if frame is None:
                print(f"Failed to load image: {image_path}")
                return {"text": "Failed to load image", "confidence": 0.0}
            
            # Use the translate method with the loaded frame
            return self.translate(frame)
            
        except Exception as e:
            print(f"Error loading or translating image: {e}")
            return {"text": "Error processing image", "confidence": 0.0}

def test_translator():
    """Test function to verify translator functionality with a sample image."""
    # Check if we have a sample image to test with
    sample_files = [f for f in os.listdir("output") if f.endswith(".jpg")] if os.path.exists("output") else []
    
    if not sample_files:
        print("No sample images found in output directory. Please run camera.py first.")
        return False
    
    # Use the most recent image
    sample_file = sorted(sample_files)[-1]
    sample_path = os.path.join("output", sample_file)
    
    print(f"Testing translator with sample image: {sample_path}")
    
    # Load the image
    image = cv2.imread(sample_path)
    if image is None:
        print(f"Failed to load image: {sample_path}")
        return False
    
    # Create translator and translate
    translator = Translator()
    result = translator.translate(image)
    
    print("\n=== TRANSLATION RESULT ===")
    print(f"Sign Language Detected: {result['text']}")
    print(f"Confidence: {result['confidence']:.2f}")
    print("===========================")
    
    return True


if __name__ == "__main__":
    print("Testing translator module...")
    test_translator()
