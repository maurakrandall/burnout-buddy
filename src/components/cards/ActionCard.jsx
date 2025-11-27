import React from 'react';
import Card from './Card';

/**
 * ActionCard Component
 * Shows action invitation on front, "Try This" on back
 * 
 * Props:
 * - action: object with id, front, back, tryThis, goDeeper
 * - onContinue: callback to proceed to restore
 */
const ActionCard = ({ action, onContinue }) => {
  const frontContent = (
    <div className="text-center px-8">
      <h3 className="text-2xl font-serif text-cream font-semibold leading-snug">
        {action.front}
      </h3>
      <p className="mt-4 text-sm text-cream opacity-90 font-sans">
        {action.back}
      </p>
      <p className="mt-6 text-sm text-cream opacity-75 font-sans">
        (tap to flip)
      </p>
    </div>
  );

  const backContent = (
    <div className="text-left px-8 py-12 overflow-y-auto max-h-full">
      <h4 className="text-lg font-serif text-terracotta font-bold mb-4">
        TRY THIS
      </h4>
      <p className="text-base font-sans text-navy leading-relaxed mb-6">
        {action.tryThis}
      </p>
      {action.goDeeper && (
        <p className="text-sm font-sans text-teal font-medium italic mb-6">
          {action.goDeeper}
        </p>
      )}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onContinue && onContinue();
        }}
        className="w-full px-6 py-3 bg-terracotta text-cream rounded-lg font-sans font-medium hover:bg-opacity-90 transition-all pointer-events-auto"
      >
        Continue
      </button>
    </div>
  );

  return (
    <Card
      frontImage="/assets/cards/BurnoutBuddy-action-card.png"
      backImage="/assets/cards/BurnoutBuddy-card-back-blank-active.png"
      frontContent={frontContent}
      backContent={backContent}
      size="full"
      className="action-card"
    />
  );
};

export default ActionCard;
