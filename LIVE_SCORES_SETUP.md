# Live Cricket Scores on Vercel - Setup Guide

This guide explains the changes made to enable live cricket scores on the Vercel deployment.

## Changes Made

### 1. Backend API Service (`backend/src/services/cricketApiService.ts`)
- Created a cricket API service that handles live score data
- Includes mock data for testing
- Provides functions to fetch:
  - Live matches
  - Match scorecards
  - Commentary
  - Batting and bowling statistics
- **TODO**: Replace mock data with real external API calls when cricket API provider is available

### 2. Backend Routes

#### Match Routes (`backend/src/routes/matchRoutes.ts`)
- `GET /api/matches` - Fetch all live matches
- `GET /api/matches/:id` - Fetch specific match data

#### Score Routes (`backend/src/routes/scoreRoutes.ts`)
- `GET /api/scores/:matchId` - Fetch live scorecard
- `GET /api/scores/:matchId/commentary` - Fetch match commentary
- `GET /api/scores/:matchId/batting` - Fetch batting statistics
- `GET /api/scores/:matchId/bowling` - Fetch bowling statistics

### 3. Serverless API Handler (`api/index.ts`)
- Enabled imports of match and score routes
- Routes are now active and accessible on Vercel
- Proper error handling middleware included

### 4. Frontend Configuration (`frontend/.env`)
```
REACT_APP_API_URL=https://fullstack-cricket-app.vercel.app/api
REACT_APP_POLLING_INTERVAL=5000
REACT_APP_ENABLE_LIVE_UPDATES=true
```

### 5. Frontend API Module (`frontend/src/api/cricketAPI.ts`)
- Updated to use the deployed API URL from environment variables
- Implements polling for live score updates
- New functions:
  - `subscribeToLiveScores(matchId, callback)` - Subscribe to live score updates with 5-second polling
  - `unsubscribeFromLiveScores(matchId)` - Unsubscribe from live updates
  - `getMatches()` - Fetch all matches from `/api/matches`
  - `getScorecard(matchId)` - Fetch scorecard from `/api/scores/:matchId`
  - `getCommentary(matchId)` - Fetch commentary updates
  - `getBattingStats(matchId)` - Fetch batting statistics
  - `getBowlingStats(matchId)` - Fetch bowling statistics

## How Live Scores Work

### Polling Architecture
The frontend uses **polling** to fetch live updates every 5 seconds:

```typescript
// On a scorecard page component:
import { subscribeToLiveScores } from '../api/cricketAPI';

// Subscribe to live updates
const unsubscribe = subscribeToLiveScores(matchId, (data) => {
  // data.scorecard - updated scorecard
  // data.commentary - updated commentary
  // data.updatedAt - timestamp of update
  setScorecard(data.scorecard);
  setCommentary(data.commentary);
});

// On component unmount:
useEffect(() => {
  return () => unsubscribe();
}, []);
```

### Vercel Deployment Flow
1. Frontend makes request to `https://fullstack-cricket-app.vercel.app/api/matches`
2. Vercel routes request to serverless function at `api/index.ts`
3. API calls `cricketApiService` methods
4. Returns JSON data with live scores
5. Frontend updates UI with fresh data every 5 seconds

## Environment Variables on Vercel

Add these to Vercel Project Settings → Environment Variables:

```
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<strong-random-secret>
CRICKET_API_BASE_URL=https://api.cricketapi.com (optional, for future integration)
CRICKET_API_KEY=<your-api-key> (optional, for future integration)
```

## Next Steps

### 1. Replace Mock Data with Real API
Update `cricketApiService.ts` to call a real cricket data provider:
```typescript
export const getLiveMatches = async () => {
  const response = await axios.get(`${CRICKET_API_BASE_URL}/matches?status=live`, {
    headers: { 'X-API-Key': CRICKET_API_KEY }
  });
  return response.data;
};
```

### 2. Add WebSocket Support (Future Enhancement)
For true real-time updates without polling:
- Implement Socket.io on backend
- Replace polling with WebSocket listeners
- Benefits: Lower latency, less bandwidth

### 3. Add MongoDB Persistence
- Store match data in MongoDB
- Cache API responses
- Reduce external API calls

### 4. Recommended Cricket APIs
- **Cricket API** (cricketapi.com)
- **Sportradar** (enterprise grade)
- **ESPNcricinfo** (if available)
- **Cricketdata** (open source)

## Testing Live Scores

### Test on localhost:
```bash
cd frontend
npm start
# Visit http://localhost:3000
```

### Test on Vercel:
1. Push changes to main branch
2. Vercel auto-deploys
3. Visit `https://fullstack-cricket-app.vercel.app`
4. Navigate to match scorecard
5. Observe scorecard and commentary updating every 5 seconds

## Troubleshooting

### Scores not updating?
- Check browser console for API errors
- Verify `REACT_APP_API_URL` is set correctly in frontend/.env
- Check Vercel function logs: `vercel logs`
- Ensure MongoDB connection works: `echo $MONGODB_URI`

### API returns 500 error?
- Check backend logs in Vercel
- Verify cricketApiService is imported in api/index.ts
- Check routes are correctly registered

### Polling too frequent?
- Adjust `REACT_APP_POLLING_INTERVAL` in frontend/.env
- Default is 5000ms (5 seconds)
- Increase to reduce API calls

## Performance Optimization Tips

1. **Debounce updates** - Don't re-render if data hasn't changed
2. **Conditional polling** - Stop polling when match ends
3. **Cache responses** - Use React Query or SWR
4. **Lazy load** - Load additional stats on demand
5. **Optimize bundle** - Code-split scorecard component

## Architecture Diagram

```
┌─────────────────┐
│   React App     │
│  (Frontend)     │
└────────┬────────┘
         │
    polling every 5s
         │
         ▼
┌─────────────────────────┐
│ https://vercel.app/api  │
│  (Serverless Functions) │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ cricketApiService       │
│ (Live Match Data)       │
│                         │
│ - getLiveMatches()      │
│ - getScorecard()        │
│ - getCommentary()       │
│ - getStats()            │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Cricket Data Provider   │
│ (External API)          │
│ [Future Integration]    │
└─────────────────────────┘
```

## Summary

The cricket app now has:
✅ Live score APIs on Vercel
✅ Polling mechanism for real-time updates
✅ Proper environment configuration
✅ Mock data for testing
✅ Ready for real API integration

The app will show live scores updating every 5 seconds when deployed on Vercel!
