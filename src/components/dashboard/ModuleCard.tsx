'use client';

import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Module } from '@/types';
import { useUserStore } from '@/store/userStore';
import Link from 'next/link';

interface ModuleCardProps {
  module: Module;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  const { completedLessons, totalPoints, setCurrentModule } = useUserStore();

  // Calculate progress percentage
  const totalLessons = module.lessons.length;
  const completedLessonsCount = module.lessons
    .filter(lesson => completedLessons.includes(lesson.id))
    .length;

  const progressPercentage = totalLessons > 0
    ? Math.round((completedLessonsCount / totalLessons) * 100)
    : 0;

  // Check if the module is locked (based on required points)
  const isLocked = totalPoints < module.requiredPoints;

  // Set the current module in the store when clicked
  const handleModuleClick = () => {
    if (!isLocked) {
      setCurrentModule(module.id);
    }
  };

  return (
    <Card
      className={`h-full flex flex-col transition-all ${isLocked
          ? 'opacity-70 bg-gray-50'
          : 'hover:shadow-md hover:border-green-200'
        }`}
    >
      <CardContent className="p-6 flex-grow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-green-100 text-green-700">
            {/* This would be an actual SVG/image in production */}
            <div className="text-xl font-bold">
              {module.title.charAt(0)}
            </div>
          </div>

          {isLocked && (
            <div className="flex flex-shrink-0 items-center text-gray-500">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1"
              >
                <rect
                  x="3"
                  y="11"
                  width="18"
                  height="11"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-xs">
                {module.requiredPoints} points required
              </span>
            </div>
          )}
        </div>

        <h3 className="text-lg font-semibold mb-1">{module.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{module.description}</p>

        <div className="mt-auto space-y-2">
          <div className="flex justify-between text-xs">
            <span>{completedLessonsCount} of {totalLessons} lessons</span>
            <span>{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-1.5" />
        </div>
      </CardContent>

      <CardFooter className="pt-0 pb-6 px-6">
        {isLocked ? (
          <Button variant="outline" className="w-full" disabled>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <rect
                x="3"
                y="11"
                width="18"
                height="11"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Locked
          </Button>
        ) : progressPercentage === 100 ? (
          <Link href={`/modules/${module.slug}`} className="w-full" onClick={handleModuleClick}>
            <Button variant="outline" >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Review
            </Button>
          </Link>
        ) : progressPercentage > 0 ? (
          <Link href={`/modules/${module.slug}`} className="w-full" onClick={handleModuleClick}>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Continue
            </Button>
          </Link>
        ) : (
          <Link href={`/modules/${module.slug}`} className="w-full" onClick={handleModuleClick}>
            <Button className="w-full">Start Learning</Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default ModuleCard;
