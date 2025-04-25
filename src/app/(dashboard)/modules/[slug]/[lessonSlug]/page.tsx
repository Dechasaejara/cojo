import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import QuizContainer from "@/components/quiz/QuizContainer";
import {
  getModuleBySlug,
  getLessonBySlug,
  getLessonsByModuleId,
  getQuestionsByLessonId,
} from "@/db/queries";

interface LessonPageProps {
  params: {
    slug: string;
    lessonSlug: string;
  };
}

/**
 * Generates dynamic metadata for the lesson page for SEO purposes.
 * @param {LessonPageProps} params - The page parameters containing module and lesson slugs.
 * @returns {Promise<Metadata>} - The metadata object with title and description.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lessonSlug: string }>;
}): Promise<Metadata> {
  const module = await getModuleBySlug((await params).slug);
  const lesson = await getLessonBySlug((await params).lessonSlug);

  if (!module || !lesson) {
    return {
      title: "Lesson Not Found | CodeDojo",
    };
  }

  return {
    title: `${lesson.title} | ${module.title} | CodeDojo`,
    description: lesson.description,
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lessonSlug: string }>;
}) {
  const { slug, lessonSlug } = await params;

  // Fetch module and lesson data
  const module = await getModuleBySlug(slug);
  const lesson = await getLessonBySlug(lessonSlug);

  // Handle case where module or lesson is not found
  if (!module || !lesson) {
    notFound();
  }

  // Fetch all lessons for navigation
  const lessons = await getLessonsByModuleId(module.id);
  const lessonIndex = lessons.findIndex((l) => l.id === lesson.id);
  const previousLesson = lessonIndex > 0 ? lessons[lessonIndex - 1] : null;
  const nextLesson =
    lessonIndex < lessons.length - 1 ? lessons[lessonIndex + 1] : null;

  // Fetch and map quiz questions
  const questions = await getQuestionsByLessonId(lesson.id);
  return (
    <div className="container px-4 mx-auto">
      <div className="max-w-4xl mx-auto">
        {/* Navigation back to module */}
        <div className="mb-6">
          <Link
            href={`/modules/${module.slug}`}
            className="text-sm text-blue-600 hover:underline mb-2 inline-block"
          >
            ← Back to {module.title}
          </Link>

          {/* Lesson title and navigation buttons */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{lesson.title}</h1>

            <div className="flex gap-2">
              {previousLesson && (
                <Link href={`/modules/${module.slug}/${previousLesson.slug}`}>
                  <Button variant="outline" size="sm">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
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
                <Link href={`/modules/${module.slug}/${nextLesson.slug}`}>
                  <Button variant="outline" size="sm">
                    Next
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
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

        {/* Quiz content */}
        <div className="mb-8">
          <QuizContainer
            lesson={{
              id: lesson.id,
              title: lesson.title,
              questions
            }}
            onComplete={() => {
              // Add logic here for quiz completion if needed
            }}
          />
        </div>
      </div>
    </div>
  );
}
