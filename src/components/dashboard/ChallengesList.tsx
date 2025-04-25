'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Challenge {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  points: number;
}

interface ChallengesListProps {
  challenges: Challenge[];
}

const ChallengesList: React.FC<ChallengesListProps> = ({ challenges }) => {
  if (challenges.length === 0) {
    return <p>No challenges available at the moment.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {challenges.map((challenge) => (
        <div key={challenge.id} className="p-4 border rounded shadow">
          <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
          <p className="mb-4">{challenge.description}</p>
          <p className="mb-2">
            Difficulty: <strong>{challenge.difficulty}</strong>
          </p>
          <p className="mb-4">
            Points: <strong>{challenge.points}</strong>
          </p>
          <Link href={`/challenges/${challenge.id}`}>
            <Button>Start Challenge</Button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ChallengesList;
