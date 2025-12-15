docs/API_DOCUMENTATION.md# Cricket App API Documentation

## Overview
This document provides comprehensive documentation for the Cricket App RESTful API endpoints.

## Base URL
```
http://localhost:5000/api
```

## Authentication
All endpoints (except login/register) require JWT authentication via the `Authorization` header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication Endpoints

#### Register User
- **POST** `/auth/register`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```
- **Response:**
  ```json
  {
    "token": "jwt_token",
    "user": { "id": "...", "email": "...", "name": "..." }
  }
  ```

#### Login User
- **POST** `/auth/login`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "token": "jwt_token",
    "user": { "id": "...", "email": "...", "name": "..." }
  }
  ```

### Match Endpoints

#### Get All Matches
- **GET** `/matches`
- **Query Parameters:**
  - `status` (optional): 'live', 'upcoming', 'completed'
  - `format` (optional): 'test', 'odi', 't20'
- **Response:** Array of match objects

#### Get Match Details
- **GET** `/matches/:id`
- **Response:** Match object with full details

### Score Endpoints

#### Get Live Scorecard
- **GET** `/scores/:matchId`
- **Response:**
  ```json
  {
    "matchId": "...",
    "innings": [
      {
        "team": "Team A",
        "runs": 150,
        "wickets": 3,
        "overs": 20
      }
    ]
  }
  ```

#### Get Commentary
- **GET** `/scores/:matchId/commentary`
- **Response:** Array of commentary objects

## Error Handling
All errors return appropriate HTTP status codes with error messages:
```json
{
  "error": "Error description"
}
```

## Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Server Error
