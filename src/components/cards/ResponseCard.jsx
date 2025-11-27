import React from 'react';
import Card from './Card';

/**
 * ResponseCard Component
 * Smaller cards (medium size) shown in grid for user to select
 * 
 * Props:
 * - response: object with id, text, routesTo
 * - onSelect: callback when response is selected
 */
const ResponseCard = ({ response, onSelect }) => {
  const frontContent = (
    <div className="text-center px-4">
      <p className="text-base font-sans text-navy leading-snug">
        {response.text}
      </p>
    </div>
  );

  return (
    <Card
      frontImage="/assets/cards/BurnoutBuddy-response-card-front-blank.png"
      backImage="/assets/cards/BurnoutBuddy-card-back-blank-response.png"
      frontContent={frontContent}
      backContent={null}
      size="medium"
      onClick={() => onSelect && onSelect(response)}
      className="response-card hover:scale-105 transition-transform"
    />
  );
};

export default ResponseCard;
