/**
 * CameraPage Component
 * 
 * This component provides a camera interface for sign language detection that:
 * - Accesses the user's camera to capture video
 * - Allows users to take, delete, and analyze photos
 * - Sends captured images to a Gemini AI API for sign language interpretation
 * - Provides text-to-speech feedback of the detected signs
 */
import React, { useRef, useEffect, useState } from "react";

/**
 * Utility function to speak text using the browser's Speech Synthesis API
 * @param {string} text - The text to be spoken
 */
const speakText = (text) => {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        setTimeout(() => {
          window.speechSynthesis.speak(utterance);
        }, 200); // Small delay to avoid speech cutoff
      } else {
        console.warn("Text-to-speech not supported in this browser.");
      }
  };
  
function CameraPage() {
    // Refs for accessing DOM elements
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    
    // State management
    const [photoTaken, setPhotoTaken] = useState(false);        // Tracks if a photo has been captured
    const [isProcessing, setIsProcessing] = useState(false);    // Tracks if an image is being processed
    const [geminiResponse, setGeminiResponse] = useState(null); // Stores the AI's interpretation result
    const [error, setError] = useState(null);                   // Stores any error messages
    const [lastSpoken, setLastSpoken] = useState("");           // Tracks the last spoken phrase to avoid repetition

    /**
     * Effect hook to initialize the camera and set up auto-capture functionality
     */
    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
      
        // Start webcam stream
        navigator.mediaDevices.getUserMedia({ video: true })
          .then((stream) => {
            video.srcObject = stream;
          })
          .catch((error) => {
            console.error("Error accessing camera:", error);
            setError("Failed to access camera. Please check permissions.");
          });
      
        // Prime speech engine to avoid first-time speech delay/cutoff
        const utterance = new SpeechSynthesisUtterance(" ");
        window.speechSynthesis.speak(utterance);
      
        // Set up auto-capture interval for continuous sign detection
        const intervalId = setInterval(async () => {
          if (video && video.readyState === 4) { // Check if video is fully loaded
            // Capture current video frame to canvas
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
            // Convert canvas to image data for API
            const imageData = canvas.toDataURL("image/jpeg");
      
            try {
              // Send image to backend API for processing
              const response = await fetch('http://localhost:5000/api/process-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: imageData }),
              });
      
              if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      
              const data = await response.json();

              // Handle successful response
              if (data.status === 'success') {
                setGeminiResponse(data.result);
                speakText(data.result);
              } else {
                throw new Error(data.message || 'Unknown error occurred');
              }
            } catch (err) {
              console.error("Error during Gemini request:", err);
              setError("Failed to analyze video stream.");
            }
          }
        }, 5000); // Process every 5 seconds
      
        // Clean up interval on component unmount
        return () => clearInterval(intervalId); 
      }, [lastSpoken]); // Dependency on lastSpoken to re-initialize when it changes
      
    // NOTE: Commented out alternative useEffect implementation
    // useEffect(() => {
    //     navigator.mediaDevices.getUserMedia({ video: true })
    //         .then((stream) => {
    //             videoRef.current.srcObject = stream;
    //         })
    //         .catch((error) => {
    //             console.error("Error accessing camera:", error);
    //             setError("Failed to access camera. Please check permissions.");
    //         });
    
    //     // Prime speech engine to avoid first-time cutoff
    //     const utterance = new SpeechSynthesisUtterance(" ");
    //     window.speechSynthesis.speak(utterance);
    // }, []);
    
    /**
     * Handles capturing a photo from the video stream
     */
    const handleTakePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        // Draw current video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Update state to show photo is taken and clear previous results
        setPhotoTaken(true);
        setGeminiResponse(null)
    };

    /**
     * Handles deleting a captured photo
     */
    const handleDeletePhoto = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        // Reset states
        setPhotoTaken(false);
        setGeminiResponse(null);
    };

    /**
     * Sends the captured image to Gemini AI for analysis
     */
    const sendToGemini = async () => {
        if (!photoTaken) return;

        try {
            setIsProcessing(true);
            setError(null);

            // Get the image data from the canvas
            const canvas = canvasRef.current;
            const imageData = canvas.toDataURL('image/jpeg');

            // Send the image to the Flask backend
            const response = await fetch('http://localhost:5000/api/process-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: imageData }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.status === 'success') {
                const newResult = data.result.trim();
                setGeminiResponse(newResult);
              
                // Only speak if it's a detected sign and not the same as last spoken
                if (
                  newResult.toLowerCase() !== "no sign detected" &&
                  newResult !== lastSpoken
                ) {
                  speakText(newResult);
                  setLastSpoken(newResult);
                }
              }              
        } catch (err) {
            console.error('Error sending image to Gemini:', err);
            setError(`Failed to process image: ${err.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="camera-page">
            <h2>Camera</h2>
            {/* Video element for camera stream display */}
            <video
                ref={videoRef}
                autoPlay playsInline
                style={{ width: "100%", maxWidth: "400px" }}
            />
            <br />
            {/* Camera control buttons */}
            <button onClick={handleTakePhoto}>📸 Take Photo</button>
            <button onClick={handleDeletePhoto} disabled={!photoTaken}>🗑️ Delete</button>

            {/* Analysis button */}
            <button
                onClick={sendToGemini}
                disabled={!photoTaken || isProcessing}
                className={`analyze-btn ${isProcessing ? "disabled" : ""}`}
            >
                {isProcessing ? 'Processing...' : '🔍 Analyze with Gemini'}
            </button>
            <br />
            
            {/* Canvas for displaying captured photo */}
            <canvas
                ref={canvasRef}
                style={{
                    display: photoTaken ? "block" : "none",
                    marginTop: "20px",
                    maxWidth: "100%"
                }}>
            </canvas>
            
            {/* Error message display */}
            {error && (
                <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>
                    {error}
                </div>
            )}
            
            {/* Gemini analysis result display */}
            {geminiResponse && (
                <div className="gemini-response" >
                    <h3>Gemini's Analysis:</h3>
                    <p>{geminiResponse}</p>
                </div>
            )}
        </div>
    );
}

export default CameraPage;