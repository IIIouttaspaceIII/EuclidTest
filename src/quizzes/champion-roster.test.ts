import { describe, expect, it } from "vitest";
import type { QualityDef } from "@/lib/quiz/types";
import { championNames, includeChampionRoster } from "./champion-roster";
import { gameplayChampionTraits } from "./champion-traits";
import { gameplayQuiz } from "./lol-gameplay";
import { loreQuiz } from "./lol-lore";

const qualities: QualityDef[] = [
  { id: "first", name: "First", low: "Low", high: "High" },
  { id: "second", name: "Second", low: "Low", high: "High" },
];

describe("League of Legends champion roster", () => {
  it("includes every profiled character without duplicating existing quiz profiles", () => {
    const leeSin = gameplayQuiz.characters.find(({ name }) => name === "Lee Sin");
    const characters = includeChampionRoster(
      gameplayQuiz.qualities,
      gameplayQuiz.characters,
      gameplayChampionTraits,
    );

    expect(characters).toHaveLength(gameplayQuiz.characters.length);
    expect(characters.find(({ name }) => name === "Lee Sin")).toBe(leeSin);

    const fromProfiles = includeChampionRoster(
      gameplayQuiz.qualities,
      [],
      gameplayChampionTraits,
    );
    expect(new Set(fromProfiles.map(({ name }) => name))).toEqual(
      new Set(Object.keys(gameplayChampionTraits)),
    );
    expect(fromProfiles.find(({ name }) => name === "Aatrox")?.traits).toHaveProperty(
      "aggression",
    );
  });

  it("rejects profiles with the wrong number of trait values", () => {
    expect(() => includeChampionRoster(qualities, [], { Aatrox: [0.5] })).toThrow(
      "Aatrox: expected 2 trait values, received 1",
    );
  });

  it.each([
    {
      title: gameplayQuiz.title,
      quiz: gameplayQuiz,
      names: Object.keys(gameplayChampionTraits),
    },
    { title: loreQuiz.title, quiz: loreQuiz, names: [...championNames] },
  ])("includes every champion in the $title quiz", ({ quiz, names }) => {
    expect(quiz.characters.map(({ name }) => name)).toHaveLength(names.length);
    expect(new Set(quiz.characters.map(({ name }) => name))).toEqual(new Set(names));
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
  });
});
