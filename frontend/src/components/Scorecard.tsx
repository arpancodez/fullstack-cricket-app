import React from 'react';

/**
 * Scorecard Component
 * Displays batting, bowling, commentary sections
 * Features swipeable run boxes for live cricket data
 * TODO: Implement scorecard UI with tabs/sections for:
 * - Batting scorecard (batsmen, runs, balls, 4s, 6s, SR)
 * - Bowling scorecard (bowlers, overs, maidens, runs, wickets, economy)
 * - Commentary (ball-by-ball description)
 * - Swipeable run boxes (0, 1, 2, 3, 4, 6, W)
 */

interface ScorecardProps {
  matchId: string;
}

const Scorecard: React.FC<ScorecardProps> = ({ matchId }) => {
  // TODO: Fetch match data using matchId from API
  
  return (
    <div className="scorecard-container">
      <h2>Scorecard - Match ID: {matchId}</h2>
      {/* TODO: Add batting scorecard section */}
      {/* TODO: Add bowling scorecard section */}
      {/* TODO: Add commentary section */}
      {/* TODO: Add swipeable run boxes */}
    </div>
  );
};

export default Scorecard;
