/**
 * Vercel Serverless Function: Scores Handler
 * 
 * This function handles score-related API endpoints:
 * - GET /api/scores - Get all scores
 * - GET /api/scores/:id - Get a specific score
 * - POST /api/scores - Create a new score
 * - PUT /api/scores/:id - Update a score
 * - DELETE /api/scores/:id - Delete a score
 * 
 * Migrated from backend/src/server.ts as part of Vercel serverless refactoring
 */

import { VercelRequest, VercelResponse } from '@vercel/node';

// Type definitions for scores
interface Score {
  id: string;
  matchId: string;
  playerId: string;
  playerName: string;
  team: string;
  runs?: number;
  ballsFaced?: number;
  fours?: number;
  sixes?: number;
  strikeRate?: number;
  wickets?: number;
  oversBowled?: number;
  runsConceded?: number;
  economyRate?: number;
  catches?: number;
  stumps?: number;
  runOuts?: number;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateScoreRequest {
  matchId: string;
  playerId: string;
  playerName: string;
  team: string;
  runs?: number;
  ballsFaced?: number;
  fours?: number;
  sixes?: number;
  wickets?: number;
  oversBowled?: number;
  runsConceded?: number;
  catches?: number;
  stumps?: number;
  runOuts?: number;
}

interface UpdateScoreRequest {
  runs?: number;
  ballsFaced?: number;
  fours?: number;
  sixes?: number;
  wickets?: number;
  oversBowled?: number;
  runsConceded?: number;
  catches?: number;
  stumps?: number;
  runOuts?: number;
}

// In-memory storage (replace with database in production)
const scores: Score[] = [];

/**
 * Extracts score ID from the request URL using regex pattern matching
 * @param url - The request URL
 * @returns Score ID if found, null otherwise
 */
// Helper function to extract score ID from URL
const extractScoreId = (url: string): string | null => {
  const match = url.match(/\/api\/scores\/([^\/\?]+)/);
  return match ? match[1] : null;
};

/**
 * Calculates the strike rate of a batter (runs per 100 balls)
 * @param runs - Total runs scored
 * @param ballsFaced - Total balls faced by the batter
 * @returns Strike rate percentage or 0 if ballsFaced is 0
 */
// Helper function to calculate strike rate
const calculateStrikeRate = (runs: number, ballsFaced: number): number => {
  if (ballsFaced === 0) return 0;
  return (runs / ballsFaced) * 100;
};

/**
 * Calculates the economy rate of a bowler (runs conceded per over)
 * @param runsConceded - Total runs conceded by the bowler
 * @param oversBowled - Total overs bowled by the bowler
 * @returns Economy rate or 0 if oversBowled is 0
 */
// Helper function to calculate economy rate
const calculateEconomyRate = (runsConceded: number, oversBowled: number): number => {
  if (oversBowled === 0) return 0;
  return runsConceded / oversBowled;
};

// Main handler function
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { method, body } = req;
  const scoreId = extractScoreId(req.url || '');

  try {
    // GET all scores
    if (method === 'GET' && !scoreId) {
      // Optional filtering by matchId or playerId
      const { matchId, playerId, team } = req.query;
      let filteredScores = scores;

      if (matchId && typeof matchId === 'string') {
        filteredScores = filteredScores.filter(s => s.matchId === matchId);
      }

      if (playerId && typeof playerId === 'string') {
        filteredScores = filteredScores.filter(s => s.playerId === playerId);
      }

      if (team && typeof team === 'string') {
        filteredScores = filteredScores.filter(s => s.team.toLowerCase() === team.toLowerCase());
      }

      return res.status(200).json({
        success: true,
        scores: filteredScores,
        count: filteredScores.length
      });
    }

    // GET specific score
    if (method === 'GET' && scoreId) {
      const score = scores.find(s => s.id === scoreId);
      if (!score) {
        return res.status(404).json({
          success: false,
          message: 'Score not found'
        });
      }
      return res.status(200).json({
        success: true,
        score
      });
    }

    // POST - Create new score
    if (method === 'POST' && !scoreId) {
      const {
        matchId,
        playerId,
        playerName,
        team,
        runs,
        ballsFaced,
        fours,
        sixes,
        wickets,
        oversBowled,
        runsConceded,
        catches,
        stumps,
        runOuts
      } = body as CreateScoreRequest;

      // Validation
      if (!matchId || !playerId || !playerName || !team) {
        return res.status(400).json({
          success: false,
          message: 'MatchId, playerId, playerName, and team are required'
        });
      }

      // Calculate strike rate and economy rate
      const strikeRate = runs && ballsFaced ? calculateStrikeRate(runs, ballsFaced) : undefined;
      const economyRate = runsConceded !== undefined && oversBowled ? calculateEconomyRate(runsConceded, oversBowled) : undefined;

      // Create new score
      const newScore: Score = {
        id: Date.now().toString(),
        matchId,
        playerId,
        playerName,
        team,
        runs,
        ballsFaced,
        fours,
        sixes,
        strikeRate,
        wickets,
        oversBowled,
        runsConceded,
        economyRate,
        catches,
        stumps,
        runOuts,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      scores.push(newScore);

      return res.status(201).json({
        success: true,
        message: 'Score created successfully',
        score: newScore
      });
    }

    // PUT - Update score
    if (method === 'PUT' && scoreId) {
      const scoreIndex = scores.findIndex(s => s.id === scoreId);
      if (scoreIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Score not found'
        });
      }

      const updateData = body as UpdateScoreRequest;
      const existingScore = scores[scoreIndex];

      // Recalculate strike rate and economy rate if relevant fields are updated
      const runs = updateData.runs !== undefined ? updateData.runs : existingScore.runs;
      const ballsFaced = updateData.ballsFaced !== undefined ? updateData.ballsFaced : existingScore.ballsFaced;
      const runsConceded = updateData.runsConceded !== undefined ? updateData.runsConceded : existingScore.runsConceded;
      const oversBowled = updateData.oversBowled !== undefined ? updateData.oversBowled : existingScore.oversBowled;

      const strikeRate = runs !== undefined && ballsFaced !== undefined ? calculateStrikeRate(runs, ballsFaced) : existingScore.strikeRate;
      const economyRate = runsConceded !== undefined && oversBowled !== undefined ? calculateEconomyRate(runsConceded, oversBowled) : existingScore.economyRate;

      // Update score with new data
      scores[scoreIndex] = {
        ...existingScore,
        ...updateData,
        strikeRate,
        economyRate,
        updatedAt: new Date()
      };

      return res.status(200).json({
        success: true,
        message: 'Score updated successfully',
        score: scores[scoreIndex]
      });
    }

    // DELETE - Delete score
    if (method === 'DELETE' && scoreId) {
      const scoreIndex = scores.findIndex(s => s.id === scoreId);
      if (scoreIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Score not found'
        });
      }

      scores.splice(scoreIndex, 1);

      return res.status(200).json({
        success: true,
        message: 'Score deleted successfully'
      });
    }

    // Method not allowed
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  } catch (error) {
    console.error('Score handler error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
