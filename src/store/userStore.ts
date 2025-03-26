import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Badge, Module, User, UserProgress, Streak } from '@/types';
import { badges, modules } from '@/data/mockData';

interface UserState {
  user: User | null;
  currentLesson: string | null;
  currentModule: string | null;
  dailyGoal: number;
  streak: Streak | null;
  completedLessons: string[];
  earnedBadges: Badge[];
  lessonProgress: UserProgress[];
  totalPoints: number;

  // Actions
  setUser: (user: User | null) => void;
  setCurrentLesson: (lessonId: string | null) => void;
  setCurrentModule: (moduleId: string | null) => void;
  addPoints: (points: number) => void;
  updateStreak: () => void;
  completeLessonProgress: (progress: UserProgress) => void;
  addBadge: (badge: Badge) => void;
  resetProgress: () => void;

  // Computed getters
  getCurrentModuleData: () => Module | null;
  getCompletedLessonsCount: () => number;
  getProgressPercentage: () => number;
  getLevelProgress: () => { current: number; next: number; percentage: number };
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      currentLesson: null,
      currentModule: 'module-1', // Start with first module by default
      dailyGoal: 50,
      streak: null,
      completedLessons: [],
      earnedBadges: [],
      lessonProgress: [],
      totalPoints: 0,

      // Actions
      setUser: (user) => set({ user }),

      setCurrentLesson: (lessonId) => set({ currentLesson: lessonId }),

      setCurrentModule: (moduleId) => set({ currentModule: moduleId }),

      addPoints: (points) => {
        const { totalPoints, user } = get();
        const newTotal = totalPoints + points;

        // Check if badges should be awarded
        const badgesToCheck = badges.filter(
          (badge) => !get().earnedBadges.some((earned) => earned.id === badge.id)
        );

        badgesToCheck.forEach((badge) => {
          // Very simple badge criteria check, would be more complex in real app
          if (
            (badge.name === 'First Code' && newTotal >= 10) ||
            (badge.name === 'Syntax Pro' && newTotal >= 100)
          ) {
            get().addBadge({ ...badge, earnedAt: new Date() });
          }
        });

        set({
          totalPoints: newTotal,
          user: user ? { ...user, points: (user.points || 0) + points } : null,
        });
      },

      updateStreak: () => {
        const { streak } = get();
        const today = new Date();

        if (!streak) {
          set({
            streak: {
              userId: get().user?.id || 'anonymous',
              currentStreak: 1,
              longestStreak: 1,
              lastActivityDate: today,
            },
          });
          return;
        }

        const lastActivity = new Date(streak.lastActivityDate);
        const dayDifference = Math.floor(
          (today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (dayDifference === 1) {
          // Perfect streak continuation
          const newCurrentStreak = streak.currentStreak + 1;
          set({
            streak: {
              ...streak,
              currentStreak: newCurrentStreak,
              longestStreak: Math.max(newCurrentStreak, streak.longestStreak),
              lastActivityDate: today,
            },
          });
        } else if (dayDifference > 1) {
          // Streak broken
          set({
            streak: {
              ...streak,
              currentStreak: 1,
              lastActivityDate: today,
            },
          });
        } else {
          // Same day, no streak change, just update the timestamp
          set({
            streak: {
              ...streak,
              lastActivityDate: today,
            },
          });
        }
      },

      completeLessonProgress: (progress) => {
        const { lessonProgress, completedLessons } = get();
        const existingProgressIndex = lessonProgress.findIndex(
          (p) => p.lessonId === progress.lessonId && p.userId === progress.userId
        );

        const updatedProgress = [...lessonProgress];

        if (existingProgressIndex >= 0) {
          // Update existing progress
          updatedProgress[existingProgressIndex] = progress;
        } else {
          // Add new progress
          updatedProgress.push(progress);
        }

        // Update completed lessons if not already in the list
        const updatedCompletedLessons = [...completedLessons];
        if (progress.completed && !completedLessons.includes(progress.lessonId)) {
          updatedCompletedLessons.push(progress.lessonId);
        }

        set({
          lessonProgress: updatedProgress,
          completedLessons: updatedCompletedLessons,
        });

        // Update streak when completing a lesson
        get().updateStreak();
      },

      addBadge: (badge) => {
        const { earnedBadges } = get();
        if (!earnedBadges.some((b) => b.id === badge.id)) {
          set({ earnedBadges: [...earnedBadges, badge] });
        }
      },

      resetProgress: () => {
        set({
          currentLesson: null,
          completedLessons: [],
          earnedBadges: [],
          lessonProgress: [],
          totalPoints: 0,
          streak: null,
        });
      },

      // Computed getters
      getCurrentModuleData: () => {
        const { currentModule } = get();
        return currentModule
          ? modules.find((m) => m.id === currentModule) || null
          : null;
      },

      getCompletedLessonsCount: () => {
        return get().completedLessons.length;
      },

      getProgressPercentage: () => {
        const currentModule = get().getCurrentModuleData();
        if (!currentModule) return 0;

        const totalLessons = currentModule.lessons.length;
        if (totalLessons === 0) return 0;

        const completedLessonsInModule = get().completedLessons.filter((lessonId) =>
          currentModule.lessons.some((lesson) => lesson.id === lessonId)
        ).length;

        return Math.round((completedLessonsInModule / totalLessons) * 100);
      },

      getLevelProgress: () => {
        const { totalPoints } = get();
        const levels = [0, 100, 250, 500, 1000, 2000, 5000, 10000];

        let currentLevel = 1;
        let nextLevelPoints = levels[1];

        for (let i = 1; i < levels.length; i++) {
          if (totalPoints >= levels[i - 1] && totalPoints < levels[i]) {
            currentLevel = i;
            nextLevelPoints = levels[i];
            break;
          }

          if (i === levels.length - 1 && totalPoints >= levels[i]) {
            currentLevel = i + 1;
            nextLevelPoints = levels[i] * 2; // Extrapolate for max level
          }
        }

        const previousLevelPoints = levels[currentLevel - 1] || 0;
        const pointsInCurrentLevel = totalPoints - previousLevelPoints;
        const pointsRequiredForNextLevel = nextLevelPoints - previousLevelPoints;
        const percentage = Math.round((pointsInCurrentLevel / pointsRequiredForNextLevel) * 100);

        return {
          current: currentLevel,
          next: currentLevel + 1,
          percentage: Math.min(percentage, 100),
        };
      },
    }),
    {
      name: 'code-dojo-user-store',
    }
  )
);
