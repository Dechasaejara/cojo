'use client'
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import QuizContainer from '@/components/quiz/QuizContainer';
import { modules } from '@/data/mockData';

interface LessonPageProps {
  params: {
    slug: string;
    lessonSlug: string;
  };
}

// export  function generateMetadata({ params }: LessonPageProps): Metadata {
//   const courseModule = modules.find((m) => m.slug === params.slug);
//   const lesson = courseModule?.lessons.find((l) => l.slug === params.lessonSlug);

//   if (!lesson) {
//     return {
//       title: 'Lesson Not Found | CodeDojo',
//     };
//   }

//   return {
//     title: `${lesson.title} | ${courseModule?.title} | CodeDojo`,
//     description: lesson.description,
//   };
// }

export default async function LessonPage({ params }: LessonPageProps) {
  const courseModule = await modules.find((m) => m.slug === params.slug);
  const lesson = await courseModule?.lessons.find((l) => l.slug === params.lessonSlug);

  if (!courseModule || !lesson) {
    notFound();
  }

  // Get previous and next lessons for navigation
  const lessonIndex = courseModule.lessons.findIndex((l) => l.id === lesson.id);
  const previousLesson = lessonIndex > 0 ? courseModule.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < courseModule.lessons.length - 1
    ? courseModule.lessons[lessonIndex + 1]
    : null;

  return (
    <div className="container px-4 mx-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href={`/modules/${courseModule.slug}`}
            className="text-sm text-blue-600 hover:underline mb-2 inline-block"
          >
            ← Back to {courseModule.title}
          </Link>

          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{lesson.title}</h1>

            <div className="flex gap-2">
              {previousLesson && (
                <Link href={`/modules/${courseModule.slug}/${previousLesson.slug}`}>
                  <Button variant="outline" size="sm">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1"
                    >
                      <path
                        d="M15 18L9 12L15 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Previous
                  </Button>
                </Link>
              )}

              {nextLesson && (
                <Link href={`/modules/${courseModule.slug}/${nextLesson.slug}`}>
                  <Button variant="outline" size="sm">
                    Next
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-1"
                    >
                      <path
                        d="M9 6L15 12L9 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Lesson content would normally go here - we're going straight to quizzes for this demo */}
        <div className="mb-8">
          <QuizContainer
            lesson={{
              id: lesson.id,
              title: lesson.title,
              quizzes: lesson.quizzes,
            }}
            onComplete={() => {
              // This would navigate to the next lesson or back to module in real app
              // For now, we'll just let the quiz component handle this
            }}
          />
        </div>
      </div>
    </div>
  );
}
