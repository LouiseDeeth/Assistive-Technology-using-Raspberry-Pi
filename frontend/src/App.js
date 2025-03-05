import React, { useEffect, useState } from "react";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:5000/")
            .then((res) => res.json())
            .then((data) => setMessage(data.message));
    }, []);

    return (
        <div>
            <h1>Assistive Technology</h1>
            <p>Backend: {message}</p>
        </div>
    );
}

export default App;
