import React, { useState } from "react";
import { Switch } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ProfilePage({ darkMode, setDarkMode }) {
    const navigate = useNavigate();

    return (
        <div className={`profile-page ${darkMode ? "dark" : ""}`}>
            <div className="profile-image-container">
                <img src="/images/picture1.png" alt="Sign Language Picture" className="Picture1" />

                <p>Hi there! </p> 
                <p> I communicate using sign language. Excited to connect and learn together!</p>
                <p>Feel free to interact with me using sign or text!</p>
            </div>
            
            <div>
                <label className="LightDarkToggle">
                    Dark/Light Mode
                    <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                </label>
            </div>

            <div className="profile-buttons">
                <button className="logout-btn">Logout</button>
                <button className="delete-btn">Delete Account</button>
            </div>         
        </div>
    );
}

export default ProfilePage;
