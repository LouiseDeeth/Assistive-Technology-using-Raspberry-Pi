/**
 * FavouritesPage Component
 * 
 * This component displays a collection of favourite sign language phrases with:
 * - A display area showing the selected sign image
 * - Buttons for each phrase with audio playback functionality
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.darkMode - Indicates if dark mode is enabled
 */
import React, { useState } from "react";

function FavoritesPage({ darkMode }) {
  // Array of common phrases with their corresponding image paths
  const phrases = [
    { text: "Hello", image: "/images/favorites/Hello.png" },
    { text: "Goodbye", image: "/images/favorites/Goodbye.png" },
    { text: "I love you", image: "/images/favorites/ILoveYou.png" },
    { text: "Thank you", image: "/images/favorites/ThankYou.png" },
    { text: "Yes", image: "/images/favorites/Yes.png" },
    { text: "No", image: "/images/favorites/No.png" },
    { text: "Please", image: "/images/favorites/Please.png" },
    { text: "Sorry", image: "/images/favorites/Sorry.png" },
  ];

  // State to track the currently selected phrase
  const [selectedPhrase, setSelectedPhrase] = useState(null);

  /**
   * Handles click event when a phrase button is selected
   * @param {Object} phrase - The phrase object that was clicked
   */
  const handlePhraseClick = (phrase) => {
    setSelectedPhrase(phrase);
  };

  return (
    <div className="favorites-page">
      <h2>Favourite Signs</h2>

      {/* Sign Display Section - Shows the currently selected sign or a prompt */}
      <div className="sign-display">
        {selectedPhrase ? (
          <img
            src={selectedPhrase.image}
            alt={selectedPhrase.text}
            className="sign-image"
          />
        ) : (
          <p>Select a phrase to see the sign</p>
        )}
      </div>

      {/* Phrase Buttons Section - Lists all available phrases with play audio option */}
      <div className="phrase-buttons">
        {phrases.map((phrase) => (
          <div key={phrase.text} className="phrase-audio">
            {/* Button to select and display the sign */}
            <button
              className={`phrase-btn ${selectedPhrase?.text === phrase.text ? "active" : ""
                }`}
              onClick={() => handlePhraseClick(phrase)}
            >
              {phrase.text}
            </button>

            {/* Button to play audio pronunciation of the phrase */}
            <button
              className="audio-btn"
              onClick={() => {
                // Convert phrase text to filename format by replacing spaces with underscores
                const sanitizedFileName = phrase.text.replace(/\s+/g, "_");
                // Create and play the audio file
                const audio = new Audio(`/audio/phrases/${sanitizedFileName}.mp3`);
                audio.play();
              }}
            >
              🔊
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;