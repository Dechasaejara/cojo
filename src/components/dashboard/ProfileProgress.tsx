'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useUserStore } from '@/store/userStore';

export const ProfileProgress: React.FC = () => {
  const { totalPoints, getCompletedLessonsCount, getLevelProgress } = useUserStore();

  const levelProgress = getLevelProgress();

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
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#10B981"
              strokeWidth="2"
            />
            <path
              d="M12 6V12L16 14"
              stroke="#10B981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Your Progress
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-emerald-50 rounded-lg">
            <div className="font-mono text-2xl font-bold text-emerald-600">
              {totalPoints}
            </div>
            <div className="text-xs text-gray-600 mt-1">Total Points</div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-lg">
            <div className="font-mono text-2xl font-bold text-emerald-600">
              {getCompletedLessonsCount()}
            </div>
            <div className="text-xs text-gray-600 mt-1">Lessons Completed</div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm">
                  {levelProgress.current}
                </div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-1"
                >
                  <path
                    d="M5 12H19"
                    stroke="#94A3B8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 5L19 12L12 19"
                    stroke="#94A3B8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-500 font-bold text-sm">
                  {levelProgress.next}
                </div>
              </div>
              <div className="text-sm font-medium">
                {levelProgress.percentage}%
              </div>
            </div>

            <Progress value={levelProgress.percentage} className="h-2" />

            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <div>Level {levelProgress.current}</div>
              <div>Level {levelProgress.next}</div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-100">
            <h4 className="text-sm font-medium mb-2">Level {levelProgress.next} perks:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li className="flex items-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1 text-emerald-500"
                >
                  <path
                    d="M5 12L10 17L20 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Unlock advanced JavaScript challenges</span>
              </li>
              <li className="flex items-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1 text-emerald-500"
                >
                  <path
                    d="M5 12L10 17L20 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>New badge: "Learning Machine"</span>
              </li>
              <li className="flex items-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1 text-emerald-500"
                >
                  <path
                    d="M5 12L10 17L20 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Bonus points for each completed quiz</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileProgress;
