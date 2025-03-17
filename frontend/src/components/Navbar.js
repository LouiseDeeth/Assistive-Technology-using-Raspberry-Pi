import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/">👤</Link>
            <Link to="/camera">📷</Link>
            <Link to="/favorites">❤️</Link>
            <Link to="/alphabet">🔤</Link>
        </nav>
    );
}

export default Navbar;

