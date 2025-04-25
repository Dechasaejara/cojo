import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getCompletedLessonIds, getModuleBySlug } from "@/db/queries";

interface ModulePageProps {
  params: {
    slug: string;
  };
}
export async function generateMetadata(
  { params }: ModulePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { slug } = await params;
  const courseModule = await getModuleBySlug(slug);

  if (!courseModule) {
    return {
      title: "Module Not Found | CodeDojo",
    };
  }

  return {
    title: `${courseModule.title} | CodeDojo`,
    description: courseModule.description,
  };
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const courseModule = await getModuleBySlug(slug);

  if (!courseModule) {
    notFound();
  }

  // generate from user progress tracking system
  const completedLessonIds = await getCompletedLessonIds(1); // Replace with actual function to get completed lesson IDs

  // Replace with actual function to get completed lesson IDs

  return (
    <div className="container px-4 mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <Link
            href="/modules"
            className="text-sm text-blue-600 hover:underline mb-2 inline-block"
          >
            ← Back to Modules
          </Link>
          <h1 className="text-3xl font-bold">{courseModule.title}</h1>
          <p className="text-gray-600 mt-1">{courseModule.description}</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">
            Level {courseModule.level}
          </span>
          <Button variant="outline">Module Overview</Button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Module Lessons</h2>

        <div className="space-y-4 max-w-4xl">
          {courseModule.lessons.map((lesson, index) => {
            const isCompleted = completedLessonIds.includes(lesson.id);
            const isLocked =
              index > 0 &&
              !completedLessonIds.includes(courseModule.lessons[index - 1].id);

            return (
              <Card
                key={lesson.id}
                className={`transition-all ${
                  isLocked ? "opacity-70" : "hover:border-green-200"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isCompleted
                            ? "bg-green-500 text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {isCompleted ? (
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 12L10 17L20 7"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          index + 1
                        )}
                      </div>

                      <div>
                        <h3 className="font-semibold">{lesson.title}</h3>
                        <p className="text-sm text-gray-600">
                          {lesson.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center text-sm">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-1 text-gray-500"
                        >
                          <path
                            d="M12 6V12L16 14"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                        <span>{lesson.completionTime} min</span>
                      </div>

                      <div className="flex items-center text-sm">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-1 text-gray-500"
                        >
                          <path
                            d="M12 2L14.4 9.09L22 9.9L16.6 15.1L18.18 22.58L12 18.5L5.82 22.58L7.4 15.1L2 9.9L9.6 9.09L12 2Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{lesson.points} pts</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{lesson.questions.length} quizzes</span>
                      <span className="text-gray-500">{lesson.difficulty}</span>
                    </div>
                    <Progress value={isCompleted ? 100 : 0} className="h-1.5" />
                  </div>
                </CardContent>

                <CardFooter className="px-6 py-4 border-t">
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
                      Complete Previous Lessons
                    </Button>
                  ) : isCompleted ? (
                    <Link
                      href={`/modules/${courseModule.slug}/${lesson.slug}`}
                      className="w-full"
                    >
                      <Button variant="outline" className="w-full">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2 text-green-500"
                        >
                          <path
                            d="M5 12L10 17L20 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Review Lesson
                      </Button>
                    </Link>
                  ) : (
                    <Link
                      href={`/modules/${courseModule.slug}/${lesson.slug}`}
                      className="w-full"
                    >
                      <Button className="w-full">Start Lesson</Button>
                    </Link>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
