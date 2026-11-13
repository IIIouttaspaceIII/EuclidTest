import { describe, expect, it } from "vitest";
import { gameplayQuiz } from "./lol-gameplay";
import gameplayData from "./lol-gameplay.json";
import gameplayTraits from "./lol-gameplay-traits.json";
import { expandGameplayTraitScores } from "./helpers";

describe("League of Legends gameplay questions", () => {
  it("uses the gameplay JSON for questions and qualities", () => {
    expect(gameplayQuiz.questions).toEqual(gameplayData.questions);
    expect(gameplayQuiz.qualities).toEqual(gameplayData.qualities);
  });

  it("loads every champion's full trait vector from JSON", () => {
    expect(Object.keys(gameplayTraits).sort()).toEqual(
      gameplayQuiz.characters.map(({ name }) => name).sort(),
    );
    for (const champion of gameplayQuiz.characters) {
      expect(gameplayQuiz.qualities.map(({ id }) => champion.traits[id])).toEqual(
        gameplayTraits[champion.name as keyof typeof gameplayTraits],
      );
    }
  });

  it("preserves the original scores for curated and roster champions", () => {
    for (const [name, base] of [
      ["Garen", [0.4, -0.3, 0.3, -0.3, -0.7, -0.8, -0.2, -0.2, 0.6, -0.6]],
      ["Aatrox", [0.4, 0, 0.4, 0.9, 0, -0.1, 0.6, -0.5, 1, -0.7]],
    ] as const) {
      const champion = gameplayQuiz.characters.find((item) => item.name === name)!;
      expect(gameplayQuiz.qualities.map(({ id }) => champion.traits[id])).toEqual(
        expandGameplayTraitScores(base).map((value) => value === 0 ? 0 : value),
      );
    }
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
