import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
  text,
  pgEnum,
  jsonb,
  bigint,
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
  image_url: varchar("image_url", { length: 255 }).notNull(),
  criteria: text("criteria").notNull(),
  earned_at: timestamp("earned_at", { mode: "string" }),
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
  required_points: integer("required_points").notNull(),
  image_url: varchar("image_url", { length: 255 }).notNull(),
  created_at: timestamp("created_at", { mode: "string" }).default(sql`now()`),
  updated_at: timestamp("updated_at", { mode: "string" }).default(sql`now()`),
});

// Lessons Table
export const Lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  module_id: integer("module_id")
    .notNull()
    .references(() => Modules.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description").notNull(),
  slug: varchar("slug", { length: 100 }).notNull(),
  order: integer("order").notNull(),
  points: integer("points").notNull(),
  completion_time: integer("completion_time").notNull(),
  difficulty: DifficultyEnum("difficulty").notNull(),
  created_at: timestamp("created_at", { mode: "string" }).default(sql`now()`),
  updated_at: timestamp("updated_at", { mode: "string" }).default(sql`now()`),
});

// Quizzes Table
export const Questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  lesson_id: integer("lesson_id").references(() => Lessons.id, {
    onDelete: "cascade",
  }),
  type: QuizTypeEnum("quiz_type").notNull(),
  question: text("question").notNull(),
  options: jsonb("options"),
  correct_answer: text("correct_answer").notNull(),
  explanation: text("explanation"),
  code_snippet: text("code_snippet"),
  language: varchar("language", { length: 50 }),
  reference: varchar("reference", { length: 350 }),
  points: integer("points").notNull(),
  time_limit: integer("time_limit"),
  created_at: timestamp("created_at", { mode: "string" }).default(sql`now()`),
  updated_at: timestamp("updated_at", { mode: "string" }).default(sql`now()`),
});

// Leaderboard Table
export const Leaderboard = pgTable("leaderboard", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => Users.id, { onDelete: "cascade" }),
  username: varchar("username", { length: 50 }).notNull(),
  user_image: varchar("user_image", { length: 255 }),
  rank: integer("rank").notNull(),
  points: integer("points").notNull(),
});

// User Progress Table
export const UserProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => Users.id, { onDelete: "cascade" }),
  module_id: integer("module_id")
    .notNull()
    .references(() => Modules.id, { onDelete: "cascade" }),
  lesson_id: integer("lesson_id")
    .notNull()
    .references(() => Lessons.id, { onDelete: "cascade" }),
  completed: boolean("completed").default(false),
  score: integer("score").notNull(),
  correct_answers: integer("correct_answers").notNull(),
  total_questions: integer("total_questions").notNull(),
  time_spent: integer("time_spent").notNull(),
  completed_at: timestamp("completed_at", { mode: "string" }),
});

// Relations
export const UserRelations = relations(Users, ({ many }) => ({
  profiles: many(Profiles),
  leaderboard: many(Leaderboard),
  progress: many(UserProgress),
}));

export const ModuleRelations = relations(Modules, ({ many }) => ({
  lessons: many(Lessons),
}));

export const LessonRelations = relations(Lessons, ({ many, one }) => ({
  questions: many(Questions),
  module: one(Modules, {
    fields: [Lessons.module_id],
    references: [Modules.id],
  }),
}));

export const QuestionRelations = relations(Questions, ({ one }) => ({
  lesson: one(Lessons, {
    fields: [Questions.lesson_id],
    references: [Lessons.id],
  }),
}));

export const LeaderboardRelations = relations(Leaderboard, ({ one }) => ({
  user: one(Users, {
    fields: [Leaderboard.user_id],
    references: [Users.id],
  }),
}));

export const UserProgressRelations = relations(UserProgress, ({ one }) => ({
  user: one(Users, {
    fields: [UserProgress.user_id],
    references: [Users.id],
  }),
  module: one(Modules, {
    fields: [UserProgress.module_id],
    references: [Modules.id],
  }),
  lesson: one(Lessons, {
    fields: [UserProgress.lesson_id],
    references: [Lessons.id],
  }),
}));


// export types by infering from the schema
export type User = typeof Users.$inferSelect;
export type Profile = typeof Profiles.$inferSelect;
export type Badge = typeof Badges.$inferSelect;
export type Module = typeof Modules.$inferSelect;
export type Lesson = typeof Lessons.$inferSelect;
export type Question = typeof Questions.$inferSelect;
export type Leaderboard = typeof Leaderboard.$inferSelect;
export type UserProgress = typeof UserProgress.$inferSelect;
