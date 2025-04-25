// // User interfaces
// export interface User {
//   id: number;
//   code: string;
//   username: string;
//   role: "admin" | "member" | "moderator" | "partner" | "contributor" | "user";
//   userImage?: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface Profile {
//   id: number;
//   userId: number;
//   firstName: string;
//   lastName: string;
//   email?: string;
//   phone?: string;
//   dob: string;
//   schoolName?: string;
//   schoolType?: string;
//   gradeLevel?: string;
//   classSection?: string;
//   languageCode?: string;
//   badge: "none" | "basic" | "bronze" | "silver" | "gold" | "platinum";
//   points: number;
//   heart: number;
//   showOnLeaderboard: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// // Course content types
export interface Module {
  id: number;
  title: string;
  description: string;
  slug: string;
  parent?: string;
  level: number;
  order?: number;
  requiredPoints: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  lessons?: Lesson[]; // Optional, to include lessons in the module
}

export interface Lesson {
  id: number;
  moduleId: number;
  title: string;
  description: string;
  slug: string;
  order: number;
  points: number;
  completionTime: number; // in minutes
  difficulty: "beginner" | "intermediate" | "advanced";
  createdAt: string;
  updatedAt: string;
}

// // Quiz types
// export interface Quiz {
//   id: number;
//   lessonId?: number | null; // Nullable for challenge questions
//   type:
//     | "multiple-choice"
//     | "fill-in-the-blank"
//     | "code-completion"
//     | "bug-fixing"
//     | "true-false"
//     | "match-pairs"
//     | "drag-drop";
//   question: string;
//   options?: string[]; // JSONB in schema, can be any JSON-compatible type
//   correctAnswer: string;
//   explanation?: string;
//   codeSnippet?: string;
//   language?: string;
//   reference?: string;
//   points: number;
//   timeLimit?: number; // in seconds
//   createdAt: string;
//   updatedAt: string;
// }
// export interface Question {
//   id: number;
//   lessonId: number;
//   type:
//     | "multiple-choice"
//     | "fill-in-the-blank"
//     | "code-completion"
//     | "bug-fixing"
//     | "true-false"
//     | "match-pairs"
//     | "drag-drop";
//   question: string;
//   options?: string[]; // JSONB in schema, can be any JSON-compatible type
//   correctAnswer: string;
//   explanation?: string; // explanation of the correct answer
//   codeSnippet?: string; // code snippet for code-completion questions
//   language?: string; // programming language for code-completion questions
//   reference?: string; // reference link for additional information
//   points: number; // points awarded for correct answer
//   timeLimit?: number; // time limit for answering the question in seconds
//   createdAt: string; // timestamp of question creation
//   updatedAt: string; // timestamp of last update
// }
// // Progress tracking
// export interface UserProgress {
//   id: number;
//   userId: number;
//   moduleId: number;
//   lessonId: number;
//   completed: boolean;
//   score: number;
//   correctAnswers: number;
//   totalQuestions: number;
//   timeSpent: number; // in seconds
//   completedAt?: string;
// }

// // Gamification
// export interface Badge {
//   id: number;
//   name: string;
//   description: string;
//   imageUrl: string;
//   criteria: string;
//   earnedAt?: string;
// }

// export interface LeaderboardEntry {
//   id: number;
//   userId: number;
//   username: string;
//   userImage?: string;
//   rank: number;
//   points: number;
// }

// export interface Challenge {
//   id: number;
//   title: string;
//   description: string;
//   difficulty: "beginner" | "intermediate" | "advanced";
//   points: number;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface ChallengeQuestion {
//   id: number;
//   challengeId: number;
//   questionId: number;
// }
