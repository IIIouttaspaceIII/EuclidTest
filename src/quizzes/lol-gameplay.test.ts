import { describe, expect, it } from "vitest";
import { gameplayQuiz } from "./lol-gameplay";
import gameplayData from "./lol-gameplay.json";

describe("League of Legends gameplay questions", () => {
  it("uses the gameplay JSON for questions and qualities", () => {
    expect(gameplayQuiz.questions).toEqual(gameplayData.questions);
    expect(gameplayQuiz.qualities).toEqual(gameplayData.qualities);
  });

  it("maps each of the 20 questions to exactly one quality", () => {
    expect(gameplayQuiz.questions).toHaveLength(20);
    expect(gameplayQuiz.qualities).toHaveLength(20);

    const mappedQualities = gameplayQuiz.questions.map(
      (question) => question.effects[0]?.quality,
    );
    expect(new Set(mappedQualities).size).toBe(20);
    expect(new Set(mappedQualities)).toEqual(
      new Set(gameplayQuiz.qualities.map(({ id }) => id)),
    );
    for (const question of gameplayQuiz.questions) {
      expect(question.effects).toHaveLength(1);
    }
  });
});
