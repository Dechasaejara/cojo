'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { leaderboardData } from '@/data/mockData';

export const LeaderboardCard: React.FC = () => {
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
              d="M4 19V9L1 12L4 9M20 19V9L23 12L20 9M12 1L15 7H9L12 1Z"
              stroke="#6366F1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="8"
              y="11"
              width="8"
              height="12"
              fill="#6366F1"
              fillOpacity="0.2"
              stroke="#6366F1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Leaderboard
        </CardTitle>
        <CardDescription>See how you stack up against others</CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="all-time">All Time</TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="space-y-4">
            <LeaderboardList data={leaderboardData} />
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4">
            <LeaderboardList data={leaderboardData} />
          </TabsContent>

          <TabsContent value="all-time" className="space-y-4">
            <LeaderboardList data={leaderboardData} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

interface LeaderboardListProps {
  data: { userId: string; username: string; userImage?: string; rank: number; points: number }[];
}

const LeaderboardList: React.FC<LeaderboardListProps> = ({ data }) => {
  // Highlight current user - in a real app, this would be the logged-in user
  const currentUserId = '4'; // For demonstration purposes

  return (
    <div className="overflow-hidden">
      {data.map((entry) => (
        <div
          key={entry.userId}
          className={`flex items-center justify-between py-2 ${
            entry.userId === currentUserId
              ? 'bg-indigo-50 -mx-4 px-4 rounded-md'
              : 'border-b border-gray-100'
          }`}
        >
          <div className="flex items-center">
            <div className="w-7 flex justify-center">
              <div className={`w-5 h-5 flex items-center justify-center rounded-full ${
                entry.rank <= 3
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-700'
              } text-xs font-bold`}>
                {entry.rank}
              </div>
            </div>

            <Avatar className="h-8 w-8 ml-2">
              <AvatarImage src={entry.userImage} alt={entry.username} />
              <AvatarFallback>
                {entry.username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <span className={`ml-2 text-sm ${
              entry.userId === currentUserId ? 'font-medium' : ''
            }`}>
              {entry.username}
              {entry.userId === currentUserId && (
                <span className="text-xs text-gray-500 ml-1">(You)</span>
              )}
            </span>
          </div>

          <div className="font-mono text-sm font-medium">
            {entry.points}
            <span className="text-xs text-gray-500 ml-1">pts</span>
          </div>
        </div>
      ))}

      <div className="text-center mt-3">
        <span className="text-xs text-blue-600 hover:underline cursor-pointer">
          View full leaderboard
        </span>
      </div>
    </div>
  );
};

export default LeaderboardCard;
