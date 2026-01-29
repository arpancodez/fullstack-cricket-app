import { Router, Request, Response } from 'express';
import * as cricketApiService from '../services/cricketApiService';

const router = Router();

/**
 * GET /api/scores/:matchId
 * Fetch live scorecard for a match
 */
router.get('/:matchId', async (req: Request, res: Response) => {
  try {
    const { matchId } = req.params;
    const scorecard = await cricketApiService.getScorecard(matchId);
    res.json({
      success: true,
      data: scorecard,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch scorecard',
      error: error.message,
    });
  }
});

/**
 * GET /api/scores/:matchId/commentary
 * Fetch match commentary
 */
router.get('/:matchId/commentary', async (req: Request, res: Response) => {
  try {
    const { matchId } = req.params;
    const commentary = await cricketApiService.getCommentary(matchId);
    res.json({
      success: true,
      data: commentary,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch commentary',
      error: error.message,
    });
  }
});

/**
 * GET /api/scores/:matchId/batting
 * Fetch batting stats
 */
router.get('/:matchId/batting', async (req: Request, res: Response) => {
  try {
    const { matchId } = req.params;
    const batting = await cricketApiService.getBattingStats(matchId);
    res.json({
      success: true,
      data: batting,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch batting stats',
      error: error.message,
    });
  }
});

/**
 * GET /api/scores/:matchId/bowling
 * Fetch bowling stats
 */
router.get('/:matchId/bowling', async (req: Request, res: Response) => {
  try {
    const { matchId } = req.params;
    const bowling = await cricketApiService.getBowlingStats(matchId);
    res.json({
      success: true,
      data: bowling,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bowling stats',
      error: error.message,
    });
  }
});

export default router;
