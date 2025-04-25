import os
import base64
import cv2
from dotenv import load_dotenv
import google.generativeai as genai


class Translator:
    def __init__(self):
        """Initialize the Gemini API-based sign language translator."""
        # Load environment variables from key.env file
        load_dotenv(dotenv_path="key.env")

        # Get API key from environment variables and configure API
        GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
        genai.configure(api_key=GEMINI_API_KEY)
    

    def encode_image(self, frame):
        """
        Encode an image frame to base64 for API submission.
        
        Args
            frame: OpenCV image frame (numpy array)
            
        Returns:
            Base64 encoded string of the image
        """
        _, buffer = cv2.imencode('.jpg', frame)
        return base64.b64encode(buffer).decode('utf-8')
    
    def translate(self, image):
        """
        Translate sign language from an image using Gemini API.
        
        Args:
            image: Base64 encoded image data (string)
            
        Returns:
            Dictionary containing translation text
        """
        # Initialize Gemini model
        model = genai.GenerativeModel("gemini-1.5-flash")
        
        print("Sending image to Gemini API for translation...")
        
        try:
            # Send image to API with prompt to detect sign language
            response = model.generate_content([
                "Declare the sign language sign presented in the image. Just respond with the sign. If no sign detected, state 'No sign detected'", 
                {"mime_type": "image/jpeg", "data": image}])    

            if response:
                # Extract API response
                gemini_description = response.text if response else "No description available."
                return {"text": gemini_description}
            else:
                # Handle empty response
                try:
                    error_detail = response.json()
                    error_message = f" - {error_detail.get('error', {}).get('message', 'Unknown error')}"
                    print(error_message)
                except Exception:
                    print("Unknown API error with empty response")
                
                return {"text": "API Error"}
                
        except Exception as e:
            # Handle API call exceptions
            print(f"Error calling Gemini API: {e}")
            return {"text": "Error"}
    


