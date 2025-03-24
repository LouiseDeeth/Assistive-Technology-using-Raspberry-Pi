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



 