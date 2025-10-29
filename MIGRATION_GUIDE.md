# Express to Vercel Serverless Migration Guide

## Overview

This guide documents the migration of the backend Express server to Vercel serverless functions. The refactoring enables serverless deployment while maintaining all existing functionality.

## What Changed

### 1. Architecture Transformation

**Before (Express Server):**
- Single `backend/src/server.ts` file running on a specific port
- Traditional Express app with `app.listen()` for continuous server execution
- Monolithic route handling in one file

**After (Vercel Serverless):**
- Individual serverless functions in the `api/` directory
- Each function handles specific endpoint categories
- No port binding or `app.listen()` - functions execute on-demand
- Automatic scaling and zero-config deployment

### 2. New Serverless Functions

All API endpoints have been migrated to individual serverless functions:

#### **api/auth.ts**
- **Endpoints:**
  - `POST /api/auth/register` - Register new user
  - `POST /api/auth/login` - User login
  - `POST /api/auth/logout` - User logout
- **Features:** Authentication handling, password hashing, user management

#### **api/matches.ts**
- **Endpoints:**
  - `GET /api/matches` - Get all matches
  - `GET /api/matches/:id` - Get specific match
  - `POST /api/matches` - Create new match
  - `PUT /api/matches/:id` - Update match
  - `DELETE /api/matches/:id` - Delete match
- **Features:** Full CRUD operations for cricket matches

#### **api/players.ts**
- **Endpoints:**
  - `GET /api/players` - Get all players (supports team filtering)
  - `GET /api/players/:id` - Get specific player
  - `POST /api/players` - Create new player
  - `PUT /api/players/:id` - Update player
  - `DELETE /api/players/:id` - Delete player
- **Features:** Player management with role-based categorization

#### **api/scores.ts**
- **Endpoints:**
  - `GET /api/scores` - Get all scores (supports match/player/team filtering)
  - `GET /api/scores/:id` - Get specific score
  - `POST /api/scores` - Create new score
  - `PUT /api/scores/:id` - Update score
  - `DELETE /api/scores/:id` - Delete score
- **Features:** Score tracking with automatic strike rate and economy rate calculation

### 3. Key Technical Changes

#### Import/Export Pattern
```typescript
// Old (Express)
import express from 'express';
const app = express();
app.listen(port);

// New (Vercel Serverless)
import { VercelRequest, VercelResponse } from '@vercel/node';
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) { /* ... */ }
```

#### CORS Handling
Each serverless function now includes explicit CORS headers:
```typescript
res.setHeader('Access-Control-Allow-Credentials', 'true');
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
```

#### Request Routing
- Old: Express router with separate route files
- New: Path-based routing within each handler function
- Each function examines `req.method` and `req.url` to determine action

### 4. Deployment Configuration

The `vercel.json` configuration ensures proper routing:
```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api" }
  ]
}
```

## Migration Benefits

✅ **Automatic Scaling** - Functions scale independently based on demand  
✅ **Cost Efficiency** - Pay only for execution time, not idle server time  
✅ **Zero Configuration** - No server management or infrastructure setup  
✅ **Global Distribution** - Automatic edge deployment for low latency  
✅ **Better Organization** - Logical separation of concerns by endpoint type  
✅ **Improved Maintainability** - Isolated functions are easier to test and debug  

## Database Considerations

⚠️ **Important:** Current implementation uses in-memory storage for demonstration purposes.

**For Production:**
- Replace in-memory arrays with a persistent database (MongoDB, PostgreSQL, etc.)
- Use environment variables for database connection strings
- Implement proper connection pooling for serverless
- Consider using Vercel's KV Storage or similar serverless-friendly databases

## Running Locally

### Development Server
```bash
# Install dependencies
cd api
npm install

# Run with Vercel CLI (recommended)
npm install -g vercel
vercel dev

# Access at http://localhost:3000
```

