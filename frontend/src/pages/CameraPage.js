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
  const [isCapturing, setIsCapturing] = useState(false);     // Tracks if in capture mode
  const [capturedImages, setCapturedImages] = useState([]); // Stores captured images for batch processing
  const [isProcessing, setIsProcessing] = useState(false);    // Tracks if an image is being processed
  const [results, setResults] = useState([]);              // Stores the AI's interpretation results
  const [error, setError] = useState(null);                   // Stores any error messages
  const [lastSpoken, setLastSpoken] = useState("");           // Tracks the last spoken phrase to avoid repetition

  /**
   * Effect hook to initialize the camera and set up auto-capture functionality
   */
  useEffect(() => {
    const video = videoRef.current;

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
  }, []);


  /**
     * Handles starting a new translation session
     */
  const handleStartTranslation = () => {
    // Clear any previous results and errors
    setResults([]);
    setError(null);
    setCapturedImages([]);
    // Start capture mode
    setIsCapturing(true);
  };

  /**
     * Handles stopping an active translation session and processes the images
     */
  const handleStopTranslation = async () => {
    // Exit capture mode
    setIsCapturing(false);

    // If no images were captured, show a message
    if (capturedImages.length === 0) {
      setError("No images were captured during the session.");
      return;
    }

    // Process all captured images
    setIsProcessing(true);

    try {
      const processedResults = [];

      // Process each image sequentially
      for (const imageData of capturedImages) {
        const result = await processSingleImage(imageData);
        processedResults.push(result);

        // Speak the result if it's valid
        if (result && result !== "No sign detected" && result !== lastSpoken) {
          speakText(result);
          setLastSpoken(result);
        }
      }

      // Update results state with all processed images
      setResults(processedResults);
    } catch (err) {
      console.error("Error processing images:", err);
      setError("Failed to process captured images.");
    } finally {
      setIsProcessing(false);
    }
  };

  /**
     * Handles capturing a single photo during translation session
     */
  const handleCaptureImage = () => {
    if (!isCapturing) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    // Draw current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get image data and add to captured images array
    const imageData = canvas.toDataURL('image/jpeg');
    setCapturedImages(prev => [...prev, imageData]);
  };


  /**
     * Processes a single image through the Gemini API
     * @param {string} imageData - Base64 encoded image
     * @returns {string} The translation result
     */
  const processSingleImage = async (imageData) => {
    try {
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
        return data.result.trim();
      } else {
        throw new Error(data.message || 'Unknown error occurred');
      }
    } catch (err) {
      console.error('Error sending image to Gemini:', err);
      return "Error: Failed to process image";
    }
  };

  /**
     * Clears all captured images and results
     */
  const handleClearAll = () => {
    setCapturedImages([]);
    setResults([]);
    setError(null);

    // Clear the canvas
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
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

      {/* Translation control buttons */}
      {!isCapturing ? (
        <button
          onClick={handleStartTranslation}
          disabled={isProcessing}
          className="analyze-btn"
        >
          🎬 Start Translation
        </button>
      ) : (
        <>
          <button onClick={handleCaptureImage}>
            📸 Capture Sign
          </button>
          <button
            onClick={handleStopTranslation}
            className="analyze-btn"
          >
            ⏹️ Stop & Process ({capturedImages.length})
          </button>
        </>
      )}

      {/* Show Clear button if there are images/results */}
      {(capturedImages.length > 0 || results.length > 0) && !isCapturing && (
        <button onClick={handleClearAll}>
          🗑️ Clear All
        </button>
      )}

      {/* Processing indicator */}
      {isProcessing && (
        <div className="processing-indicator">
          <p>Processing {capturedImages.length} images...</p>
        </div>
      )}
      <br />



      {/* Canvas for displaying captured photo */}
      <canvas
        ref={canvasRef}
        style={{
          display: capturedImages.length > 0 ? "block" : "none",
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

      {/* Results display */}
      {results.length > 0 && (
        <div className="translation-results">
          <h3>Translation Results:</h3>
          <div className="results-list">
            {results.map((result, index) => (
              <div key={index} className="result-item">
                <p><strong>Sign {index + 1}:</strong> {result}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Captured images counter */}
      {capturedImages.length > 0 && (
        <div className="capture-count">
          <p>Captured {capturedImages.length} image(s)</p>
        </div>
      )}
    </div>
  );
}

export default CameraPage;