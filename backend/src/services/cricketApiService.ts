/**
 * Cricket API Service
 * Fetches live cricket data from external API or mock data
 * Normalizes data for use in the application
 */

import axios from 'axios';

const CRICKET_API_BASE_URL = process.env.CRICKET_API_BASE_URL || 'https://api.cricketapi.com';
const CRICKET_API_KEY = process.env.CRICKET_API_KEY || 'demo';

// Mock live match data (Replace with real API calls)
const MOCK_LIVE_MATCHES = [
  {
    id: 'match_001',
    status: 'live',
    team1: { name: 'India', code: 'IND' },
    team2: { name: 'Australia', code: 'AUS' },
    format: 'ODI',
    startDate: new Date(),
  },
  {
    id: 'match_002',
    status: 'live',
    team1: { name: 'England', code: 'ENG' },
    team2: { name: 'Pakistan', code: 'PAK' },
    format: 'T20',
    startDate: new Date(),
  },
];

const MOCK_SCORECARD = {
  matchId: 'match_001',
  status: 'live',
  toss: {
    winner: 'India',
    decision: 'bat',
  },
  batting: [
    {
      player: 'Rohit Sharma',
      runs: 45,
      balls: 52,
      fours: 4,
      sixes: 1,
      strikeRate: 86.54,
      dismissal: null,
    },
    {
      player: 'Virat Kohli',
      runs: 78,
      balls: 89,
      fours: 8,
      sixes: 2,
      strikeRate: 87.64,
      dismissal: null,
    },
  ],
  bowling: [
    {
      bowler: 'Pat Cummins',
      overs: 8.2,
      maidens: 1,
      runs: 42,
      wickets: 2,
      economy: 5.04,
    },
    {
      bowler: 'Mitchell Starc',
      overs: 7.0,
      maidens: 0,
      runs: 38,
      wickets: 1,
      economy: 5.43,
    },
  ],
  commentary: [
    { over: 32.2, ball: 2, text: 'SIX! Over mid-wicket for maximum', player: 'Virat Kohli' },
    { over: 32.1, ball: 1, text: 'Four! Through covers', player: 'Virat Kohli' },
    { over: 32.0, ball: 0, text: 'Dot ball', player: 'Rohit Sharma' },
  ],
};

/**
 * Fetch all live matches
 */
export const getLiveMatches = async () => {
  try {
    // TODO: Replace with actual API call
    // const response = await axios.get(`${CRICKET_API_BASE_URL}/matches?status=live`, {
    //   headers: { 'X-API-Key': CRICKET_API_KEY }
    // });
    // return response.data;
    
    return MOCK_LIVE_MATCHES;
  } catch (error) {
    console.error('Error fetching live matches:', error);
    throw error;
  }
};

/**
 * Fetch specific match data
 */
export const getMatchById = async (matchId: string) => {
  try {
    // TODO: Replace with actual API call
    // const response = await axios.get(`${CRICKET_API_BASE_URL}/matches/${matchId}`, {
    //   headers: { 'X-API-Key': CRICKET_API_KEY }
    // });
    // return response.data;
    
    return MOCK_LIVE_MATCHES.find(m => m.id === matchId) || MOCK_LIVE_MATCHES[0];
  } catch (error) {
    console.error('Error fetching match:', error);
    throw error;
  }
};

/**
 * Fetch live scorecard for a match
 */
export const getScorecard = async (matchId: string) => {
  try {
    // TODO: Replace with actual API call
    // const response = await axios.get(`${CRICKET_API_BASE_URL}/matches/${matchId}/scorecard`, {
    //   headers: { 'X-API-Key': CRICKET_API_KEY }
    // });
    // return response.data;
    
    return { ...MOCK_SCORECARD, matchId };
  } catch (error) {
    console.error('Error fetching scorecard:', error);
    throw error;
  }
};

/**
 * Fetch match commentary
 */
export const getCommentary = async (matchId: string) => {
  try {
    // TODO: Replace with actual API call
    // const response = await axios.get(`${CRICKET_API_BASE_URL}/matches/${matchId}/commentary`, {
    //   headers: { 'X-API-Key': CRICKET_API_KEY }
    // });
    // return response.data;
    
    return MOCK_SCORECARD.commentary;
  } catch (error) {
    console.error('Error fetching commentary:', error);
    throw error;
  }
};

/**
 * Fetch batting stats for a match
 */
export const getBattingStats = async (matchId: string) => {
  try {
    // TODO: Replace with actual API call
    const scorecard = await getScorecard(matchId);
    return scorecard.batting;
  } catch (error) {
    console.error('Error fetching batting stats:', error);
    throw error;
  }
};

/**
 * Fetch bowling stats for a match
 */
export const getBowlingStats = async (matchId: string) => {
  try {
    // TODO: Replace with actual API call
    const scorecard = await getScorecard(matchId);
    return scorecard.bowling;
  } catch (error) {
    console.error('Error fetching bowling stats:', error);
    throw error;
  }
};

export default {
  getLiveMatches,
  getMatchById,
  getScorecard,
  getCommentary,
  getBattingStats,
  getBowlingStats,
};
