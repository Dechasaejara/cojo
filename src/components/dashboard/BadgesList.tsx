'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserStore } from '@/store/userStore';
import { Badge } from '@/types';
import { badges } from '@/data/mockData';

export const BadgesList: React.FC = () => {
  const { earnedBadges } = useUserStore();

  // Sort earned badges by most recently earned
  const sortedEarnedBadges = [...earnedBadges].sort((a, b) => {
    if (!a.earnedAt) return 1;
    if (!b.earnedAt) return -1;
    return new Date(b.earnedAt).getTime() - new Date(a.earnedAt).getTime();
  });

  // Filter out earned badges to get locked badges
  const lockedBadges = badges.filter(
    (badge) => !earnedBadges.some((earned) => earned.id === badge.id)
  );

  return (
    <Card className="h-full">
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
              d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z"
              fill="#FFD700"
              stroke="#E6B800"
              strokeWidth="2"
            />
            <path
              d="M12 15V23M12 23L7 20M12 23L17 20"
              stroke="#E6B800"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Your Badges
        </CardTitle>
      </CardHeader>

      <CardContent>
        {sortedEarnedBadges.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-500">
              Complete quizzes and challenges to earn badges!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Earned ({sortedEarnedBadges.length})
              </h3>

              <div className="grid grid-cols-3 gap-3">
                {sortedEarnedBadges.map((badge) => (
                  <BadgeItem key={badge.id} badge={badge} earned />
                ))}
              </div>
            </div>

            {lockedBadges.length > 0 && (
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Locked ({lockedBadges.length})
                </h3>

                <div className="grid grid-cols-3 gap-3">
                  {lockedBadges.slice(0, 3).map((badge) => (
                    <BadgeItem key={badge.id} badge={badge} earned={false} />
                  ))}
                </div>

                {lockedBadges.length > 3 && (
                  <div className="text-center mt-2">
                    <span className="text-xs text-blue-600 hover:underline cursor-pointer">
                      See all {lockedBadges.length} badges
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface BadgeItemProps {
  badge: Badge;
  earned: boolean;
}

const BadgeItem: React.FC<BadgeItemProps> = ({ badge, earned }) => {
  return (
    <div
      className="flex flex-col items-center p-2 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
      title={badge.description}
    >
      <div className={`relative ${!earned ? 'opacity-40 grayscale' : ''}`}>
        <div className="w-12 h-12 flex items-center justify-center bg-amber-100 rounded-full overflow-hidden">
          {/* This would be an actual image in production */}
          <div className="text-2xl">{badge.name.charAt(0)}</div>
        </div>

        {earned && badge.earnedAt && (
          <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12L10 17L20 7"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>

      <span className="text-xs font-medium mt-1 text-center truncate w-full">
        {badge.name}
      </span>
    </div>
  );
};

export default BadgesList;
