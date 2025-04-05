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
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProfilePage darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/camera" element={<CameraPage darkMode={darkMode} />} />
          <Route path="/favorites" element={<FavoritesPage darkMode={darkMode} />} />
          <Route path="/alphabet" element={<AlphabetPage darkMode={darkMode} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
