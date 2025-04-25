import { Challenge, Question } from "@/db/schema";
import { getChallengeById, getQuestionsByChallengeId } from "@/db/queries";
import MultipleChoiceQuiz from "@/components/quiz/MultipleChoiceQuiz";




export default async function ChallengeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const challengeId = Number((await params).id);

  try {
    const challengeOrUndefined: Challenge | undefined = await getChallengeById(
      challengeId
    );
    const challenge: Challenge | null = challengeOrUndefined ?? null;

    if (!challenge) {
      return <div className="container mx-auto p-4">Challenge not found.</div>;
    }

    const questions: Question[] = await getQuestionsByChallengeId(challengeId);
  

    const handleComplete = () => {
      console.log("Quiz completed");
    };

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{challenge.title}</h1>
        <p className="mb-4">{challenge.description}</p>
        <p className="mb-2">
          Difficulty: <strong>{challenge.difficulty}</strong>
        </p>
        <p className="mb-4">
          Points: <strong>{challenge.points}</strong>
        </p>

        <div>
          {questions.length > 0 ? (
            <MultipleChoiceQuiz
              quiz={questions[0]}
              onComplete={handleComplete}
            />
          ) : (
            <p>No quizzes available for this challenge.</p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto p-4">Error loading challenge data.</div>
    );
  }
}
