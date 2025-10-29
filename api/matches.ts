/**
 * Vercel Serverless Function: Matches Handler
 * 
 * This function handles match-related API endpoints:
 * - GET /api/matches - Get all matches
 * - GET /api/matches/:id - Get a specific match
 * - POST /api/matches - Create a new match
 * - PUT /api/matches/:id - Update a match
 * - DELETE /api/matches/:id - Delete a match
 * 
 * Migrated from backend/src/server.ts as part of Vercel serverless refactoring
 */

import { VercelRequest, VercelResponse } from '@vercel/node';

// Type definitions for matches
interface Match {
  id: string;
  team1: string;
  team2: string;
  venue: string;
  date: Date;
  status: 'upcoming' | 'live' | 'completed';
  team1Score?: string;
  team2Score?: string;
  winner?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateMatchRequest {
  team1: string;
  team2: string;
  venue: string;
  date: string;
}

interface UpdateMatchRequest {
  team1?: string;
  team2?: string;
  venue?: string;
  date?: string;
  status?: 'upcoming' | 'live' | 'completed';
  team1Score?: string;
  team2Score?: string;
  winner?: string;
}

// In-memory storage (replace with database in production)
const matches: Match[] = [];

// Helper function to extract match ID from URL
const extractMatchId = (url: string): string | null => {
  const match = url.match(/\/api\/matches\/([^\/\?]+)/);
  return match ? match[1] : null;
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
  const matchId = extractMatchId(req.url || '');

  try {
    // GET all matches
    if (method === 'GET' && !matchId) {
      return res.status(200).json({
        success: true,
        matches,
        count: matches.length
      });
    }

    // GET specific match
    if (method === 'GET' && matchId) {
      const match = matches.find(m => m.id === matchId);
      if (!match) {
        return res.status(404).json({
          success: false,
          message: 'Match not found'
        });
      }
      return res.status(200).json({
        success: true,
        match
      });
    }

    // POST - Create new match
    if (method === 'POST' && !matchId) {
      const { team1, team2, venue, date } = body as CreateMatchRequest;

      // Validation
      if (!team1 || !team2 || !venue || !date) {
        return res.status(400).json({
          success: false,
          message: 'Team1, team2, venue, and date are required'
        });
      }

      // Create new match
      const newMatch: Match = {
        id: Date.now().toString(),
        team1,
        team2,
        venue,
        date: new Date(date),
        status: 'upcoming',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      matches.push(newMatch);

      return res.status(201).json({
        success: true,
        message: 'Match created successfully',
        match: newMatch
      });
    }

    // PUT - Update match
    if (method === 'PUT' && matchId) {
      const matchIndex = matches.findIndex(m => m.id === matchId);
      if (matchIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Match not found'
        });
      }

      const updateData = body as UpdateMatchRequest;
      const existingMatch = matches[matchIndex];

      // Update match with new data
      matches[matchIndex] = {
        ...existingMatch,
        ...updateData,
        date: updateData.date ? new Date(updateData.date) : existingMatch.date,
        updatedAt: new Date()
      };

      return res.status(200).json({
        success: true,
        message: 'Match updated successfully',
        match: matches[matchIndex]
      });
    }

    // DELETE - Delete match
    if (method === 'DELETE' && matchId) {
      const matchIndex = matches.findIndex(m => m.id === matchId);
      if (matchIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Match not found'
        });
      }

      matches.splice(matchIndex, 1);

      return res.status(200).json({
        success: true,
        message: 'Match deleted successfully'
      });
    }

    // Method not allowed
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  } catch (error) {
    console.error('Match handler error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
