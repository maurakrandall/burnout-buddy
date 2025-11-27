import React from 'react';
import Card from './Card';

/**
 * QuestionCard Component
 * Shows the challenge question - doesn't flip, leads to response selection
 * 
 * Props:
 * - question: string question text
 * - responses: array of response objects
 * - onContinue: callback to show response selection
 */
const QuestionCard = ({ question, responses, onContinue }) => {
  const frontContent = (
    <div className="text-center px-8">
      <h3 className="text-2xl font-serif text-cream font-semibold leading-snug">
        {question}
      </h3>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onContinue && onContinue();
        }}
        className="mt-8 px-6 py-3 bg-teal text-cream rounded-lg font-sans font-medium hover:bg-opacity-90 transition-all pointer-events-auto"
      >
        Show Options
      </button>
    </div>
  );

  return (
    <Card
      frontImage="/assets/cards/BurnoutBuddy-question-card.png"
      backImage="/assets/cards/BurnoutBuddy-card-back-blank-question.png"
      frontContent={frontContent}
      backContent={null}
      size="full"
      onClick={null} // Don't flip on click
      className="question-card"
    />
  );
};

export default QuestionCard;
