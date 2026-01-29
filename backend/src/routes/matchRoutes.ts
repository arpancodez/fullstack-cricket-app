import { Router, Request, Response } from 'express';
import * as cricketApiService from '../services/cricketApiService';

const router = Router();

/**
 * GET /api/matches
 * Fetch all live matches
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const matches = await cricketApiService.getLiveMatches();
    res.json({
      success: true,
      data: matches,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch matches',
      error: error.message,
    });
  }
});

/**
 * GET /api/matches/:id
 * Fetch specific match data
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const match = await cricketApiService.getMatchById(id);
    res.json({
      success: true,
      data: match,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch match',
      error: error.message,
    });
  }
});

export default router;
