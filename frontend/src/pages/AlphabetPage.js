import React from "react";

function AlphabetPage() {
    const alphabet = [
        { letter: "A", image: "/images/signs/A.jpeg" },
        { letter: "B", image: "/images/signs/B.jpeg" },
        { letter: "C", image: "/images/signs/C.jpeg" },
        { letter: "D", image: "/images/signs/D.jpeg" },
        { letter: "E", image: "/images/signs/E.jpeg" },
        { letter: "F", image: "/images/signs/F.jpeg" },
        { letter: "G", image: "/images/signs/G.jpeg" },
        { letter: "H", image: "/images/signs/H.jpeg" },
        { letter: "I", image: "/images/signs/I.jpeg" },
        { letter: "J", image: "/images/signs/J.jpeg" },
        { letter: "K", image: "/images/signs/K.jpeg" },
        { letter: "L", image: "/images/signs/L.jpeg" },
        { letter: "M", image: "/images/signs/M.jpeg" },
        { letter: "N", image: "/images/signs/N.jpeg" },
        { letter: "O", image: "/images/signs/O.jpeg" },
        { letter: "P", image: "/images/signs/P.jpeg" },
        { letter: "Q", image: "/images/signs/Q.jpeg" },
        { letter: "R", image: "/images/signs/R.jpeg" },
        { letter: "S", image: "/images/signs/S.jpeg" },
        { letter: "T", image: "/images/signs/T.jpeg" },
        { letter: "U", image: "/images/signs/U.jpeg" },
        { letter: "V", image: "/images/signs/V.jpeg" },
        { letter: "W", image: "/images/signs/W.jpeg" },
        { letter: "X", image: "/images/signs/X.jpeg" },
        { letter: "Y", image: "/images/signs/Y.jpeg" },
        { letter: "Z", image: "/images/signs/Z.jpeg" },
        { letter: "0", image: "/images/signs/0.jpeg" },
        { letter: "1", image: "/images/signs/1.jpeg" },
        { letter: "2", image: "/imagessigns/2.jpeg" },
        { letter: "3", image: "/images/signs/3.jpeg" },
        { letter: "4", image: "/images/signs/4.jpeg" },
        { letter: "5", image: "/images/signs/5.jpeg" },
        { letter: "6", image: "/images/signs/6.jpeg" },
        { letter: "7", image: "/images/signs/7.jpeg" },
        { letter: "8", image: "/images/signs/8.jpeg" },
        { letter: "9", image: "/images/signs/9.jpeg" },    
    ];

    return (
        <div className="alphabet-page">
            <h2>Learn Sign Language Alphabet</h2>
            <div className="alphabet-grid">
                {alphabet.map((sign) => (
                    <div key={sign.letter} className="alphabet-item">
                        <img src={sign.image} alt={sign.letter} />
                        <p>{sign.letter}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AlphabetPage;

