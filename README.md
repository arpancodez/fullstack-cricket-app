# Fullstack Cricket App

A professional full-stack web application for live cricket match scorecards featuring real-time updates, user authentication, and an intuitive UI inspired by Google's cricket scorecard design.

## 🎯 Project Overview

This application provides a comprehensive cricket scoring platform with live match data, interactive scorecard UI, and swipeable run boxes. Built for localhost/machine deployment with a focus on performance, user experience, and real-time data updates.

### Key Highlights
- 🔐 Secure user authentication system
- 📊 Live match scorecard with batting and bowling statistics
- 💬 Real-time commentary updates
- 📱 Responsive design with swipeable run boxes
- 🚀 Modern tech stack with TypeScript throughout
- 🎨 Clean, intuitive UI inspired by Google Cricket

## 🛠️ Tech Stack

### Frontend
- **React** - UI library for building interactive components
- **TypeScript** - Type-safe JavaScript for robust code
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with flexbox/grid

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **TypeScript** - Type-safe backend development
- **MongoDB** - NoSQL database for data storage
- **JWT** - JSON Web Tokens for authentication
- **WebSockets** - Real-time score updates
- **bcryptjs** - Password hashing and security

### Development Tools
- **npm** - Package manager
- **ts-node** - TypeScript execution for Node.js
- **nodemon** - Development server with auto-reload
- **ESLint** - Code linting

## 📁 Project Structure

```
fullstack-cricket-app/
│
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── routes/          # API routes
│   │   ├── models/          # Database models
│   │   ├── middleware/      # Authentication & validation
│   │   ├── services/        # Business logic & external APIs
│   │   └── server.ts        # Application entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page-level components
│   │   ├── api/             # API integration
│   │   ├── App.tsx          # Root component
│   │   └── index.tsx        # Application entry point
│   ├── public/              # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   └── .gitignore
│
├── README.md
└── .gitignore
```

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB (v5 or higher)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cricket-app
JWT_SECRET=your_jwt_secret_key_here
CRICKET_API_KEY=your_cricket_api_key_here
```

4. Build the TypeScript code:
```bash
npm run build
```

5. Start the development server:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

The frontend application will run on `http://localhost:3000`

## 📖 Usage

### Authentication
1. Register a new account with email and password
2. Login to access the cricket dashboard
3. JWT tokens are used for secure session management

### Live Match Scorecard
1. Browse available live matches
2. Select a match to view detailed scorecard
3. View batting statistics (runs, balls, 4s, 6s, strike rate)
4. View bowling statistics (overs, maidens, runs, wickets, economy)
5. Read live commentary updates
6. Use swipeable run boxes for mobile-friendly navigation

### API Endpoints

**Authentication:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

**Matches:**
- `GET /api/matches` - Get all live matches
- `GET /api/matches/:id` - Get match details

**Players:**
- `GET /api/players` - Get player information
- `GET /api/players/:id` - Get player details

**Scores:**
- `GET /api/scores/:matchId` - Get live scorecard
- `GET /api/scores/:matchId/commentary` - Get live commentary

## ✨ Features

### Implemented
- ✅ User authentication (registration, login, JWT)
- ✅ Backend folder structure with TypeScript
- ✅ Frontend folder structure with React + TypeScript
- ✅ RESTful API architecture
- ✅ Database models for users, matches, players, scores
- ✅ Middleware for authentication and validation

### To Be Implemented
- 🔄 Live cricket data integration with external API
- 🔄 Real-time WebSocket updates for scores
- 🔄 Scorecard UI with batting/bowling statistics
- 🔄 Commentary section with live updates
- 🔄 Swipeable run boxes for mobile interface
- 🔄 Match filtering and search functionality
- 🔄 Player profiles with career statistics
- 🔄 Match history and archives
- 🔄 Responsive design for all devices
- 🔄 Unit and integration tests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Developed with ❤️ by arpancodez

## 🙏 Acknowledgments

- Google Cricket scorecard for UI inspiration
- Cricket API providers for live data
- Open source community for amazing tools and libraries
