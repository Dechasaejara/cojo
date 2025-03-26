'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Quiz } from '@/types';
import { useQuizStore } from '@/store/quizStore';
import { checkAnswer } from '@/utils/quizUtils';
import QuizTimer from './QuizTimer';

interface MultipleChoiceQuizProps {
  quiz: Quiz;
  onComplete: () => void;
}

export const MultipleChoiceQuiz: React.FC<MultipleChoiceQuizProps> = ({ quiz, onComplete }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { submitAnswer } = useQuizStore();

  // Reset state when a new quiz is loaded
  useEffect(() => {
    setSelectedOption(null);
    setHasSubmitted(false);
  }, [quiz]);

  const handleOptionSelect = (option: string) => {
    if (hasSubmitted) return;
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption || hasSubmitted) return;

    setHasSubmitted(true); // Prevent multiple submissions immediately
    const isCorrect = checkAnswer(quiz, selectedOption);
    submitAnswer(selectedOption, isCorrect);

    // Wait a moment to show the result before proceeding
    setTimeout(() => {
      onComplete();
    }, 3000); // Increased delay to 3000ms for better user experience
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">{quiz.question}</CardTitle>
        <CardDescription>Select the best answer</CardDescription>
      </CardHeader>

      <CardContent>
        <QuizTimer totalTime={quiz.timeLimit || 30} />

        <div className="space-y-2">
          {quiz.options?.map((option) => (
            <Button
              key={option}
              variant={selectedOption === option ? 'default' : 'outline'}
              className={`w-full justify-start text-left h-auto p-4 ${
                hasSubmitted && selectedOption === option
                  ? (option === quiz.correctAnswer ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500')
                  : ''
              } ${
                hasSubmitted && option === quiz.correctAnswer
                  ? 'bg-green-100 border-green-500'
                  : ''
              }`}
              onClick={() => handleOptionSelect(option)}
              disabled={hasSubmitted}
            >
              {option}
            </Button>
          ))}
        </div>

        {hasSubmitted && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h4 className="font-semibold mb-2">Explanation:</h4>
            <p>{quiz.explanation}</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button
          onClick={handleSubmit}
          disabled={!selectedOption || hasSubmitted}
        >
          {hasSubmitted ? 'Submitted' : 'Submit Answer'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MultipleChoiceQuiz;
