import React, { useState } from "react";
import { Switch } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ProfilePage({ darkMode, setDarkMode }) {
    const navigate = useNavigate();

    return (
        <div className={`profile-page ${darkMode ? "dark" : ""}`}>
            <div className="profile-image-container">
                <h2 class="app-title">Assistive Technology App</h2>
                <img src="/images/picture1.png" alt="Sign Language Picture" className="Picture1" />

                <h4>Hi there! </h4>
                <h4> I communicate using sign language. Excited to connect and learn together!</h4>
                <h4>Feel free to interact with me using sign or text!</h4>
            </div>

            <div>
                <label className="LightDarkToggle">
                    Dark/Light Mode
                    <Switch
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                        sx={{
                            '& .MuiSwitch-switchBase': {
                                color: 'teal',
                            },
                            '& .MuiSwitch-switchBase + .MuiSwitch-track': {
                                backgroundColor: '#b2dfdb', // Light teal when OFF
                            },
                            '& .MuiSwitch-switchBase.Mui-checked': {
                                color: 'teal',
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: 'teal',
                            },
                        }}
                    />

                </label>
            </div>
        </div>
    );
}

export default ProfilePage;
