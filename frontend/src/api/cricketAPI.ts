import axios from 'axios';

/**
 * Cricket API Module
 * Handles all API calls for cricket data
 * 
 * TODO: Replace with actual API endpoint when available
 * Currently using dummy JSON data provider
 * 
 * Features:
 * - Fetch live match data
 * - Get scorecard details (batting, bowling, commentary)
 * - Authentication with backend
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Dummy data provider for testing
const DUMMY_MATCH_DATA = {
  matchId: '12345',
  teams: {
    team1: { name: 'India', score: '250/6', overs: '45.0' },
    team2: { name: 'Australia', score: '180/4', overs: '32.3' }
  },
  batting: [
    { player: 'Virat Kohli', runs: 85, balls: 92, fours: 8, sixes: 2, strikeRate: 92.39 },
    { player: 'Rohit Sharma', runs: 65, balls: 78, fours: 6, sixes: 1, strikeRate: 83.33 }
  ],
  bowling: [
    { bowler: 'Pat Cummins', overs: 8.0, maidens: 2, runs: 42, wickets: 2, economy: 5.25 },
    { bowler: 'Mitchell Starc', overs: 7.3, maidens: 1, runs: 38, wickets: 1, economy: 5.07 }
  ],
  commentary: [
    { over: 32.3, ball: 3, text: 'Wide! That was way down the leg side' },
    { over: 32.2, ball: 2, text: 'SIX! What a shot! Over mid-wicket for maximum' }
  ]
};

/**
 * Fetch live match data
 * @param matchId - The ID of the match
 * @returns Promise with match data
 */
export const getMatchData = async (matchId: string) => {
  try {
    // TODO: Replace with actual API call when available
    // const response = await axios.get(`${API_BASE_URL}/matches/${matchId}`);
    // return response.data;
    
    // Return dummy data for now
    return DUMMY_MATCH_DATA;
  } catch (error) {
    console.error('Error fetching match data:', error);
    throw error;
  }
};

/**
 * Authenticate user
 * @param userId - User ID
 * @param password - User password
 * @returns Promise with authentication token
 */
export const authenticateUser = async (userId: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      userId,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw error;
  }
};

/**
 * Get live scorecard
 * @param matchId - The ID of the match
 * @returns Promise with scorecard data
 */
export const getScorecard = async (matchId: string) => {
  try {
    // TODO: Replace with actual API call
    return DUMMY_MATCH_DATA;
  } catch (error) {
    console.error('Error fetching scorecard:', error);
    throw error;
  }
};
