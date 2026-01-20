/**
 * Type Definitions and Interfaces
 * Central place for all TypeScript interfaces and types used across the application
 */

export interface User {
  id: string;
  username: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
  createdAt: Date;
}

export interface Player {
  id: string;
  name: string;
  teamId: string;
  jerseyNumber: number;
  role: 'batsman' | 'bowler' | 'all-rounder';
  createdAt: Date;
}

export interface Match {
  id: string;
  team1Id: string;
  team2Id: string;
  venue: string;
  format: 'T20' | 'ODI' | 'Test';
  status: 'scheduled' | 'live' | 'completed';
  startTime: Date;
  endTime?: Date;
  createdAt: Date;
}

export interface Score {
  id: string;
  matchId: string;
  teamId: string;
  runs: number;
  wickets: number;
  overs: number;
  balls: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Commentary {
  id: string;
  matchId: string;
  text: string;
  timestamp: Date;
  createdAt: Date;
}

export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
