import { describe, expect, it } from "vitest";
import {
  computeQualityScores,
  labelForValue,
  rankCharacters,
} from "./scoring";
import type { Quiz } from "./types";

const quiz: Quiz = {
  id: "t",
  title: "t",
  description: "",
  qualities: [
    { id: "a", name: "A", low: "lo", high: "hi" },
    { id: "b", name: "B", low: "lo", high: "hi" },
  ],
  questions: [
    { id: "q1", text: "", effects: [{ quality: "a", weight: 1 }] },
    { id: "q2", text: "", effects: [{ quality: "a", weight: -1 }] },
    { id: "q3", text: "", effects: [{ quality: "b", weight: 1 }] },
  ],
  characters: [
    { id: "x", name: "X", title: "", blurb: "", traits: { a: 1, b: 1 } },
    { id: "y", name: "Y", title: "", blurb: "", traits: { a: -1, b: -1 } },
  ],
};

describe("scoring", () => {
  it("labels slider values", () => {
    expect(labelForValue(-1)).toBe("Completely disagree");
    expect(labelForValue(0)).toBe("Neutral");
    expect(labelForValue(0.4)).toBe("Slightly agree");
    expect(labelForValue(1)).toBe("Completely agree");
  });

  it("aggregates, reverse-scores and normalizes", () => {
    const s = computeQualityScores(quiz, { q1: 1, q2: -1, q3: 0.5 });
    expect(s.a).toBe(1);
    expect(s.b).toBe(0.5);
  });

  it("ranks by euclidean distance", () => {
    const r = rankCharacters(quiz, { q1: 1, q2: -1, q3: 1 });
    expect(r.map((m) => m.character.id)).toEqual(["x", "y"]);
    expect(r[0].distance).toBe(0);
    expect(r[0].matchPercent).toBe(100);
    expect(r[1].distance).toBeCloseTo(Math.sqrt(8));
    expect(r[1].matchPercent).toBe(0);
  });
});
