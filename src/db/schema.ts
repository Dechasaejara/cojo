import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
  text,
  pgEnum,
  jsonb,
  boolean,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

// Enum Definitions
export const RoleEnum = pgEnum("role", [
  "admin",
  "member",
  "moderator",
  "partner",
  "contributor",
  "user",
]);

export const QuizTypeEnum = pgEnum("quiz_type", [
  "multiple-choice",
  "fill-in-the-blank",
  "code-completion",
  "bug-fixing",
  "true-false",
  "match-pairs",
  "drag-drop",
]);

export const DifficultyEnum = pgEnum("difficulty", [
  "beginner",
  "intermediate",
  "advanced",
]);

export const ProgressEnum = pgEnum("progress", [
  "pending",
  "in_progress",
  "completed",
  "failed",
]);

export const BadgeEnum = pgEnum("badge", [
  "none",
  "basic",
  "bronze",
  "silver",
  "gold",
  "platinum",
]);

// Users Table
export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  username: text("username").notNull(),
  role: RoleEnum("role").default("user"),
  userImage: text("user_image"),
  createdAt: timestamp("created_at", { mode: "string" }).default(sql`now()`),
  updatedAt: timestamp("updated_at", { mode: "string" }).default(sql`now()`),
});

// Profiles Table
export const Profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => Users.id, { onDelete: "cascade" }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").unique(),
  phone: text("phone").unique(),
  dob: timestamp("dob", { mode: "string" }).default(sql`now()`),
  schoolName: text("school_name"),
  schoolType: text("school_type"),
  gradeLevel: text("grade_level"),
  classSection: text("class_section"),
  languageCode: text("language_code"),
  badge: BadgeEnum("badge").default("none"),
  points: integer("points").default(0),
  heart: integer("heart").default(5),
  showOnLeaderboard: boolean("show_on_leaderboard").default(false),
  createdAt: timestamp("created_at", { mode: "string" }).default(sql`now()`),
  updatedAt: timestamp("updated_at", { mode: "string" }).default(sql`now()`),
});

// Badges Table
export const Badges = pgTable("badges", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description").notNull(),
  imageUrl: varchar("image_url", { length: 255 }).notNull(),
  criteria: text("criteria").notNull(),
  earnedAt: timestamp("earned_at", { mode: "string" }),
});

// Modules Table
export const Modules = pgTable("modules", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description").notNull(),
  slug: varchar("slug", { length: 100 }).notNull(),
  parent: varchar("parent", { length: 100 }),
  level: integer("level").notNull(),
  order: integer("order").unique(),
  requiredPoints: integer("required_points").notNull(),
  imageUrl: varchar("image_url", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).default(sql`now()`),
  updatedAt: timestamp("updated_at", { mode: "string" }).default(sql`now()`),
});

// Lessons Table
export const Lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  moduleId: integer("module_id")
    .notNull()
    .references(() => Modules.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description").notNull(),
  slug: varchar("slug", { length: 100 }).notNull(),
  order: integer("order").notNull(),
  points: integer("points").notNull(),
  completionTime: integer("completion_time").notNull(),
  difficulty: DifficultyEnum("difficulty").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).default(sql`now()`),
  updatedAt: timestamp("updated_at", { mode: "string" }).default(sql`now()`),
});

// Questions Table
export const Questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").references(() => Lessons.id, {
    onDelete: "cascade",
  }),
  type: QuizTypeEnum("quiz_type").notNull(),
  question: text("question").notNull(),
  options: jsonb("options"),
  correctAnswer: text("correct_answer").notNull(),
  explanation: text("explanation"),
  codeSnippet: text("code_snippet"),
  language: varchar("language", { length: 50 }),
  reference: varchar("reference", { length: 350 }),
  points: integer("points").notNull(),
  timeLimit: integer("time_limit"),
  createdAt: timestamp("created_at", { mode: "string" }).default(sql`now()`),
  updatedAt: timestamp("updated_at", { mode: "string" }).default(sql`now()`),
});

