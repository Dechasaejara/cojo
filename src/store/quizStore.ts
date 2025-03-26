import { create } from 'zustand';
import { Quiz, UserQuizAnswer } from '@/types';
import { useUserStore } from './userStore';

interface QuizState {
  currentQuiz: Quiz | null;
  quizIndex: number;
  quizzes: Quiz[];
  userAnswers: UserQuizAnswer[];
  isQuizComplete: boolean;
  startTime: Date | null;
  timeRemaining: number | null;
  isTimerActive: boolean;

  // Actions
  startQuiz: (quizzes: Quiz[]) => void;
  goToNextQuiz: () => void;
  goToPreviousQuiz: () => void;
  submitAnswer: (answer: string | string[], isCorrect: boolean) => void;
  completeQuiz: () => void;
  resetQuiz: () => void;
  startTimer: () => void;
  pauseTimer: () => void;
  decrementTimer: () => void;

  // Getters
  getCurrentQuizIndex: () => number;
  getTotalQuizzes: () => number;
  getCorrectAnswersCount: () => number;
  getQuizScore: () => number;
  hasAnsweredCurrentQuiz: () => boolean;
  getUserAnswerForCurrentQuiz: () => UserQuizAnswer | undefined;
}

export const useQuizStore = create<QuizState>()((set, get) => ({
  currentQuiz: null,
  quizIndex: 0,
  quizzes: [],
  userAnswers: [],
  isQuizComplete: false,
  startTime: null,
  timeRemaining: null,
  isTimerActive: false,

  // Actions
  startQuiz: (quizzes) => {
    const firstQuiz = quizzes.length > 0 ? quizzes[0] : null;
    const timeLimit = firstQuiz?.timeLimit || 60;

    set({
      quizzes,
      currentQuiz: firstQuiz,
      quizIndex: 0,
      userAnswers: [],
      isQuizComplete: false,
      startTime: new Date(),
      timeRemaining: timeLimit,
      isTimerActive: true,
    });
  },

  goToNextQuiz: () => {
    const { quizIndex, quizzes } = get();
    const nextIndex = quizIndex + 1;

    if (nextIndex < quizzes.length) {
      const nextQuiz = quizzes[nextIndex];
      const timeLimit = nextQuiz?.timeLimit || 60;

      set({
        currentQuiz: nextQuiz,
        quizIndex: nextIndex,
        timeRemaining: timeLimit,
        isTimerActive: true,
      });
    } else {
      // If we've gone through all quizzes, mark as complete
      get().completeQuiz();
    }
  },

  goToPreviousQuiz: () => {
    const { quizIndex, quizzes } = get();
    const prevIndex = quizIndex - 1;

    if (prevIndex >= 0) {
      const prevQuiz = quizzes[prevIndex];

      set({
        currentQuiz: prevQuiz,
        quizIndex: prevIndex,
        isTimerActive: false,
      });
    }
  },

  submitAnswer: (answer, isCorrect) => {
    const { currentQuiz, timeRemaining, startTime } = get();

    if (!currentQuiz) return;

    const now = new Date();
    const timeTaken = startTime
      ? Math.floor((now.getTime() - startTime.getTime()) / 1000)
      : 0;

    const userAnswer: UserQuizAnswer = {
      userId: useUserStore.getState().user?.id || 'anonymous',
      quizId: currentQuiz.id,
      userAnswer: answer,
      isCorrect,
      timeTaken,
      submittedAt: now,
    };

    set((state) => ({
      userAnswers: [...state.userAnswers, userAnswer],
      isTimerActive: false,
    }));

    // Award points based on correctness and time
    if (isCorrect) {
      const timeBonus = Math.max(0, Math.floor(timeRemaining || 0) / 10);
      const pointsEarned = currentQuiz.points + timeBonus;
      useUserStore.getState().addPoints(pointsEarned);
    }
  },

  completeQuiz: () => {
    const { quizzes, userAnswers } = get();
    const correctAnswers = userAnswers.filter((a) => a.isCorrect).length;
    const totalQuestions = quizzes.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    // Update lesson progress in user store
    if (quizzes.length > 0) {
      const lessonId = quizzes[0].lessonId;

      useUserStore.getState().completeLessonProgress({
        userId: useUserStore.getState().user?.id || 'anonymous',
        moduleId: '', // This would come from the lesson data in a real app
        lessonId,
        completed: score >= 70, // Require 70% to pass
        score,
        correctAnswers,
        totalQuestions,
        timeSpent: userAnswers.reduce((total, answer) => total + answer.timeTaken, 0),
        completedAt: new Date(),
      });
    }

    set({
      isQuizComplete: true,
      isTimerActive: false,
    });
  },

  resetQuiz: () => {
    set({
      currentQuiz: null,
      quizIndex: 0,
      quizzes: [],
      userAnswers: [],
      isQuizComplete: false,
      startTime: null,
      timeRemaining: null,
      isTimerActive: false,
    });
  },

  startTimer: () => {
    set({
      isTimerActive: true,
      startTime: new Date(),
    });
  },

  pauseTimer: () => {
    set({
      isTimerActive: false,
    });
  },

  decrementTimer: () => {
    const { timeRemaining, isTimerActive } = get();

    if (isTimerActive && timeRemaining !== null && timeRemaining > 0) {
      set({
        timeRemaining: timeRemaining - 1,
      });
    } else if (isTimerActive && timeRemaining === 0) {
      // Time's up, auto-submit an incorrect answer
      const { currentQuiz } = get();
      if (currentQuiz && !get().hasAnsweredCurrentQuiz()) {
        get().submitAnswer(
          typeof currentQuiz.correctAnswer === 'string' ? '' : [],
          false
        );
        get().goToNextQuiz();
      }
    }
  },

  // Getters
  getCurrentQuizIndex: () => get().quizIndex,

  getTotalQuizzes: () => get().quizzes.length,

  getCorrectAnswersCount: () => {
    return get().userAnswers.filter((answer) => answer.isCorrect).length;
  },

  getQuizScore: () => {
    const { userAnswers, quizzes } = get();
    if (quizzes.length === 0) return 0;

    const correctCount = userAnswers.filter((a) => a.isCorrect).length;
    return Math.round((correctCount / quizzes.length) * 100);
  },

  hasAnsweredCurrentQuiz: () => {
    const { userAnswers, currentQuiz } = get();
    return currentQuiz
      ? userAnswers.some((a) => a.quizId === currentQuiz.id)
      : false;
  },

  getUserAnswerForCurrentQuiz: () => {
    const { userAnswers, currentQuiz } = get();
    return currentQuiz
      ? userAnswers.find((a) => a.quizId === currentQuiz.id)
      : undefined;
  },
}));
