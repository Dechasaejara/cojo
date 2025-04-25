import React from 'react';
import { Metadata } from 'next';
import ModuleCard from '@/components/dashboard/ModuleCard';
import { getAllModules } from '@/db/queries';


export const metadata: Metadata = {
  title: 'Modules | CodeDojo',
  description: 'Browse all coding modules',
};

export default async function ModulesPage() {
  const modules= await getAllModules();
  const filteredModules = modules.filter((module) => module.lessons && module.lessons.length > 0);

  // Group modules by  level
  const modulesByLevel = filteredModules.reduce((acc: Record<number, typeof filteredModules>, module) => {
    const level = module.level;
    if (!acc[level]) {
      acc[level] = [];
    }
    acc[level].push(module);
    return acc;
  }, {});

  // Get sorted level numbers
  const levels = Object.keys(modulesByLevel)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="container px-4 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Coding Modules</h1>
        <p className="text-gray-600">
          Learn to code with interactive modules and quizzes. Complete modules to earn points and badges.
        </p>
      </div>

      {levels.map((level) => (
        <div key={level} className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-800 font-bold">
              {level}
            </div>
            <h2 className="text-2xl font-bold">Level {level} Modules</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {modulesByLevel[level].map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
