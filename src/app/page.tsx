import Link from "next/link";
import { quizzes } from "@/quizzes";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center px-4 py-16">
      <h1 className="text-center text-4xl font-bold">Who are you?</h1>
      <p className="mt-3 max-w-xl text-center text-zinc-500">
        Answer a series of statements on a slider and we&apos;ll rank every
        character by how close they are to you.
      </p>
      <div className="mt-12 grid w-full max-w-3xl gap-6 sm:grid-cols-2">
        {quizzes.map((q) => (
          <Link
            key={q.id}
            href={`/quiz/${q.id}`}
            className="rounded-2xl border border-zinc-200 p-6 transition hover:border-indigo-500 hover:shadow-lg dark:border-zinc-800"
          >
            <h2 className="text-xl font-semibold">{q.title}</h2>
            <p className="mt-2 text-sm text-zinc-500">{q.description}</p>
            <p className="mt-4 text-xs text-zinc-400">
              {q.questions.length} questions · {q.characters.length} characters
            </p>
          </Link>
        ))}
      </div>
      <p className="mt-16 max-w-xl text-center text-xs text-zinc-400">
        Fan-made and unofficial. League of Legends and its characters are
        property of Riot Games.
      </p>
    </main>
  );
}
