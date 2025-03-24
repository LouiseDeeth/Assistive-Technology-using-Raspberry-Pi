import numpy as np
import cv2 #openCV 
import base64 #base64
import google.generativeai as genai # gemini api
from flask import Flask, Response, request, jsonify
from flask_cors import CORS

class Camera:
    def __init__(self, camera_index = 0, resolution = (640, 480)):
        """initialising camera with specific settings"""
        self.camera_index = camera_index
        self.resolution = resolution
        self.cap = None
    
    def initialize(self):
        """connect to camera"""
        self.cap = cv2.VideoCapture(self.camera_index)
        
        if not self.cap.isOpened():
            print("Error: could not open camera")
            return False
        
        #set resolution
        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, self.resolution[0])
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, self.resolution[1])

        #creates output directory if doesn't already exist
        os.makedirs("output", exist_ok=True)

        return True

    def adjust_camera(self, frames = 5, delay = 0.5):
        """capture some frames to allow the camera to adjust"""
        if self.cap is None or not self.cap.isOpened():
            print("Error: camera not initialized")
            return False
        print("Camera is adjusting . . .")
        for i in range(frames):
            ret, _ = self.cap.read()
            if not ret:
                print(f"Warning: failed to read frame {i} during camera adjustment")
            time.sleep(delay)
        return True

    def capture_image(self, countdown = 3, save_image = True):
        if self.cap is None or not self.cap.isOpened():
            print("Error: camera not initialized")
            return None
        
        for i in range(countdown, 0, -1):
            print(f"Taking picture in {i}...")
            time.sleep(1)
        
        print("Capturing image!")

        ret, frame = self.cap.read()

        if not ret:
            print("Error: failed to capture image")
            return None
        
        filename = None

        if save_image:
            timestamp = int(time.time())
            filename = f"output/sign_image_{timestamp}.jpg"
            cv2.imwrite(filename, frame)
            print(f"Image captured and saved to {filename}")

        return frame, filename

    def release(self):
        if self.cap is not None:
            self.cap.release()
            self.cap = None