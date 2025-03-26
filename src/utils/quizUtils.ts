import { Quiz, QuizType } from '@/types';

/**
 * Checks if a user's answer is correct for a given quiz
 */
export const checkAnswer = (quiz: Quiz, userAnswer: string | string[]): boolean => {
  switch (quiz.type) {
    case 'multiple-choice':
    case 'true-false':
      return userAnswer === quiz.correctAnswer;

    case 'fill-in-the-blank':
      if (typeof userAnswer !== 'string' || typeof quiz.correctAnswer !== 'string') {
        return false;
      }
      // Case insensitive comparison for fill in the blank
      return userAnswer.toLowerCase().trim() === quiz.correctAnswer.toLowerCase().trim();

    case 'code-completion':
    case 'bug-fixing':
      // For code questions, we'll need to do a more sophisticated check
      // This is a simplified version that just does string comparison
      if (typeof userAnswer !== 'string' || typeof quiz.correctAnswer !== 'string') {
        return false;
      }

      // Remove whitespace and do a basic comparison
      const normalizedUserAnswer = userAnswer.replace(/\s+/g, '');
      const normalizedCorrectAnswer = quiz.correctAnswer.replace(/\s+/g, '');
      return normalizedUserAnswer === normalizedCorrectAnswer;

    case 'match-pairs':
    case 'drag-drop':
      // For these types, correctAnswer and userAnswer would be arrays
      if (!Array.isArray(userAnswer) || !Array.isArray(quiz.correctAnswer)) {
        return false;
      }

      if (userAnswer.length !== quiz.correctAnswer.length) {
        return false;
      }

      // Check if all items match (order matters)
      return userAnswer.every((item, index) => item === quiz.correctAnswer[index]);

    default:
      return false;
  }
};

/**
 * Formats time in seconds to a human-readable format
 */
export const formatTime = (seconds: number | null): string => {
  if (seconds === null) return '00:00';

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Get a color based on the remaining time percentage
 */
export const getTimeColor = (timeRemaining: number | null, totalTime: number): string => {
  if (timeRemaining === null) return 'bg-green-500';

  const percentage = (timeRemaining / totalTime) * 100;

  if (percentage > 70) return 'bg-green-500';
  if (percentage > 30) return 'bg-yellow-500';
  return 'bg-red-500';
};

/**
 * Calculates the points earned based on correctness and time
 */
export const calculatePoints = (quiz: Quiz, isCorrect: boolean, timeRemaining: number | null): number => {
  if (!isCorrect) return 0;

  const basePoints = quiz.points;
  const timeBonus = Math.max(0, Math.floor(timeRemaining || 0) / 10);

  return basePoints + timeBonus;
};

/**
 * Returns a friendly name for a quiz type
 */
export const getQuizTypeName = (type: QuizType): string => {
  switch (type) {
    case 'multiple-choice':
      return 'Multiple Choice';
    case 'code-completion':
      return 'Complete the Code';
    case 'bug-fixing':
      return 'Fix the Bug';
    case 'match-pairs':
      return 'Match Pairs';
    case 'drag-drop':
      return 'Drag and Drop';
    case 'true-false':
      return 'True or False';
    case 'fill-in-the-blank':
      return 'Fill in the Blank';
    default:
      return 'Quiz';
  }
};
