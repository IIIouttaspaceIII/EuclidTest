"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { QualityDef, Question } from "@/lib/quiz/types";

type GameplayData = { qualities: QualityDef[]; questions: Question[] };
type QualityField = "name" | "low" | "high";

export function GameplayEditor({ initialData }: { initialData: GameplayData }) {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState("");

  function updateQuality(id: string, field: QualityField, value: string) {
    setData((current) => ({
      ...current,
      qualities: current.qualities.map((quality) =>
        quality.id === id ? { ...quality, [field]: value } : quality,
      ),
    }));
  }

  function updateQuestion(id: string, text: string) {
    setData((current) => ({
      ...current,
      questions: current.questions.map((question) =>
        question.id === id ? { ...question, text } : question,
      ),
    }));
  }

  function exportJson(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      data.qualities.some(({ name, low, high }) =>
        [name, low, high].some((value) => !value.trim()),
      ) || data.questions.some(({ text }) => !text.trim())
    ) {
      setError("Question text and quality labels cannot be blank.");
      return;
    }

    setError("");
    const url = URL.createObjectURL(
      new Blob([`${JSON.stringify(data, null, 2)}\n`], {
        type: "application/json",
      }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "lol-gameplay.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  const inputClass =
    "mt-1 w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 dark:border-zinc-700";

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12">
      <Link href="/" className="text-sm text-indigo-500 hover:underline">
        Back to quizzes
      </Link>
      <h1 className="mt-4 text-3xl font-bold">Edit gameplay qualities</h1>
      <p className="mt-3 text-sm text-zinc-500">
        Edit quality labels and their questions, then export the JSON and
        replace <code>src/quizzes/lol-gameplay.json</code> to apply your changes.
        IDs and quality order are fixed because champion scores depend on them.
      </p>
      <form onSubmit={exportJson} className="mt-8 space-y-6">
        {data.qualities.map((quality, index) => {
          const question = data.questions.find(
            (item) => item.effects[0]?.quality === quality.id,
          );
          return (
            <fieldset
              key={quality.id}
              className="space-y-4 rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800"
            >
              <legend className="px-2 font-semibold">
                {index + 1}. {quality.id}
              </legend>
              <label className="block text-sm">
                Quality name
                <input
                  required
                  className={inputClass}
                  value={quality.name}
                  onChange={(event) => updateQuality(quality.id, "name", event.target.value)}
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                {(["low", "high"] as const).map((field) => (
                  <label key={field} className="block text-sm">
                    {field === "low" ? "Low label" : "High label"}
                    <input
                      required
                      className={inputClass}
                      value={quality[field]}
                      onChange={(event) => updateQuality(quality.id, field, event.target.value)}
                    />
                  </label>
                ))}
              </div>
              {question && (
                <label className="block text-sm">
                  Question
                  <textarea
                    required
                    className={inputClass}
                    rows={2}
                    value={question.text}
                    onChange={(event) => updateQuestion(question.id, event.target.value)}
                  />
                </label>
              )}
            </fieldset>
          );
        })}
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-5 py-2 font-medium text-white hover:bg-indigo-500"
        >
          Export JSON
        </button>
      </form>
    </main>
  );
}
