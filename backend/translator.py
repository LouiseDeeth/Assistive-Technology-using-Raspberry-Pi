import os
import base64
import requests
import json
import cv2
from dotenv import load_dotenv

class Translator:
    def __init__(self):
        load_dotenv() 

        self.api_key = os.getenv("key")
        if not self.api_key:
            print("Warning: api key not found")
        self.api_url = "https://generativelanguage.googleapis.com/v1/models/gemini-pro-vision:generateContent"
        _, buffer = cv2.imencode('.jpg', frame)
    
        return base64.b64encode(buffer).decode('utf-8')
    
    def encode_image(self_frame):
        _, buffer = cv2.imencode('.jpg', frame)
        return base64.b64encode(buffer).decode('utf-8')

