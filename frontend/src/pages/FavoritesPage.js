import React, { useState } from "react";

function FavoritesPage({ darkMode }) {
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
  
  const [selectedPhrase, setSelectedPhrase] = useState(null);

  const handlePhraseClick = (phrase) => {
    setSelectedPhrase(phrase);
  };

  return (
    <div className="favorites-page">
      <h2>Favourite Signs</h2>

      {/* Sign Display */}
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

  {/* Phrase Buttons */}
  <div className="phrase-buttons">
    {phrases.map((phrase) => (
      <div key={phrase.text} className="phrase-audio">
        <button
          className={`phrase-btn ${
            selectedPhrase?.text === phrase.text ? "active" : ""
          }`}
          onClick={() => handlePhraseClick(phrase)}
        >
          {phrase.text}
        </button>

        <button
          className="audio-btn"
          onClick={() => {
            const sanitizedFileName = phrase.text.toLowerCase().replace(/\s+/g, "_");
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
