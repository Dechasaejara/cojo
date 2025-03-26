import React, { useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { formatTime, getTimeColor } from '@/utils/quizUtils';
import { useQuizStore } from '@/store/quizStore';

interface QuizTimerProps {
  totalTime: number;
}

export const QuizTimer: React.FC<QuizTimerProps> = ({ totalTime }) => {
  const { timeRemaining, isTimerActive, decrementTimer } = useQuizStore();

  useEffect(() => {
    if (!isTimerActive) return;

    const timer = setInterval(() => {
      decrementTimer();
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive, decrementTimer]);

  const progressPercentage =
    timeRemaining !== null ? (timeRemaining / totalTime) * 100 : 0;

  const timeColor = getTimeColor(timeRemaining, totalTime);

  return (
    <div className="w-full flex flex-col gap-1 mb-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">Time Remaining</span>
        <span className="text-sm font-bold">
          {formatTime(timeRemaining)}
        </span>
      </div>
      <Progress
        value={progressPercentage}
        className="h-2"
        indicatorClassName={timeColor}
      />
    </div>
  );
};

export default QuizTimer;
