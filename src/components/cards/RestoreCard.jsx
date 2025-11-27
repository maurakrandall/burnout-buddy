import React from 'react';
import Card from './Card';

/**
 * RestoreCard Component
 * Gentle closure with affirmation, quote, and CTAs
 * 
 * Props:
 * - restore: object with front, back, quote, microcopy, footer, level
 * - onSave: callback for save action
 * - onDone: callback for done action
 */
const RestoreCard = ({ restore, onSave, onDone }) => {
  const frontContent = (
    <div className="text-center px-8">
      <h3 className="text-3xl font-serif text-cream font-semibold leading-snug">
        {restore.front}
      </h3>
      <p className="mt-4 text-sm text-cream opacity-90 font-sans italic">
        {restore.microcopy}
      </p>
      <p className="mt-6 text-sm text-cream opacity-75 font-sans">
        (tap to flip)
      </p>
    </div>
  );

  const backContent = (
    <div className="text-left px-8 py-12 overflow-y-auto max-h-full">
      <p className="text-base font-sans text-navy leading-relaxed mb-6">
        {restore.back}
      </p>
      
      {restore.quote && (
        <blockquote className="text-sm font-serif text-teal italic mb-6 pl-4 border-l-2 border-teal">
          {restore.quote}
        </blockquote>
      )}

      <p className="text-xs font-sans text-navy opacity-75 mb-6">
        {restore.footer}
      </p>

      <div className="flex gap-4">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onSave && onSave();
          }}
          className="flex-1 px-4 py-3 bg-teal text-cream rounded-lg font-sans font-medium hover:bg-opacity-90 transition-all pointer-events-auto"
        >
          Save Journey
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDone && onDone();
          }}
          className="flex-1 px-4 py-3 bg-navy text-cream rounded-lg font-sans font-medium hover:bg-opacity-90 transition-all pointer-events-auto"
        >
          Done for Now
        </button>
      </div>
    </div>
  );

  return (
    <Card
      frontImage="/assets/cards/BurnoutBuddy-restore-card.png"
      backImage="/assets/cards/BurnoutBuddy-card-back-blank-restore.png"
      frontContent={frontContent}
      backContent={backContent}
      size="full"
      className="restore-card"
    />
  );
};

export default RestoreCard;
