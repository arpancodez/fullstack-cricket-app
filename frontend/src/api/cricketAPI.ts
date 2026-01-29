import axios from 'axios';

/**
 * Cricket API Module
 * Handles all API calls for cricket data
 * 
 * Features:
 * - Fetch live match data from backend API
 * - Get scorecard details (batting, bowling, commentary)
 * - Real-time polling for live score updates
 * - Authentication with backend
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const POLLING_INTERVAL = parseInt(process.env.REACT_APP_POLLING_INTERVAL || '5000');
const ENABLE_LIVE_UPDATES = process.env.REACT_APP_ENABLE_LIVE_UPDATES !== 'false';

// Polling intervals map
const pollingIntervals: { [key: string]: NodeJS.Timeout } = {};

/**
 * Fetch all live matches
 */
export const getMatches = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/matches`);
    return response.data?.data || [];
  } catch (error) {
    console.error('Error fetching matches:', error);
    throw error;
  }
};

/**
 * Fetch specific match data
 */
export const getMatchData = async (matchId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/matches/${matchId}`);
    return response.data?.data;
  } catch (error) {
    console.error('Error fetching match data:', error);
    throw error;
  }
};

/**
 * Fetch live scorecard for a match
 */
export const getScorecard = async (matchId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/scores/${matchId}`);
    return response.data?.data;
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
    const response = await axios.get(`${API_BASE_URL}/scores/${matchId}/commentary`);
    return response.data?.data || [];
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
    const response = await axios.get(`${API_BASE_URL}/scores/${matchId}/batting`);
    return response.data?.data || [];
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
    const response = await axios.get(`${API_BASE_URL}/scores/${matchId}/bowling`);
    return response.data?.data || [];
  } catch (error) {
    console.error('Error fetching bowling stats:', error);
    throw error;
  }
};

/**
 * Subscribe to live score updates using polling
 * Periodically fetches scorecard and commentary updates
 */
export const subscribeToLiveScores = (
  matchId: string,
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  if (!ENABLE_LIVE_UPDATES) return;

  // Clear existing interval if any
  if (pollingIntervals[matchId]) {
    clearInterval(pollingIntervals[matchId]);
  }

  // Fetch immediately on subscribe
  const fetchUpdates = async () => {
    try {
      const scorecard = await getScorecard(matchId);
      const commentary = await getCommentary(matchId);
      callback({
        scorecard,
        commentary,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error in live score polling:', error);
      if (errorCallback) errorCallback(error);
    }
  };

  fetchUpdates();

  // Set up polling interval
  const interval = setInterval(fetchUpdates, POLLING_INTERVAL);
  pollingIntervals[matchId] = interval;

  return () => unsubscribeFromLiveScores(matchId);
};

/**
 * Unsubscribe from live score updates
 */
export const unsubscribeFromLiveScores = (matchId: string) => {
  if (pollingIntervals[matchId]) {
    clearInterval(pollingIntervals[matchId]);
    delete pollingIntervals[matchId];
  }
};

/**
 * Authenticate user
 */
export const authenticateUser = async (userId: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      userId,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw error;
  }
};

export default {
  getMatches,
  getMatchData,
  getScorecard,
  getCommentary,
  getBattingStats,
  getBowlingStats,
  subscribeToLiveScores,
  unsubscribeFromLiveScores,
  authenticateUser,
};
