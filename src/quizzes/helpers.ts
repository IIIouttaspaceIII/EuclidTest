import type { Character, QualityDef } from "@/lib/quiz/types";

/** Builds a character whose traits are given in the same order as `qualities`. */
export function character(
  qualities: QualityDef[],
  id: string,
  name: string,
  title: string,
  blurb: string,
  values: number[],
): Character {
  if (values.length !== qualities.length) {
    throw new Error(`${name}: expected ${qualities.length} trait values`);
  }
  return {
    id,
    name,
    title,
    blurb,
    traits: Object.fromEntries(qualities.map((q, i) => [q.id, values[i]])),
  };
}
