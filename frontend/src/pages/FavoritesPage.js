import React, { useState } from "react";

function FavoritesPage() {
    const [favorites, setFavorites] = useState(["Hello", "Thank You", "Love"]);

    return (
        <div className="favorites-page">
            <h2>Favourite Signs</h2>
            <ul>
                {favorites.map((sign, index) => (
                    <li key={index}>{sign}</li>
                ))}
            </ul>
        </div>
    );
}

export default FavoritesPage;

