'use client';

import React, { useEffect, useState } from 'react';
import { getUserDetails } from '../../db/queries';
import { Button } from '../../components/ui/button';

type Nullable<T> = T | null;

type Profile = {
  badge: Nullable<string>;
  id: number;
  createdAt: Nullable<string>;
  updatedAt: Nullable<string>;
  userId: number;
  firstName: string;
  lastName: string;
  email?: Nullable<string>;
  phone?: Nullable<string>;
  schoolName?: Nullable<string>;
  gradeLevel?: Nullable<string>;
  heart: Nullable<number>;
  points: number;
};

type Progress = {
  id: number;
  module: { title: string };
  lesson: { title: string };
  score: number;
  completed: boolean;
};

type LeaderboardEntry = {
  rank: number;
  points: number;
};

type ProfileData = {
  profile?: Profile;
  progress: Progress[];
  leaderboardEntry?: LeaderboardEntry;
} | null;

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      const userId = 1; // Replace with authenticated user ID in real app
      const data = await getUserDetails(userId);
      setProfileData(data);
      setLoading(false);
    }
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="container mx-auto p-4">Loading profile...</div>;
  }

  if (!profileData || !profileData.profile) {
    return <div className="container mx-auto p-4">Profile not found.</div>;
  }

  const { profile, progress, leaderboardEntry } = profileData;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="mb-4">
        <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
        <p><strong>Email:</strong> {profile.email ?? 'N/A'}</p>
        <p><strong>Phone:</strong> {profile.phone ?? 'N/A'}</p>
        <p><strong>School:</strong> {profile.schoolName ?? 'N/A'}</p>
        <p><strong>Grade Level:</strong> {profile.gradeLevel ?? 'N/A'}</p>
        <p><strong>Badge:</strong> {profile.badge ?? 'N/A'}</p>
        <p><strong>Points:</strong> {profile.points}</p>
        <p><strong>Hearts:</strong> {profile.heart ?? 'N/A'}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Progress</h2>
        {progress && progress.length > 0 ? (
          <ul>
            {progress.map((p) => (
              <li key={p.id}>
                Module: {p.module.title}, Lesson: {p.lesson.title}, Score: {p.score}, Completed: {p.completed ? 'Yes' : 'No'}
              </li>
            ))}
          </ul>
        ) : (
          <p>No progress data available.</p>
        )}
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-2">Leaderboard</h2>
        {leaderboardEntry ? (
          <p>Rank: {leaderboardEntry.rank}, Points: {leaderboardEntry.points}</p>
        ) : (
          <p>No leaderboard data available.</p>
        )}
      </div>
      <Button className="mt-6" onClick={() => window.history.back()}>Back</Button>
    </div>
  );
}
