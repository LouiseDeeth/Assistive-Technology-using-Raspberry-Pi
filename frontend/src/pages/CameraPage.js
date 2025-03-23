import React, { useRef, useEffect } from "react";

function CameraPage() {
    const videoRef = useRef(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
            })
            .catch((error) => console.error("Error accessing camera:", error));
    }, []);

    return (
        <div className="camera-page">
            <h2>Camera</h2>
            <video ref={videoRef} autoPlay></video>
            <button>Delete</button>
        </div>
    );
}

export default CameraPage;
