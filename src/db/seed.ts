import { db } from "@/db/drizzle";
import {
  Users,
  Profiles,
  Modules,
  Lessons,
  Questions,
  UserProgress,
  Badges,
  Leaderboard,
} from "@/db/schema";
import users from "./data/users.json";
import profiles from "./data/profiles.json";
import modules from "./data/modules.json";
import lessons from "./data/lessons.json";
import questions from "./data/questions.json";
import badges from "./data/badges.json";
import leaderboard from "./data/leaderboard.json";
import userprogress from "./data/userProgress.json";

async function seedDatabase() {
  try {
    // delete
    await db.delete(Users);
    await db.delete(Profiles);
    await db.delete(Modules);
    await db.delete(Lessons);
    await db.delete(Questions);
    await db.delete(UserProgress);
    await db.delete(Badges);
    await db.delete(Leaderboard);
    // add
    await db.insert(Users).values(
      users.map((user) => ({
        ...user,
        role: user.role as
          | "admin"
          | "member"
          | "moderator"
          | "partner"
          | "contributor"
          | "user"
          | null
          | undefined,
      }))
    );
    await db.insert(Profiles).values(
      profiles.map((profile) => ({
        ...profile,
        badge: profile.badge as
          | "none"
          | "basic"
          | "bronze"
          | "silver"
          | "gold"
          | "platinum"
          | null
          | undefined,
      }))
    );
    await db.insert(Modules).values(modules);
    await db.insert(Lessons).values(
      lessons.map((lesson) => ({
        ...lesson,
        difficulty: lesson.difficulty as
          | "beginner"
          | "intermediate"
          | "advanced",
      }))
    );
    await db.insert(Questions).values(
      questions.map((question) => ({
        ...question,
        type: question.type as
          | "multiple-choice"
          | "fill-in-the-blank"
          | "code-completion"
          | "bug-fixing"
          | "true-false"
          | "match-pairs"
          | "drag-drop",
      }))
    );
    await db.insert(UserProgress).values(userprogress)
    await db.insert(Badges).values(badges);
    await db.insert(Leaderboard).values(leaderboard);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seedDatabase();
