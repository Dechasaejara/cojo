import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ProfileProgress from '@/components/dashboard/ProfileProgress';
import StreakCard from '@/components/dashboard/StreakCard';
import BadgesList from '@/components/dashboard/BadgesList';
import LeaderboardCard from '@/components/dashboard/LeaderboardCard';
import ModuleCard from '@/components/dashboard/ModuleCard';
import { getAllModules } from '@/db/queries';

export const metadata: Metadata = {
  title: 'Dashboard | CodeDojo',
  description: 'Your coding learning dashboard',
};

function transformModule(module: any) {
  return {
    ...module,
    requiredPoints: module.required_points,
    imageUrl: module.image_url,
  };
}

export default async function DashboardPage() {
  // Fetch real data from the database
  const modules = await getAllModules();

  // For demo, we'll just show the first 3 modules with lessons
  const featuredModules = modules.filter((module) => module.lessons.length > 0).slice(0, 3);

  return (
    <div className="container px-4 mx-auto">
      {/* Welcome section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back!</h1>
        <p className="text-gray-600">
          Continue your coding journey with interactive lessons and challenges.
        </p>
      </div>

      {/* Stats and gamification elements */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <ProfileProgress />
        </div>
        <div>
          <StreakCard />
        </div>
        <div>
          <BadgesList />
        </div>
      </div>

      {/* Continue learning section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Continue Learning</h2>
          <Link href="/modules">
            <Button variant="ghost">View All Modules</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </div>

      {/* Leaderboard section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Leaderboard</h2>
          <Link href="/leaderboard">
            <Button variant="ghost">View Full Leaderboard</Button>
          </Link>
        </div>

        <div className="max-w-xl">
          <LeaderboardCard />
        </div>
      </div>

      {/* Daily challenge */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Daily Challenge</h2>
        </div>

        <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white max-w-4xl">
          <h3 className="text-xl font-semibold mb-2">Fix the Infinite Loop</h3>
          <p className="mb-4">
            Today's challenge: identify and fix the bug in the while loop that's causing
            it to run infinitely. Can you solve it?
          </p>
          <div className="flex">
            <Link href="/challenges/daily">
              <Button variant="outline" className="text-white border-white hover:bg-white/20 hover:text-white">
                Start Challenge
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