### Testing Endpoints
```bash
# Test authentication
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"pass123"}'

# Test matches
curl http://localhost:3000/api/matches

# Test players
curl http://localhost:3000/api/players

# Test scores
curl http://localhost:3000/api/scores
```

## Deployment

### Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Deploy to production
vercel --prod
```

### Environment Variables
Set any required environment variables in Vercel dashboard:
- `DATABASE_URL` - Database connection string
- `JWT_SECRET` - Secret for JWT token generation
- `NODE_ENV` - Environment (production/development)

## Testing

Each serverless function can be tested independently:

```bash
# Test individual function locally
vercel dev --listen 3000

# Test with different HTTP methods
curl -X GET http://localhost:3000/api/matches
curl -X POST http://localhost:3000/api/matches \
  -H "Content-Type: application/json" \
  -d '{"team1":"India","team2":"Australia","venue":"MCG","date":"2025-01-15"}'
```

## Troubleshooting

### Common Issues

**1. Function not found / 404 errors**
- Ensure `vercel.json` is properly configured
- Check that function files are in the `api/` directory
- Verify function names match URL paths

**2. CORS errors**
- CORS headers are set in each function
- Check OPTIONS preflight handling
- Verify Access-Control-Allow-Origin matches your frontend domain

**3. State not persisting between requests**
- This is expected with in-memory storage
- Implement persistent database for production
- Each function invocation is stateless

**4. Timeout errors**
- Vercel free tier has 10s timeout
- Pro tier extends to 60s
- Optimize database queries and external API calls

## Next Steps

### Recommended Improvements

1. **Add Database Integration**
   - Replace in-memory storage with MongoDB/PostgreSQL
   - Use Prisma or TypeORM for database management

2. **Implement Authentication Middleware**
   - Add JWT token generation and validation
   - Protect endpoints with authentication middleware
   - Implement role-based access control (RBAC)

3. **Add Input Validation**
   - Use Zod or Joi for request validation
   - Implement comprehensive error handling

4. **Enhance Testing**
   - Add unit tests for each handler function
   - Implement integration tests
   - Set up CI/CD pipeline

5. **Add Logging & Monitoring**
   - Integrate logging service (Logtail, Datadog, etc.)
   - Set up error tracking (Sentry)
   - Monitor function performance

6. **API Documentation**
   - Generate OpenAPI/Swagger documentation
   - Add request/response examples
   - Document error codes

## File Structure

```
fullstack-cricket-app/
├── api/                      # Serverless functions directory
│   ├── auth.ts              # Authentication endpoints
│   ├── matches.ts           # Match management endpoints
│   ├── players.ts           # Player management endpoints
│   ├── scores.ts            # Score tracking endpoints
│   ├── index.ts             # Main API entry (if needed)
│   ├── package.json         # API dependencies
│   └── tsconfig.json        # TypeScript configuration
├── backend/                 # Legacy Express code (can be archived)
│   └── src/
│       └── server.ts        # Original Express server (deprecated)
├── frontend/                # Frontend application
├── vercel.json              # Vercel configuration
├── MIGRATION_GUIDE.md       # This file
└── README.md                # Project documentation
```

## Support & Resources

- [Vercel Serverless Functions Documentation](https://vercel.com/docs/functions)
- [Vercel Node.js Runtime](https://vercel.com/docs/runtimes#official-runtimes/node-js)
- [Deploying with Vercel CLI](https://vercel.com/docs/cli)

## Migration Completed

✅ Authentication endpoints migrated to `api/auth.ts`  
✅ Match endpoints migrated to `api/matches.ts`  
✅ Player endpoints migrated to `api/players.ts`  
✅ Score endpoints migrated to `api/scores.ts`  
✅ Removed `app.listen()` and port dependencies  
✅ Updated imports/exports to Vercel format  
✅ Added comprehensive CORS support  
✅ Documented migration process  

---

**Migration Date:** October 29, 2025  
**Status:** ✅ Complete  
**Ready for Deployment:** Yes
