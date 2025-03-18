import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import CameraPage from "./pages/CameraPage";
import FavoritesPage from "./pages/FavoritesPage";
import AlphabetPage from "./pages/AlphabetPage";
import Navbar from "./components/Navbar";
import "./App.css"; 
import { Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import styled from "@emotion/styled";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:5000/")
            .then((res) => res.json())
            .then((data) => setMessage(data.message))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<ProfilePage />} />
                <Route path="/camera" element={<CameraPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/alphabet" element={<AlphabetPage />} />
            </Routes>
        </Router>
    );
}

export default App;
