import React, { useRef, useEffect, useState } from "react";

function CameraPage() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [photoTaken, setPhotoTaken] = useState(false);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
            })
            .catch((error) => console.error("Error accessing camera:", error));
    }, []);


    const handleTakePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        setPhotoTaken(true);
    };

    const handleDeletePhoto = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        context.clearRect(0, 0, canvas.width, canvas.height);
        setPhotoTaken(false);
    };

    return (
        <div className="camera-page">
            <h2>Camera</h2>
            <video ref={videoRef} autoPlay playsInline style={{ width: "100%", maxWidth: "400px" }} />
            <br />
            <button onClick={handleTakePhoto}>📸 Take Photo</button>
            <button onClick={handleDeletePhoto} disabled={!photoTaken}>🗑️ Delete</button>
            <br />
            <canvas ref={canvasRef} style={{ display: photoTaken ? "block" : "none", marginTop: "20px", maxWidth: "100%" }}></canvas>
        </div>
    );
}

export default CameraPage;