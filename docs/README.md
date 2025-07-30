# Assistive Technology using Raspberry Pi

## An assistive technology project leveraging the Raspberry Pi 5, Camera Module 3, and Gemini Pro Vision API to translate American Sign Language (ASL) gestures into readable text via a mobile-friendly React frontend.


## Project Summary
### This project aims to support communication for individuals with hearing or speech impairments by enabling real-time ASL gesture recognition through computer vision and AI.
- Image Capture via Raspberry Pi Camera Module
- AI Inference using Gemini Pro Vision API
- Mobile UI built with React
- Backend API for handling image uploads and AI responses


## Prerequisites

- Raspberry Pi OS installed
- Node.js (for frontend)
- Python 3.10+
- pip, venv


## Setup Instructions
1. **Clone the repository**
   ```
   git clone https://github.com/LouiseDeeth/Assistive-Technology-using-Raspberry-Pi.git
   cd Assistive-Technology-using-Raspberry-Pi
   
2. **Install backend dependencies**
   ```
   cd backend
   python -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt

3. **Install frontend dependencies**
   ```
   cd ../frontend
   npm install

4. **Run frontend and backend (In separate terminals)**
   ```
   npm start         # frontend
   python app.py     # backend

5. **Capture images with Pi camera (via Python script in raspi/ folder)**
   ```
   python capture.py

## Key Features

- Real-time translation of ASL gestures
- Camera control interface with batch image processing
- Responsive design for mobile, tablet, and desktop
- Dark mode toggle and speech output
- Gemini Pro Vision API integration with robust error handling


## How It Works

- User signs a word or letter in front of the Pi camera
- Captured image is sent to the backend
- Backend forwards image to Gemini Vision API
- Recognised sign is returned and shown in the React UI


## Project Structure
```
Assistive-Technology-using-Raspberry-Pi/
├── backend/        # Flask/FastAPI backend
├── frontend/       # React UI
├── raspi/          # Camera scripts (Python)
├── media/          # Captured images
├── README.md
```

## Future Improvements
### We have identified the following areas to enhance and expand the capabilities of our system:

- Improve batch processing performance on the Raspberry Pi to handle larger sets of captured images efficiently.
- Include support for continuous gesture recognition which would allow users to translate complete phrases or sentences from multiple sequential signs. This could include implementing video recording for capturing dynamic signs which involve movement.
- Add user profiles and customization options to tailor the experience to individual needs and preferences.
-	Add a history feature that allows users to save translation sessions and review them later.
-	Add translation support for Braille, Irish Sign Language (ISL), and other international sign language systems.
-	Improve accessibility features such as high-contrast modes, larger text options, and haptic feedback for users with different needs.
-	Improve accuracy by filtering out repeated signs or unclear detections.
-	Provide multi-language support for translated text.
-	Create a Learning Mode where users can practice signs and receive real-time feedback on their accuracy.


## Contributors
### Louise Deeth 
– Led project coordination, configured Raspberry Pi and backend services, developed and styled the full React frontend, integrated the API, and conducted end-to-end testing.

### Rebecca Nolan
– Prototyped the UI, worked on camera setup and OpenCV logic, integrated Gemini API, implemented text-to-speech and audio playback, and supported full stack development.

### Sarah O'Connor
– Built the Flask backend and image processing pipeline, integrated the Gemini API, created RESTful endpoints, refined AI prompts, and redesigned the camera interface for usability.

### All Team Members 
– Collaborated in feature planning, debugging, and testing. Held weekly meetings with the supervisor and used GitHub and WhatsApp for task tracking and communication.
