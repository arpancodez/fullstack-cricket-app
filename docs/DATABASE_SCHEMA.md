# Database Schema

## Collections

### Users
- _id: ObjectId
- email: String
- password: String (hashed)
- name: String

### Matches
- _id: ObjectId
- date: Date
- team1: String
- team2: String
- status: String

### Scores
- _id: ObjectId
- matchId: ObjectId
- team: String
- runs: Number
- wickets: Number
