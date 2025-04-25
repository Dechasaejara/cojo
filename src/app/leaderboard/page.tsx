'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getLeaderboard } from '../../db/queries';
import { Leaderboard } from '../../db/schema';
import { Button } from '../../components/ui/button';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      const leaderboardData = await getLeaderboard();
      setLeaderboard(leaderboardData);
      setLoading(false);
    }
    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div className="container mx-auto p-4">Loading leaderboard...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      {leaderboard.length === 0 ? (
        <p>No leaderboard data available at the moment.</p>
      ) : (
        <div className="space-y-4">
          {leaderboard.map((entry) => (
            <div key={entry.id} className="p-4 border rounded shadow flex items-center justify-between">
              <div>
                <p className="font-semibold">{entry.username}</p>
                <p>Rank: {entry.rank}</p>
              </div>
              <div>
                <p>Points: {entry.points}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <Link href="/dashboard">
        <Button className="mt-6">Back to Dashboard</Button>
      </Link>
    </div>
  );
}
