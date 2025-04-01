import os
import base64
import cv2
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai


class Translator:
    def __init__(self):
        """Initialize the Gemini API-based sign language translator."""
        load_dotenv() 

        GEMINI_API_KEY = "AIzaSyAv1QNdeHX25MnEvW4tp4sXrSwknuNAoU0"
        GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro-vision:generateContent"
        genai.configure(api_key=GEMINI_API_KEY)
    
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
    
    def translate(self, image):
        """
        Translate sign language from an image using Gemini API.
        """
        model = genai.GenerativeModel("gemini-1.5-flash")

        # Encode image to base64
        # base64_image = self.encode_image(frame)
        
        print("Sending image to Gemini API for translation...")
        
        try:
            # Make API request
            response = model.generate_content([
                "Declare the sign language sign presented in the image. Just respond with the sign. If no sign detected, state 'No sign detected'", 
                {"mime_type": "image/jpeg", "data": image}])    

            if response:
                # Get Gemini's response
                gemini_description = response.text if response else "No description available."
                return {"text": gemini_description}
            else:
                try:
                    error_detail = response.json()
                    error_message = f" - {error_detail.get('error', {}).get('message', 'Unknown error')}"
                except:
                    pass
                
                print(error_message)
                return {"text": "API Error"}
                
        except Exception as e:
            print(f"Error calling Gemini API: {e}")
            return {"text": "Error"}
    


