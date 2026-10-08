import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { QuizRunner } from "@/components/QuizRunner";
import { getQuiz, quizzes } from "@/quizzes";

export function generateStaticParams() {
  return quizzes.map((q) => ({ quizId: q.id }));
}

async function QuizContent({ params }: { params: Promise<{ quizId: string }> }) {
  const { quizId } = await params;
  const quiz = getQuiz(quizId);
  if (!quiz) notFound();

  return (
    <>
      <div className="mx-auto mb-8 w-full max-w-2xl">
        <h1 className="mt-2 text-2xl font-bold">{quiz.title}</h1>
      </div>
      <QuizRunner quiz={quiz} />
    </>
  );
}

export default function QuizPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  return (
    <main className="flex-1 px-4 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <Link href="/" className="text-sm text-indigo-500 hover:underline">
          ← All quizzes
        </Link>
      </div>
      <Suspense fallback={<p className="mt-8 text-center">Loading…</p>}>
        <QuizContent params={params} />
      </Suspense>
    </main>
  );
}
