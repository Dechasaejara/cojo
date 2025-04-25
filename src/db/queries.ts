import { cache } from "react";
import { db } from "./drizzle";
import {
  Users,
  Profiles,
  Modules,
  Lessons,
  Questions,
  UserProgress,
  Badges,
  Leaderboard,
} from "./schema";
import { asc, desc, eq } from "drizzle-orm";

import { Challenges } from "./schema";

// Get the authenticated user's progress
export const getUserProgress = cache(async (userId: number) => {
  if (!userId) return null;

  return await db.query.UserProgress.findFirst({
    where: eq(UserProgress.userId, userId),
    with: {
      module: true,
      lesson: true,
    },
  });
});

// Get all challenges
export const getAllChallenges = cache(async () => {
  console.log("Fetching all challenges");
  return await db.query.Challenges.findMany({
    orderBy: [asc(Challenges.createdAt)],
  });
});

import { ChallengeQuestions } from "./schema";

// Get challenge by ID
export const getChallengeById = cache(async (id: number) => {
  return await db.query.Challenges.findFirst({
    where: eq(Challenges.id, id),
  });
});

import { sql } from "drizzle-orm";

// Get questions for a specific challenge
export const getQuestionsByChallengeId = cache(async (challengeId: number) => {
  const challengeQuestions = await db.query.ChallengeQuestions.findMany({
    where: eq(ChallengeQuestions.challengeId, challengeId),
  });

  const questionIds = challengeQuestions.map((cq) => cq.questionId);

  if (questionIds.length === 0) {
    return [];
  }

  return await db.query.Questions.findMany({
    where: sql`id = ANY(${questionIds})`,
  });
});

// Get the authenticated user's profile
export const getUserProfile = cache(async (userId: number) => {
  if (!userId) return null;

  return await db.query.Profiles.findFirst({
    where: eq(Profiles.userId, userId),
    with: {
      user: true,
    },
  });
});

// Get all user progress for leaderboard
export const getAllUserProgress = cache(async () => {
  return await db.query.UserProgress.findMany({
    where: eq(UserProgress.completed, true),
    orderBy: [desc(UserProgress.score)],
    with: {
      module: true,
      lesson: true,
    },
  });
});

// Get all modules
export const getAllModules = cache(async () => {
  return await db.query.Modules.findMany({
    orderBy: [asc(Modules.level)],
    with: {
      lessons: {
        orderBy: [asc(Lessons.difficulty), asc(Lessons.order)],
        with: {
          questions: {
            orderBy: [asc(Questions.lessonId), asc(Questions.id)],
          },
        },
      },
    },
  });
});

// Get a specific module by ID
export const getModuleById = cache(async (id: number) => {
  return await db.query.Modules.findFirst({
    where: eq(Modules.id, id),
    with: {
      lessons: {
        orderBy: [asc(Lessons.order)],
        with: {
          questions: true,
        },
      },
    },
  });
});

// Get all lessons for a specific module
export const getLessonsByModuleId = cache(async (moduleId: number) => {
  return await db.query.Lessons.findMany({
    where: eq(Lessons.moduleId, moduleId),
    orderBy: [asc(Lessons.order)],
    with: {
      questions: true,
    },
  });
});

// getModuleBySlug
export const getModuleBySlug = cache(async (slug: string) => {
  return await db.query.Modules.findFirst({
    where: eq(Modules.slug, slug),
    with: {
      lessons: {
        orderBy: [asc(Lessons.order)],
        with: {
          questions: true,
        },
      },
    },
  });
});

// getLessonBySlug
export const getLessonBySlug = cache(async (slug: string) => {
  return await db.query.Lessons.findFirst({
    where: eq(Lessons.slug, slug),
    with: {
      questions: {
        orderBy: [asc(Questions.id)],
      },
    },
  });
});

// getCompletedLessonIds
export const getCompletedLessonIds = cache(async (userId: number) => {
  if (!userId) return [];

  const progress = await db.query.UserProgress.findMany({
    where: eq(UserProgress.userId, userId),
    with: {
      lesson: true,
    },
  });

  return progress.map((p) => p.lesson.id);
});

// Get a specific lesson by ID
export const getLessonById = cache(async (id: number) => {
  return await db.query.Lessons.findFirst({
    where: eq(Lessons.id, id),
    with: {
      questions: {
        orderBy: [asc(Questions.id)],
      },
    },
  });
});

// Get questions for a specific lesson
export const getQuestionsByLessonId = cache(async (lessonId: number) => {
  return await db.query.Questions.findMany({
    where: eq(Questions.lessonId, lessonId),
    orderBy: [asc(Questions.id)],
  });
});

// Get user progress for a specific lesson
export const getUserProgressByLessonId = cache(
  async (userId: number, lessonId: number) => {
    if (!userId) return null;

    return await db.query.UserProgress.findFirst({
      where: eq(UserProgress.lessonId, lessonId),
    });
  }
);

// Get leaderboard data
export const getLeaderboard = cache(async () => {
  return await db.query.Leaderboard.findMany({
    orderBy: [desc(Leaderboard.points)],
    with: {
      user: true,
    },
  });
});

// Get badges for a specific user

// Get lesson completion percentage
export const getLessonCompletionPercentage = cache(async (lessonId: number) => {
  const lesson = await getLessonById(lessonId);
  if (!lesson) return 0;
  const completedQuestions = lesson.questions;
  return Math.round(
    (completedQuestions.length / lesson.questions.length) * 100
  );
});

// Get user progress for a specific module
export const getUserProgressByModuleId = cache(
  async (userId: number, moduleId: number) => {
    if (!userId) return null;

    return await db.query.UserProgress.findMany({
      where: eq(UserProgress.moduleId, moduleId),
      with: {
        lesson: true,
      },
    });
  }
);

// Get all profiles for leaderboard
export const getProfilesForLeaderboard = cache(async () => {
  return await db.query.Profiles.findMany({
    where: eq(Profiles.showOnLeaderboard, true),
    orderBy: [desc(Profiles.points)],
    with: {
      user: true,
    },
  });
});

// Get all information about a specific user
export const getUserDetails = cache(async (userId: number) => {
  if (!userId) return null;

  // Fetch user profile
  const profile = await db.query.Profiles.findFirst({
    where: eq(Profiles.userId, userId),
    with: {
      user: true,
    },
  });

  // Fetch user progress
  const progress = await db.query.UserProgress.findMany({
    where: eq(UserProgress.userId, userId),
    with: {
      module: true,
      lesson: true,
    },
  });

  // Fetch leaderboard data for the user
  const leaderboardEntry = await db.query.Leaderboard.findFirst({
    where: eq(Leaderboard.userId, userId),
  });

  return {
    profile,
    progress,
    leaderboardEntry,
  };
});
