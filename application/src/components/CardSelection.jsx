import React from 'react';

const CardSelection = ({ selectedCard, handleCardSelect }) => {
  const cards = ['?', '0.5', '1', '2', '3', '5', '8', '13'];

  return (
    <div className="card-selection">
      <div className="cards">
        {cards.map((card) => (
          <button
            key={card}
            className={`card-option ${selectedCard === card ? 'selected' : ''}`}
            onClick={() => handleCardSelect(card)}
          >
            {card}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CardSelection;
