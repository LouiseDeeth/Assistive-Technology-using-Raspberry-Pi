import React, { useState } from "react";

function FavoritesPage() {
  const phrases = [
    { text: "Hello", image: "/images/favourites/Hello.png" },
    { text: "Goodbye", image: "/images/favourites/Goodbye.png" },
    { text: "I love you", image: "/images/favourites/ILoveYou.png" },
    { text: "Thank you", image: "/images/favourites/ThankYou.png" },
    { text: "Yes", image: "/images/favourites/Yes.png" },
    { text: "No", image: "/images/favourites/No.png" },
    { text: "Please", image: "/images/favourites/Please.png" },
    { text: "Sorry", image: "/images/favourites/Sorry.png" },
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
          <button
            key={phrase.text}
            className={`phrase-btn ${
              selectedPhrase?.text === phrase.text ? "active" : ""
            }`}
            onClick={() => handlePhraseClick(phrase)}
          >
            {phrase.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;