// Leaderboard Table
export const Leaderboard = pgTable("leaderboard", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => Users.id, { onDelete: "cascade" }),
  username: varchar("username", { length: 50 }).notNull(),
  userImage: varchar("user_image", { length: 255 }),
  rank: integer("rank").notNull(),
  points: integer("points").notNull(),
});

// User Progress Table
export const UserProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => Users.id, { onDelete: "cascade" }),
  moduleId: integer("module_id")
    .notNull()
    .references(() => Modules.id, { onDelete: "cascade" }),
  lessonId: integer("lesson_id")
    .notNull()
    .references(() => Lessons.id, { onDelete: "cascade" }),
  completed: boolean("completed").default(false),
  score: integer("score").notNull(),
  correctAnswers: integer("correct_answers").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  timeSpent: integer("time_spent").notNull(),
  completedAt: timestamp("completed_at", { mode: "string" }),
});

// Challenges Table
export const Challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description").notNull(),
  difficulty: DifficultyEnum("difficulty").notNull(),
  points: integer("points").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).default(sql`now()`),
  updatedAt: timestamp("updated_at", { mode: "string" }).default(sql`now()`),
});

// Challenge Questions Table
export const ChallengeQuestions = pgTable("challenge_questions", {
  id: serial("id").primaryKey(),
  challengeId: integer("challenge_id")
    .notNull()
    .references(() => Challenges.id, { onDelete: "cascade" }),
  questionId: integer("question_id")
    .notNull()
    .references(() => Questions.id, { onDelete: "cascade" }),
});

// Relations
export const UserRelations = relations(Users, ({ many }) => ({
  profiles: many(Profiles),
  leaderboard: many(Leaderboard),
  progress: many(UserProgress),
}));

export const ProfileRelations = relations(Profiles, ({ one }) => ({
  user: one(Users, {
    fields: [Profiles.userId],
    references: [Users.id],
  }),
}));

export const ModuleRelations = relations(Modules, ({ many }) => ({
  lessons: many(Lessons),
}));

export const LessonRelations = relations(Lessons, ({ many, one }) => ({
  questions: many(Questions),
  module: one(Modules, {
    fields: [Lessons.moduleId],
    references: [Modules.id],
  }),
}));

export const QuestionRelations = relations(Questions, ({ one, many }) => ({
  lesson: one(Lessons, {
    fields: [Questions.lessonId],
    references: [Lessons.id],
  }),
  challengeQuestions: many(ChallengeQuestions),
}));

export const LeaderboardRelations = relations(Leaderboard, ({ one }) => ({
  user: one(Users, {
    fields: [Leaderboard.userId],
    references: [Users.id],
  }),
}));

export const UserProgressRelations = relations(UserProgress, ({ one }) => ({
  user: one(Users, {
    fields: [UserProgress.userId],
    references: [Users.id],
  }),
  module: one(Modules, {
    fields: [UserProgress.moduleId],
    references: [Modules.id],
  }),
  lesson: one(Lessons, {
    fields: [UserProgress.lessonId],
    references: [Lessons.id],
  }),
}));

export const ChallengeRelations = relations(Challenges, ({ many }) => ({
  challengeQuestions: many(ChallengeQuestions),
}));

export const ChallengeQuestionRelations = relations(ChallengeQuestions, ({ one }) => ({
  challenge: one(Challenges, {
    fields: [ChallengeQuestions.challengeId],
    references: [Challenges.id],
  }),
  question: one(Questions, {
    fields: [ChallengeQuestions.questionId],
    references: [Questions.id],
  }),
}));

// Export types
export type User = typeof Users.$inferSelect;
export type Profile = typeof Profiles.$inferSelect;
export type Badge = typeof Badges.$inferSelect;
export type Module = typeof Modules.$inferSelect;
export type Lesson = typeof Lessons.$inferSelect;
export type Question = typeof Questions.$inferSelect;
export type LeaderboardEntry = typeof Leaderboard.$inferSelect;
export type UserProgressEntry = typeof UserProgress.$inferSelect;
export type Challenge = typeof Challenges.$inferSelect;
export type ChallengeQuestion = typeof ChallengeQuestions.$inferSelect;