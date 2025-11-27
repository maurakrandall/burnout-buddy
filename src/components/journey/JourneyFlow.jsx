import React, { useState } from 'react';
import ChallengeCard from '../cards/ChallengeCard';
import QuestionCard from '../cards/QuestionCard';
import ResponseCard from '../cards/ResponseCard';
import InsightCard from '../cards/InsightCard';
import ActionCard from '../cards/ActionCard';
import RestoreCard from '../cards/RestoreCard';
import challengesData from '../../data/challenges.json';
import insightsData from '../../data/insights.json';
import actionsData from '../../data/actions.json';
import restoreData from '../../data/restore.json';
import routingData from '../../data/routing.json';
import pairingData from '../../data/pairing.json';

/**
 * JourneyFlow Component
 * Orchestrates the complete 6-stage journey:
 * Challenge → Question → Response → Insight → Action → Restore
 */
const JourneyFlow = () => {
  const [stage, setStage] = useState('challenge');
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [currentInsight, setCurrentInsight] = useState(null);
  const [currentAction, setCurrentAction] = useState(null);
  const [currentRestore, setCurrentRestore] = useState(null);
  const [showResponseGrid, setShowResponseGrid] = useState(false);

  // Find data by ID
  const findInsight = (id) => insightsData.insights.find(i => i.id === id);
  const findAction = (id) => actionsData.actions.find(a => a.id === id);
  const findRestore = (id) => restoreData.restore.find(r => r.id === id);

  // Handle challenge selection
  const handleChallengeSelect = (challenge) => {
    setSelectedChallenge(challenge);
    setStage('question');
  };

  // Handle showing response grid
  const handleShowResponses = () => {
    setShowResponseGrid(true);
  };

  // Handle response selection
  const handleResponseSelect = (response) => {
    setSelectedResponse(response);
    
    // Route to insight using routing logic
    const insightId = response.routesTo;
    const insight = findInsight(insightId);
    
    if (insight) {
      setCurrentInsight(insight);
      setStage('insight');
    } else {
      // Fallback: show random insight if routing target doesn't exist
      const randomInsight = insightsData.insights[Math.floor(Math.random() * insightsData.insights.length)];
      setCurrentInsight(randomInsight);
      setStage('insight');
    }
  };

  // Handle insight continue (go to action)
  const handleInsightContinue = () => {
    // Find paired action (1:1 mapping: I1 → A1, I2 → A2, etc.)
    const actionId = currentInsight.id.replace('I', 'A');
    const action = findAction(actionId);
    
    if (action) {
      setCurrentAction(action);
      setStage('action');
    } else {
      // Fallback: show random action if paired action doesn't exist
      const randomAction = actionsData.actions[Math.floor(Math.random() * actionsData.actions.length)];
      setCurrentAction(randomAction);
      setStage('action');
    }
  };

  // Handle action continue (go to restore)
  const handleActionContinue = () => {
    // For MVP: always show level 3 restore (Ember)
    // In full app: this would be based on Glow Meter
    const restore = findRestore('R3.1') || restoreData.restore[2];
    setCurrentRestore(restore);
    setStage('restore');
  };

  // Handle restore actions
  const handleRestoreSave = () => {
    // TODO: Implement save functionality
    console.log('Journey saved!');
    handleRestartJourney();
  };

  const handleRestoreDone = () => {
    handleRestartJourney();
  };

  // Restart journey
  const handleRestartJourney = () => {
    setStage('challenge');
    setSelectedChallenge(null);
    setSelectedResponse(null);
    setCurrentInsight(null);
    setCurrentAction(null);
    setCurrentRestore(null);
    setShowResponseGrid(false);
  };

  return (
    <div className="journey-flow min-h-screen bg-cream flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        {/* Challenge Stage */}
        {stage === 'challenge' && (
          <div>
            <h1 className="text-4xl font-serif text-navy text-center mb-8">
              What brings you here?
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {challengesData.challenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onSelect={handleChallengeSelect}
                />
              ))}
            </div>
          </div>
        )}

        {/* Question Stage */}
        {stage === 'question' && selectedChallenge && (
          <div>
            <button 
              onClick={handleRestartJourney}
              className="mb-4 text-navy hover:text-teal transition-colors font-sans"
            >
              ← Back to challenges
            </button>
            
            {!showResponseGrid ? (
              <div className="flex justify-center">
                <QuestionCard
                  question={selectedChallenge.question}
                  responses={selectedChallenge.responses}
                  onContinue={handleShowResponses}
                />
              </div>
            ) : (
              <div>
                <h2 className="text-3xl font-serif text-navy text-center mb-8">
                  {selectedChallenge.question}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {selectedChallenge.responses.map((response) => (
                    <ResponseCard
                      key={response.id}
                      response={response}
                      onSelect={handleResponseSelect}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Insight Stage */}
        {stage === 'insight' && currentInsight && (
          <div>
            <button 
              onClick={handleRestartJourney}
              className="mb-4 text-navy hover:text-teal transition-colors font-sans"
            >
              ← Start over
            </button>
            <div className="flex justify-center">
              <InsightCard
                insight={currentInsight}
                onContinue={handleInsightContinue}
              />
            </div>
          </div>
        )}

        {/* Action Stage */}
        {stage === 'action' && currentAction && (
          <div>
            <button 
              onClick={handleRestartJourney}
              className="mb-4 text-navy hover:text-teal transition-colors font-sans"
            >
              ← Start over
            </button>
            <div className="flex justify-center">
              <ActionCard
                action={currentAction}
                onContinue={handleActionContinue}
              />
            </div>
          </div>
        )}

        {/* Restore Stage */}
        {stage === 'restore' && currentRestore && (
          <div>
            <div className="flex justify-center">
              <RestoreCard
                restore={currentRestore}
                onSave={handleRestoreSave}
                onDone={handleRestoreDone}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JourneyFlow;
