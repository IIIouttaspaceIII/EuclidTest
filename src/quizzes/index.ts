import type { Quiz } from "@/lib/quiz/types";
import { gameplayQuiz } from "./lol-gameplay";
import { loreQuiz } from "./lol-lore";

/** Register new quizzes here. */
export const quizzes: Quiz[] = [loreQuiz, gameplayQuiz];

export function getQuiz(id: string): Quiz | undefined {
  return quizzes.find((q) => q.id === id);
}
