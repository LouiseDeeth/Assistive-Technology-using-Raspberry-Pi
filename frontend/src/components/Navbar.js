/**
 * Navbar Component
 * 
 * This component provides the main navigation for the sign language application.
 * It contains links to all major sections using emoji icons for visual clarity:
 * - Profile/Home (👤)
 * - Camera for sign detection (📷)
 * - Favourite phrases (❤️)
 * - Alphabet learning (🔤)
 */
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      {/* Profile/Home page link */}
      <Link to="/">👤</Link>
      
      {/* Camera page link for sign language detection */}
      <Link to="/camera">📷</Link>
      
      {/* Favourites page link for common phrases */}
      <Link to="/favorites">❤️</Link>
      
      {/* Alphabet page link for learning letters and numbers */}
      <Link to="/alphabet">🔤</Link>
    </nav>
  );
}

export default Navbar;