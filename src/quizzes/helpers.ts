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

export function expandGameplayTraitScores(values: readonly number[]): number[] {
  if (values.length !== 10) {
    throw new Error(`Expected 10 base gameplay trait values, received ${values.length}`);
  }

  const [
    aggression,
    mobility,
    teamplay,
    risk,
    mechanics,
    range,
    burst,
    macro,
    durability,
    trickery,
  ] = values;

  return [
    aggression,
    (-aggression + macro) / 2,
    mobility,
    -mobility,
    teamplay,
    -teamplay,
    risk,
    -mechanics,
    mechanics,
    range,
    -range,
    burst,
    -burst,
    macro,
    (aggression + mechanics) / 2,
    durability,
    (-durability + burst) / 2,
    trickery,
    (-teamplay + trickery) / 2,
    (aggression + macro) / 2,
  ];
}
