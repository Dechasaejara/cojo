// User interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  points: number;
  streak: number;
  level: number;
  completedLessons: string[];
  currentModule: string;
  badges: Badge[];
}

// Course content types
export interface Module {
  id: string;
  title: string;
  description: string;
  slug: string;
  level: number;
  lessons: Lesson[];
  requiredPoints: number;
  imageUrl?: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  slug: string;
  order: number;
  quizzes: Quiz[];
  points: number;
  completionTime: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// Quiz types
export interface Quiz {
  id: string;
  lessonId: string;
  type: QuizType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  codeSnippet?: string;
  language?: string;
  points: number;
  timeLimit?: number; // in seconds
}

export type QuizType =
  | 'multiple-choice'
  | 'code-completion'
  | 'bug-fixing'
  | 'match-pairs'
  | 'drag-drop'
  | 'true-false'
  | 'fill-in-the-blank';

// Progress tracking
export interface UserProgress {
  userId: string;
  moduleId: string;
  lessonId: string;
  completed: boolean;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number; // in seconds
  completedAt?: Date;
}

export interface UserQuizAnswer {
  userId: string;
  quizId: string;
  userAnswer: string | string[];
  isCorrect: boolean;
  timeTaken: number; // in seconds
  submittedAt: Date;
}

// Gamification
export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  criteria: string;
  earnedAt?: Date;
}

export interface Leaderboard {
  id: string;
  name: string;
  type: 'daily' | 'weekly' | 'monthly' | 'all-time';
  entries: LeaderboardEntry[];
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  userImage?: string;
  rank: number;
  points: number;
}

export interface Streak {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: Date;
}

export interface UserSettings {
  userId: string;
  dailyGoal: number; // in points
  notifications: boolean;
  soundEffects: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
}
