import React from 'react';
import Card from './Card';

/**
 * ChallengeCard Component
 * Entry point for user journey - displays challenge titles
 * 
 * Props:
 * - challenge: object with id, title, question, responses
 * - onSelect: callback when challenge is selected
 */
const ChallengeCard = ({ challenge, onSelect }) => {
  const frontContent = (
    <div className="text-center">
      <h2 className="text-3xl font-serif text-cream font-bold leading-tight">
        {challenge.title}
      </h2>
    </div>
  );

  const backContent = (
    <div className="text-center">
      <p className="text-lg text-cream font-sans">
        Tap to begin your journey
      </p>
    </div>
  );

  return (
    <Card
      frontImage="/assets/cards/BurnoutBuddy-challenge-card.png"
      backImage="/assets/cards/BurnoutBuddy-card-back-blank-challenge.png"
      frontContent={frontContent}
      backContent={backContent}
      size="full"
      onClick={() => onSelect && onSelect(challenge)}
      className="challenge-card"
    />
  );
};

export default ChallengeCard;
