'use client';

import React, { useEffect, useState } from 'react';
import MultipleChoiceQuiz from '@/components/quiz/MultipleChoiceQuiz';
import { getQuestionsByChallengeId } from '@/db/queries';
import { Quiz } from '@/types';

interface ChallengeQuizProps {
  challengeId: number;
}

const ChallengeQuiz: React.FC<ChallengeQuizProps> = ({ challengeId }) => {
  const [questions, setQuestions] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      const questionsData = await getQuestionsByChallengeId(challengeId);
      setQuestions(questionsData as Quiz[]);
      setLoading(false);
    }
    fetchQuestions();
  }, [challengeId]);

  if (loading) {
    return <div>Loading quiz...</div>;
  }

  if (questions.length === 0) {
    return <div>No quiz questions available for this challenge.</div>;
  }

  return (
    <MultipleChoiceQuiz quiz={questions} onComplete={() => alert('Challenge completed!')} />
  );
};

export default ChallengeQuiz;
