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
  Challenges,
} from "./schema";
import { faker } from "@faker-js/faker";

function generateFakeUsers(count: number) {
  const fakeUsers = [];
  for (let i = 0; i < count; i++) {
    fakeUsers.push({
      code: faker.string.alphanumeric(10),
      username: faker.internet.displayName(),
      role: faker.helpers.arrayElement([
        "admin",
        "member",
        "moderator",
        "partner",
        "contributor",
        "user",
      ]),
      userImage: faker.image.avatar(),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    });
  }
  return fakeUsers;
}

function generateFakeProfiles(users: any[]) {
  return users.map((user) => ({
    userId: user.id,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    dob: faker.date.birthdate().toISOString(),
    schoolName: faker.company.name(),
    schoolType: faker.helpers.arrayElement([
      "public",
      "private",
      "charter",
      "homeschool",
    ]),
    gradeLevel: faker.helpers.arrayElement(["9", "10", "11", "12"]),
    classSection: faker.helpers.arrayElement(["A", "B", "C", "D"]),
    languageCode: faker.helpers.arrayElement(["en", "es", "fr", "de"]),
    badge: faker.helpers.arrayElement([
      "none",
      "basic",
      "bronze",
      "silver",
      "gold",
      "platinum",
    ]),
    points: faker.number.int({ min: 0, max: 1000 }),
    heart: faker.number.int({ min: 0, max: 10 }),
    showOnLeaderboard: faker.datatype.boolean(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  }));
}

function generateFakeBadges(count: number) {
  const fakeBadges = [];
  for (let i = 0; i < count; i++) {
    fakeBadges.push({
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
      imageUrl: faker.image.avatar(),
      criteria: faker.lorem.sentence(),
      earnedAt: faker.date.past().toISOString(),
    });
  }
  return fakeBadges;
}

function generateFakeModules(count: number) {
  const fakeModules = [];
  for (let i = 0; i < count; i++) {
    fakeModules.push({
      title: faker.lorem.words(2),
      description: faker.lorem.sentences(2),
      slug: faker.helpers.slugify(faker.lorem.words(2)),
      parent: null,
      level: faker.number.int({ min: 1, max: 10 }),
      order: i + 1,
      requiredPoints: faker.number.int({ min: 0, max: 100 }),
      imageUrl: faker.image.avatar(),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    });
  }
  return fakeModules;
}

function generateFakeLessons(modules: any[], lessonsPerModule: number) {
  const fakeLessons = [];
  for (const module of modules) {
    for (let i = 0; i < lessonsPerModule; i++) {
      fakeLessons.push({
        moduleId: module.id,
        title: faker.lorem.words(3),
        description: faker.lorem.sentences(2),
        slug: faker.helpers.slugify(faker.lorem.words(3)),
        order: i + 1,
        points: faker.number.int({ min: 0, max: 100 }),
        completionTime: faker.number.int({ min: 5, max: 60 }),
        difficulty: faker.helpers.arrayElement([
          "beginner",
          "intermediate",
          "advanced",
        ]),
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
      });
    }
  }
  return fakeLessons;
}

function generateFakeQuestions(lessons: any[], questionsPerLesson: number) {
  const fakeQuestions = [];
  for (const lesson of lessons) {
    for (let i = 0; i < questionsPerLesson; i++) {
      fakeQuestions.push({
        lessonId: lesson.id,
        type: faker.helpers.arrayElement([
          "multiple-choice",
          "fill-in-the-blank",
          "code-completion",
          "bug-fixing",
          "true-false",
          "match-pairs",
          "drag-drop",
        ]),
        question: faker.lorem.sentence(),
        options: [
          faker.lorem.word(),
          faker.lorem.word(),
          faker.lorem.word(),
          faker.lorem.word(),
        ],
        correctAnswer: faker.lorem.word(),
        explanation: faker.lorem.sentence(),
        codeSnippet: null,
        language: null,
        reference: null,
        points: faker.number.int({ min: 0, max: 100 }),
        timeLimit: faker.number.int({ min: 10, max: 300 }),
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
      });
    }
  }
  return fakeQuestions;
}

function generateFakeChallenges(count: number) {
  const fakeChallenges = [];
  for (let i = 0; i < count; i++) {
    fakeChallenges.push({
      title: faker.lorem.words(3),
      description: faker.lorem.sentences(2),
      difficulty: faker.helpers.arrayElement([
        "beginner",
        "intermediate",
        "advanced",
      ]),
      points: faker.number.int({ min: 10, max: 100 }),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    });
  }
  return fakeChallenges;
}

function generateFakeUserProgress(users: any[], lessons: any[]) {
  const fakeUserProgress = [];
  for (const user of users) {
    for (const lesson of lessons) {
      const completed = faker.datatype.boolean();
      fakeUserProgress.push({
        userId: user.id,
        lessonId: lesson.id,
        moduleId: lesson.moduleId,
        completed,
        score: faker.number.int({ min: 0, max: 100 }),
        correctAnswers: faker.number.int({ min: 0, max: 10 }),
        totalQuestions: faker.number.int({ min: 1, max: 10 }),
        timeSpent: faker.number.int({ min: 1, max: 3600 }),
        completedAt: completed ? faker.date.past().toISOString() : null,
      });
    }
  }
  return fakeUserProgress;
}

function generateFakeLeaderboard(users: any[]) {
  const usersWithPoints = users.map((user) => ({
    ...user,
    points: faker.number.int({ min: 0, max: 1000 }),
  }));
  const sortedUsers = usersWithPoints.sort((a, b) => b.points - a.points);
  const fakeLeaderboard = sortedUsers.map((user, index) => ({
    userId: user.id,
    username: user.username,
    userImage: user.userImage,
    rank: index + 1,
    points: user.points,
  }));
  return fakeLeaderboard;
}

async function seedDatabase() {
  try {
    // Delete existing data
    await db.delete(Users);
    await db.delete(Profiles);
    await db.delete(Modules);
    await db.delete(Lessons);
    await db.delete(Questions);
    await db.delete(Challenges);
    await db.delete(UserProgress);
    await db.delete(Badges);
    await db.delete(Leaderboard);

    // Generate and insert fake data
    const fakeUsers = generateFakeUsers(10);
    const insertedUsers = await db.insert(Users).values(fakeUsers).returning({ id: Users.id });
    const usersWithIds = fakeUsers.map((user, index) => ({ ...user, id: insertedUsers[index].id }));

    const fakeProfiles = generateFakeProfiles(usersWithIds);
    await db.insert(Profiles).values(fakeProfiles);

    const fakeModules = generateFakeModules(5);
    const insertedModules = await db.insert(Modules).values(fakeModules).returning({ id: Modules.id });
    const modulesWithIds = fakeModules.map((module, index) => ({ ...module, id: insertedModules[index].id }));

    const fakeLessons = generateFakeLessons(modulesWithIds, 3);
    const insertedLessons = await db.insert(Lessons).values(fakeLessons).returning({ id: Lessons.id });
    const lessonsWithIds = fakeLessons.map((lesson, index) => ({ ...lesson, id: insertedLessons[index].id }));

    const fakeQuestions = generateFakeQuestions(lessonsWithIds, 4);
    await db.insert(Questions).values(fakeQuestions);

    const fakeChallenges = generateFakeChallenges(10);
    await db.insert(Challenges).values(fakeChallenges);

    const fakeUserProgress = generateFakeUserProgress(usersWithIds, lessonsWithIds);
    await db.insert(UserProgress).values(fakeUserProgress);

    const fakeBadges = generateFakeBadges(10);
    await db.insert(Badges).values(fakeBadges);

    const fakeLeaderboard = generateFakeLeaderboard(usersWithIds);
    await db.insert(Leaderboard).values(fakeLeaderboard);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seedDatabase();