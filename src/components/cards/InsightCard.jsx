import React from 'react';
import Card from './Card';

/**
 * InsightCard Component
 * Shows emotional resonance on front, cognitive clarity/research on back
 * 
 * Props:
 * - insight: object with id, front, back, goDeeper
 * - onContinue: callback to proceed to action
 */
const InsightCard = ({ insight, onContinue }) => {
  const frontContent = (
    <div className="text-center px-8">
      <h3 className="text-2xl font-serif text-cream font-semibold leading-snug italic">
        {insight.front}
      </h3>
      <p className="mt-6 text-sm text-cream opacity-75 font-sans">
        (tap to flip)
      </p>
    </div>
  );

  const backContent = (
    <div className="text-left px-8 py-12 overflow-y-auto max-h-full">
      <p className="text-base font-sans text-navy leading-relaxed mb-6">
        {insight.back}
      </p>
      {insight.goDeeper && (
        <p className="text-sm font-sans text-teal font-medium italic">
          {insight.goDeeper}
        </p>
      )}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onContinue && onContinue();
        }}
        className="mt-6 w-full px-6 py-3 bg-teal text-cream rounded-lg font-sans font-medium hover:bg-opacity-90 transition-all pointer-events-auto"
      >
        Continue
      </button>
    </div>
  );

  return (
    <Card
      frontImage="/assets/cards/BurnoutBuddy-insight-card.png"
      backImage="/assets/cards/BurnoutBuddy-card-back-blank-insight.png"
      frontContent={frontContent}
      backContent={backContent}
      size="full"
      className="insight-card"
    />
  );
};

export default InsightCard;
