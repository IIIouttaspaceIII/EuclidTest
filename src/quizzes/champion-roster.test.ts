import { describe, expect, it } from "vitest";
import type { QualityDef } from "@/lib/quiz/types";
import { championNames, includeChampionRoster } from "./champion-roster";
import { gameplayQuiz } from "./lol-gameplay";
import { loreQuiz } from "./lol-lore";

const qualities: QualityDef[] = [
  { id: "first", name: "First", low: "Low", high: "High" },
  { id: "second", name: "Second", low: "Low", high: "High" },
];

describe("League of Legends champion roster", () => {
  it("includes every champion without duplicating existing quiz profiles", () => {
    const leeSin = gameplayQuiz.characters.find(({ name }) => name === "Lee Sin");
    const characters = includeChampionRoster(
      gameplayQuiz.qualities,
      gameplayQuiz.characters,
      {},
    );

    expect(characters.map(({ name }) => name)).toHaveLength(championNames.length);
    expect(new Set(characters.map(({ name }) => name))).toEqual(
      new Set(championNames),
    );
    expect(characters.find(({ name }) => name === "Lee Sin")).toBe(leeSin);
    expect(characters.find(({ name }) => name === "Aatrox")?.traits).toHaveProperty(
      "aggression",
    );
  });

  it("rejects a missing profile instead of silently using neutral scores", () => {
    expect(() => includeChampionRoster(qualities, [], {})).toThrow(
      "Missing quiz trait profile for Aatrox",
    );
  });

  it.each([gameplayQuiz, loreQuiz])(
    "includes every champion in the $title quiz",
    (quiz) => {
      expect(quiz.characters.map(({ name }) => name)).toHaveLength(
        championNames.length,
      );
      expect(new Set(quiz.characters.map(({ name }) => name))).toEqual(
        new Set(championNames),
      );
      const traitVectors = quiz.characters.map((character) =>
        quiz.qualities.map((quality) => character.traits[quality.id]).join(","),
      );
      expect(new Set(traitVectors).size).toBe(quiz.characters.length);
      for (const character of quiz.characters) {
        expect(Object.keys(character.traits)).toHaveLength(quiz.qualities.length);
        expect(
          Object.values(character.traits).every(
            (value) => Number.isFinite(value) && value >= -1 && value <= 1,
          ),
        ).toBe(true);
        expect(Object.values(character.traits).some((value) => value !== 0)).toBe(
          true,
        );
      }
    },
  );
});
