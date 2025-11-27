import React, { useState } from 'react';
import './Card.css';

/**
 * Base Card Component with 3D flip animation
 * 
 * Props:
 * - frontImage: path to front image
 * - backImage: path to back image (optional, uses generic back if not provided)
 * - frontContent: JSX content to overlay on front
 * - backContent: JSX content to overlay on back
 * - size: 'full' (350x550) or 'medium' (275x450)
 * - onClick: callback when card is clicked
 * - className: additional CSS classes
 */
const Card = ({
  frontImage,
  backImage,
  frontContent,
  backContent,
  size = 'full',
  onClick,
  className = ''
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    if (onClick) onClick(!isFlipped);
  };

  const sizeClasses = {
    full: 'w-[350px] h-[550px]',
    medium: 'w-[275px] h-[450px]'
  };

  return (
    <div 
      className={`card-container ${sizeClasses[size]} ${className}`}
      onClick={handleClick}
    >
      <div className={`card ${isFlipped ? 'flipped' : ''}`}>
        {/* Front Face */}
        <div className="card-face card-front">
          <img 
            src={frontImage} 
            alt="Card front" 
            className="w-full h-full object-cover rounded-lg"
          />
          {frontContent && (
            <div className="card-content-overlay">
              {frontContent}
            </div>
          )}
        </div>

        {/* Back Face */}
        <div className="card-face card-back">
          <img 
            src={backImage} 
            alt="Card back" 
            className="w-full h-full object-cover rounded-lg"
          />
          {backContent && (
            <div className="card-content-overlay">
              {backContent}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
