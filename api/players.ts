o/**
 * Vercel Serverless Function: Players Handler
 * 
 * This function handles player-related API endpoints:
 * - GET /api/players - Get all players
 * - GET /api/players/:id - Get a specific player
 * - POST /api/players - Create a new player
 * - PUT /api/players/:id - Update a player
 * - DELETE /api/players/:id - Delete a player
 * 
 * Migrated from backend/src/server.ts as part of Vercel serverless refactoring
 */

import { VercelRequest, VercelResponse } from '@vercel/node';

// Type definitions for players
interface Player {
  id: string;
  name: string;
  team: string;
  role: 'batsman' | 'bowler' | 'all-rounder' | 'wicket-keeper';
  battingStyle?: 'right-hand' | 'left-hand';
  bowlingStyle?: 'right-arm-fast' | 'left-arm-fast' | 'right-arm-spin' | 'left-arm-spin';
  age?: number;
  nationality: string;
  matches?: number;
  runs?: number;
  wickets?: number;
  average?: number;
  strikeRate?: number;
  createdAt: Date;
  updatedAt: Date;
}

interface CreatePlayerRequest {
  name: string;
  team: string;
  role: 'batsman' | 'bowler' | 'all-rounder' | 'wicket-keeper';
  battingStyle?: 'right-hand' | 'left-hand';
  bowlingStyle?: 'right-arm-fast' | 'left-arm-fast' | 'right-arm-spin' | 'left-arm-spin';
  age?: number;
  nationality: string;
}

interface UpdatePlayerRequest {
  name?: string;
  team?: string;
  role?: 'batsman' | 'bowler' | 'all-rounder' | 'wicket-keeper';
  battingStyle?: 'right-hand' | 'left-hand';
  bowlingStyle?: 'right-arm-fast' | 'left-arm-fast' | 'right-arm-spin' | 'left-arm-spin';
  age?: number;
  nationality?: string;
  matches?: number;
  runs?: number;
  wickets?: number;
  average?: number;
  strikeRate?: number;
}

// In-memory storage (replace with database in production)
const players: Player[] = [];

// Helper function to extract player ID from URL
const extractPlayerId = (url: string): string | null => {
  const match = url.match(/\/api\/players\/([^\/\?]+)/);
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
  const playerId = extractPlayerId(req.url || '');

  try {
    // GET all players
    if (method === 'GET' && !playerId) {
      // Optional filtering by team
      const { team } = req.query;
      let filteredPlayers = players;

      if (team && typeof team === 'string') {
        filteredPlayers = players.filter(p => p.team.toLowerCase() === team.toLowerCase());
      }

      return res.status(200).json({
        success: true,
        players: filteredPlayers,
        count: filteredPlayers.length
      });
    }

    // GET specific player
    if (method === 'GET' && playerId) {
      const player = players.find(p => p.id === playerId);
      if (!player) {
        return res.status(404).json({
          success: false,
          message: 'Player not found'
        });
      }
      return res.status(200).json({
        success: true,
        player
      });
    }

    // POST - Create new player
    if (method === 'POST' && !playerId) {
      const { name, team, role, nationality, battingStyle, bowlingStyle, age } = body as CreatePlayerRequest;

      // Validation
      if (!name || !team || !role || !nationality) {
        return res.status(400).json({
          success: false,
          message: 'Name, team, role, and nationality are required'
        });
      }

      // Create new player
      const newPlayer: Player = {
        id: Date.now().toString(),
        name,
        team,
        role,
        nationality,
        battingStyle,
        bowlingStyle,
        age,
        matches: 0,
        runs: 0,
        wickets: 0,
        average: 0,
        strikeRate: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      players.push(newPlayer);

      return res.status(201).json({
        success: true,
        message: 'Player created successfully',
        player: newPlayer
      });
    }

    // PUT - Update player
    if (method === 'PUT' && playerId) {
      const playerIndex = players.findIndex(p => p.id === playerId);
      if (playerIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Player not found'
        });
      }

      const updateData = body as UpdatePlayerRequest;
      const existingPlayer = players[playerIndex];

      // Update player with new data
      players[playerIndex] = {
        ...existingPlayer,
        ...updateData,
        updatedAt: new Date()
      };

      return res.status(200).json({
        success: true,
        message: 'Player updated successfully',
        player: players[playerIndex]
      });
    }

    // DELETE - Delete player
    if (method === 'DELETE' && playerId) {
      const playerIndex = players.findIndex(p => p.id === playerId);
      if (playerIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Player not found'
        });
      }

      players.splice(playerIndex, 1);

      return res.status(200).json({
        success: true,
        message: 'Player deleted successfully'
      });
    }

    // Method not allowed
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  } catch (error) {
    console.error('Player handler error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
