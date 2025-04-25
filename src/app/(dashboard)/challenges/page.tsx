import React from 'react';
import Link from 'next/link';
import { Challenge } from '@/db/schema';
import { Button } from '@/components/ui/button';
import { getAllChallenges } from '@/db/queries';

export default async function ChallengesPage() {
  let challenges: Challenge[] = [];
  let error: Error | null = null;

  try {
    challenges = await getAllChallenges();
  } catch (err) {
    error = err instanceof Error ? err : new Error('Unknown error');
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Challenges</h1>
        <p className="text-red-600">Failed to load challenges: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Challenges</h1>
      {challenges.length === 0 ? (
        <p>No challenges available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="p-4 border rounded shadow">
              <h2 className="text-xl font-semibold mb-2">{challenge.title}</h2>
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
      )}
    </div>
  );
}
