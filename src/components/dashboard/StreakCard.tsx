'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserStore } from '@/store/userStore';

export const StreakCard: React.FC = () => {
  const { streak } = useUserStore();

  const currentStreak = streak?.currentStreak || 0;
  const longestStreak = streak?.longestStreak || 0;

  // Format date to show last activity
  const lastActivity = streak?.lastActivityDate
    ? new Date(streak.lastActivityDate).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      })
    : 'No activity yet';

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="mr-2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 1V4M12 20V23M4.2 4.2L6.3 6.3M17.7 17.7L19.8 19.8M1 12H4M20 12H23M4.2 19.8L6.3 17.7M17.7 6.3L19.8 4.2M12 6C8.7 6 6 8.7 6 12C6 15.3 8.7 18 12 18C15.3 18 18 15.3 18 12C18 8.7 15.3 6 12 6Z"
              stroke="#FF9500"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Streak Stats
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-amber-50 rounded-lg">
            <div className="font-mono text-2xl font-bold text-amber-600">
              {currentStreak}
            </div>
            <div className="text-xs text-gray-600 mt-1">Current Streak</div>
          </div>

          <div className="text-center p-3 bg-amber-50 rounded-lg">
            <div className="font-mono text-2xl font-bold text-amber-600">
              {longestStreak}
            </div>
            <div className="text-xs text-gray-600 mt-1">Longest Streak</div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Last active:</span>
            <span className="text-xs font-medium">{lastActivity}</span>
          </div>

          <div className="mt-2">
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500">Days in a row</div>
              <div className="text-xs font-medium">{currentStreak} days</div>
            </div>

            <div className="w-full h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full"
                style={{ width: `${Math.min((currentStreak / 7) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakCard;
