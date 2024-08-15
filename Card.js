import React, { useState, useRef, useEffect } from 'react';

const Card = ({ id, text, x, y, onMove, onResize }) => {
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const cardRef = useRef(null);
  const [cardDimensions, setCardDimensions] = useState({ width: 200, height: 100 });

  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const rect = cardRef.current.getBoundingClientRect();
      const newX = e.clientX - rect.width / 2;
      const newY = e.clientY - rect.height / 2;
      onMove(id, newX, newY);
    }
  };

  const handleResizeMouseDown = (e) => {
    e.preventDefault();
    setResizing(true);
  };

  const handleResizeMouseMove = (e) => {
    if (resizing) {
      const newWidth = e.clientX - cardRef.current.getBoundingClientRect().left;
      const newHeight = e.clientY - cardRef.current.getBoundingClientRect().top;
      setCardDimensions({ width: newWidth, height: newHeight });
      onResize(id, newWidth, newHeight);
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleResizeMouseMove);
    document.addEventListener('mouseup', () => setResizing(false));
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleResizeMouseMove);
      document.removeEventListener('mouseup', () => setResizing(false));
    };
  }, [dragging, resizing]);

  return (
    <div
      ref={cardRef}
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        width: `${cardDimensions.width}px`,
        height: `${cardDimensions.height}px`,
        border: '1px solid black',
        backgroundColor: 'white',
        cursor: 'move',
        padding: '10px',
        boxSizing: 'border-box',
      }}
      onMouseDown={handleMouseDown}
    >
      <div>
        {text.length > 50 ? `${text.substring(0, 50)}...` : text}
        <button onClick={() => alert(text)}>Show More</button>
      </div>
      <div
        style={{
          width: '10px',
          height: '10px',
          backgroundColor: 'black',
          position: 'absolute',
          right: '0',
          bottom: '0',
          cursor: 'se-resize',
        }}
        onMouseDown={handleResizeMouseDown}
      />
    </div>
  );
};

export default Card;
