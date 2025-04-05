import React, { useRef, useEffect, useState } from "react";

function CameraPage() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [photoTaken, setPhotoTaken] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [geminiResponse, setGeminiResponse] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
            })
            .catch((error) => console.error("Error accessing camera:", error));
        setError("Failed to access camera. Please check permissions.");
    }, []);


    const handleTakePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        setPhotoTaken(true);
        setGeminiResponse(null)
    };

    const handleDeletePhoto = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        context.clearRect(0, 0, canvas.width, canvas.height);
        setPhotoTaken(false);
        setGeminiResponse(null);
    };

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
                setGeminiResponse(data.result);
            } else {
                throw new Error(data.message || 'Unknown error occurred');
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
            <video
                ref={videoRef}
                autoPlay playsInline
                style={{ width: "100%", maxWidth: "400px" }}
            />
            <br />
            <button onClick={handleTakePhoto}>📸 Take Photo</button>
            <button onClick={handleDeletePhoto} disabled={!photoTaken}>🗑️ Delete</button>

            <button
                onClick={sendToGemini}
                disabled={!photoTaken || isProcessing}
                className={`analyze-btn ${isProcessing ? "disabled" : ""}`}
            >
                {isProcessing ? 'Processing...' : '🔍 Analyze with Gemini'}
            </button>
            <br />
            <canvas
                ref={canvasRef}
                style={{
                    display: photoTaken ? "block" : "none",
                    marginTop: "20px",
                    maxWidth: "100%"
                }}>
            </canvas>
            {error && (
                <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>
                    {error}
                </div>
            )}
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
