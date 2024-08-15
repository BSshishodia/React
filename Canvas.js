import React, { useState } from 'react';
import Card from './Card';

const Canvas = () => {
  const [cards, setCards] = useState([
    { id: 1, text: 'Card 1', x: 100, y: 100, width: 200, height: 100 },
    { id: 2, text: 'Card 2', x: 300, y: 300, width: 200, height: 100 },
  ]);

  const moveCard = (id, x, y) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, x, y } : card
      )
    );
  };

  const resizeCard = (id, width, height) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, width, height } : card
      )
    );
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'auto',
        position: 'relative',
        border: '1px solid black',
        backgroundColor: '#f0f0f0',
      }}
    >
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          text={card.text}
          x={card.x}
          y={card.y}
          onMove={moveCard}
          onResize={resizeCard}
        />
      ))}
    </div>
  );
};

export default Canvas;
