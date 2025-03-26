'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Quiz } from '@/types';
import { useQuizStore } from '@/store/quizStore';
import { getQuizTypeName } from '@/utils/quizUtils';
import MultipleChoiceQuiz from './MultipleChoiceQuiz';
import { Progress } from '@/components/ui/progress';

interface QuizContainerProps {
  lesson: {
    id: string;
    title: string;
    quizzes: Quiz[];
  };
  onComplete: () => void;
}

export const QuizContainer: React.FC<QuizContainerProps> = ({ lesson, onComplete }) => {
  const {
    startQuiz,
    resetQuiz,
    quizzes,
    currentQuiz,
    isQuizComplete,
    goToNextQuiz,
    getCurrentQuizIndex,
    getTotalQuizzes,
    getQuizScore
  } = useQuizStore();

  useEffect(() => {
    // Start the quiz with the lesson's quizzes
    startQuiz(lesson.quizzes.filter((q) => q.type == 'multiple-choice'));

    // Cleanup when component unmounts
    return () => {
      resetQuiz();
    };
  }, [lesson.quizzes, startQuiz, resetQuiz]);

  if (!currentQuiz && !isQuizComplete) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardContent className="p-8">
          <div className="text-center">
            <p className="text-gray-600">Loading quiz...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isQuizComplete) {
    const score = getQuizScore();
    const isPassing = score >= 70;

    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">Lesson Complete!</CardTitle>
          <CardDescription>
            Here's how you did on {lesson.title}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center py-6">
            <h3 className="text-4xl font-bold mb-2">
              {score}%
            </h3>
            <p className="text-lg font-medium">
              {isPassing ? 'Great job!' : 'Keep practicing!'}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Your score</span>
              <span>{isPassing ? 'Passed' : 'Failed'}</span>
            </div>
            <Progress
              value={score}
              className={`h-3 ${isPassing ? 'bg-green-500' : 'bg-red-500'}`}
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium mb-2">What's next:</h4>
            <ul className="space-y-1 list-disc list-inside">
              {isPassing ? (
                <>
                  <li>Move on to the next lesson</li>
                  <li>Start practicing with challenges</li>
                  <li>Review what you've learned</li>
                </>
              ) : (
                <>
                  <li>Review the lesson material</li>
                  <li>Try this quiz again</li>
                  <li>Check out our extra practice modules</li>
                </>
              )}
            </ul>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Button onClick={onComplete}>
            Back to Lessons
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const currentIndex = getCurrentQuizIndex();
  const totalQuizzes = getTotalQuizzes();
  const progress = ((currentIndex + 1) / totalQuizzes) * 100;

  return (
    <>
      {currentQuiz && (
        <div className="w-full">
          <div className="mb-6 max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-2 text-sm">
              <div>
                <span className="font-medium">
                  Question {currentIndex + 1} of {totalQuizzes}
                </span>
                <span className="ml-2 text-gray-500">
                  {getQuizTypeName(currentQuiz.type)}
                </span>
              </div>
              <div>
                <span className="text-gray-500">
                  Points: {currentQuiz.points}
                </span>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      )}

      {currentQuiz && (
        currentQuiz.type === 'multiple-choice' || currentQuiz.type === 'true-false' ? (
          <MultipleChoiceQuiz quiz={currentQuiz} onComplete={goToNextQuiz} />
        ) : (
          <Card className="w-full max-w-3xl mx-auto">
            <CardContent className="p-8">
              <div className="text-center">
                <p className="text-gray-600">
                  Quiz type '{currentQuiz.type}' is not yet implemented.
                </p>
                <Button className="mt-4" onClick={goToNextQuiz}>
                  Skip to Next Question
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      )}
    </>
  );
};

export default QuizContainer;
