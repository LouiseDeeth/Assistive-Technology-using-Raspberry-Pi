/**
 * Main App Component
 * 
 * This is the root component that manages routing and global state for the sign language application.
 * It handles theme management (dark/light mode) and the main route configuration.
 */
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import CameraPage from "./pages/CameraPage";
import FavoritesPage from "./pages/FavoritesPage";
import AlphabetPage from "./pages/AlphabetPage";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  /**
   * Dark mode state management
   * Initializes dark mode from localStorage for theme persistence between sessions
   */
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  // State to store API status message
  const [message, setMessage] = useState("");

  /**
   * Effect hook to save dark mode preference to localStorage
   * Runs whenever darkMode state changes
   */
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  /**
   * Effect hook to check backend API status on component mount
   * Makes a GET request to the Flask backend to verify connection
   */
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/status")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      {/* Router setup for navigation */}
      <Router>
        {/* Global navigation bar */}
        <Navbar />
        
        {/* Route configuration */}
        <Routes>
          {/* Profile/Home route */}
          <Route path="/" element={<ProfilePage darkMode={darkMode} setDarkMode={setDarkMode} />} />
          
          {/* Camera page for sign language detection */}
          <Route path="/camera" element={<CameraPage darkMode={darkMode} />} />
          
          {/* Favorites page for common phrases */}
          <Route path="/favorites" element={<FavoritesPage darkMode={darkMode} />} />
          
          {/* Alphabet page for learning sign language letters/numbers */}
          <Route path="/alphabet" element={<AlphabetPage darkMode={darkMode} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;