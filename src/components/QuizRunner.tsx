"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Slider } from "@/components/Slider";
import { computeQualityScores, rankCharacters } from "@/lib/quiz/scoring";
import type { Answers, Quiz } from "@/lib/quiz/types";

export function QuizRunner({ quiz }: { quiz: Quiz }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <Results
        quiz={quiz}
        answers={answers}
        onRetake={() => {
          setAnswers({});
          setIndex(0);
          setDone(false);
        }}
      />
    );
  }

  const question = quiz.questions[index];
  const value = answers[question.id] ?? 0;
  const isLast = index === quiz.questions.length - 1;

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-2 flex justify-between text-sm text-zinc-500">
        <span>
          Question {index + 1} of {quiz.questions.length}
        </span>
        <span>{Math.round((index / quiz.questions.length) * 100)}%</span>
      </div>
      <div className="mb-10 h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-full bg-indigo-500 transition-all"
          style={{ width: `${(index / quiz.questions.length) * 100}%` }}
        />
      </div>

      <h2 className="mb-10 min-h-24 text-center text-2xl font-medium">
        {question.text}
      </h2>

      <Slider
        key={question.id}
        label={question.text}
        value={value}
        onChange={(v) => setAnswers((a) => ({ ...a, [question.id]: v }))}
      />

      <div className="mt-12 flex justify-between">
        <button
          onClick={() => setIndex((i) => i - 1)}
          disabled={index === 0}
          className="rounded-lg border border-zinc-300 px-5 py-2 disabled:opacity-30 dark:border-zinc-700"
        >
          Back
        </button>
        <button
          onClick={() => {
            // An untouched slider is an explicit "Neutral" answer.
            setAnswers((a) => ({ ...a, [question.id]: a[question.id] ?? 0 }));
            if (isLast) setDone(true);
            else setIndex((i) => i + 1);
          }}
          className="rounded-lg bg-indigo-600 px-5 py-2 font-medium text-white hover:bg-indigo-500"
        >
          {isLast ? "See results" : "Next"}
        </button>
      </div>
    </div>
  );
}

function Results({
  quiz,
  answers,
  onRetake,
}: {
  quiz: Quiz;
  answers: Answers;
  onRetake: () => void;
}) {
  const ranking = useMemo(() => rankCharacters(quiz, answers), [quiz, answers]);
  const scores = useMemo(
    () => computeQualityScores(quiz, answers),
    [quiz, answers],
  );
  const [open, setOpen] = useState<string | null>(null);
  const best = ranking[0];

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-8 rounded-2xl bg-indigo-600 p-8 text-center text-white">
        <p className="text-sm uppercase tracking-wide opacity-80">
          Your best match
        </p>
        <h2 className="mt-1 text-4xl font-bold">{best.character.name}</h2>
        <p className="opacity-90">{best.character.title}</p>
        <p className="mt-3">{best.character.blurb}</p>
        <p className="mt-3 text-lg font-semibold">{best.matchPercent}% match</p>
      </div>

      <h3 className="mb-3 text-lg font-semibold">All matches, closest first</h3>
      <ol className="space-y-2">
        {ranking.map((m, i) => (
          <li
            key={m.character.id}
            className="rounded-lg border border-zinc-200 dark:border-zinc-800"
          >
            <button
              onClick={() =>
                setOpen(open === m.character.id ? null : m.character.id)
              }
              className="flex w-full items-center gap-3 p-3 text-left"
            >
              <span className="w-6 text-right text-zinc-500">{i + 1}.</span>
              <span className="flex-1">
                <span className="font-medium">{m.character.name}</span>
                <span className="ml-2 text-sm text-zinc-500">
                  {m.character.title}
                </span>
              </span>
              <span className="text-sm tabular-nums text-zinc-500">
                d = {m.distance.toFixed(2)}
              </span>
              <span className="w-12 text-right font-semibold tabular-nums">
                {m.matchPercent}%
              </span>
            </button>
            {open === m.character.id && (
              <div className="space-y-3 border-t border-zinc-200 p-3 dark:border-zinc-800">
                <p className="text-sm text-zinc-500">{m.character.blurb}</p>
                {quiz.qualities.map((q) => (
                  <Compare
                    key={q.id}
                    name={q.name}
                    low={q.low}
                    high={q.high}
                    you={scores[q.id]}
                    them={m.character.traits[q.id] ?? 0}
                  />
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>

      <div className="mt-8 flex gap-3">
        <button
          onClick={onRetake}
          className="rounded-lg bg-indigo-600 px-5 py-2 font-medium text-white hover:bg-indigo-500"
        >
          Retake quiz
        </button>
        <Link
          href="/"
          className="rounded-lg border border-zinc-300 px-5 py-2 dark:border-zinc-700"
        >
          Other quizzes
        </Link>
      </div>
    </div>
  );
}

function Compare(props: {
  name: string;
  low: string;
  high: string;
  you: number;
  them: number;
}) {
  const pos = (v: number) => `${((v + 1) / 2) * 100}%`;
  return (
    <div>
      <div className="mb-1 text-xs font-medium">{props.name}</div>
      <div className="relative h-2 rounded-full bg-zinc-200 dark:bg-zinc-800">
        <span
          title="You"
          className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500"
          style={{ left: pos(props.you) }}
        />
        <span
          title="Character"
          className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 ring-2 ring-white dark:ring-zinc-900"
          style={{ left: pos(props.them) }}
        />
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-zinc-500">
        <span>{props.low}</span>
        <span>
          <span className="text-indigo-500">● you</span>{" "}
          <span className="text-amber-500">● them</span>
        </span>
        <span>{props.high}</span>
      </div>
    </div>
  );
}
