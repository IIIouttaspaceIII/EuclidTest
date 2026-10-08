import type { Answers, CharacterMatch, QualityId, Quiz } from "./types";

export const ANSWER_LABELS = [
  "Completely disagree",
  "Mostly disagree",
  "Slightly disagree",
  "Neutral",
  "Slightly agree",
  "Mostly agree",
  "Completely agree",
] as const;

/** Maps a -1..1 slider value to the nearest anchor word. */
export function labelForValue(value: number): string {
  const clamped = Math.max(-1, Math.min(1, value));
  const index = Math.round(((clamped + 1) / 2) * (ANSWER_LABELS.length - 1));
  return ANSWER_LABELS[index];
}

/** Normalized (-1..1) score per quality; unanswered qualities score 0. */
export function computeQualityScores(
  quiz: Quiz,
  answers: Answers,
): Record<QualityId, number> {
  const sums: Record<QualityId, number> = {};
  const norms: Record<QualityId, number> = {};
  for (const question of quiz.questions) {
    const answer = answers[question.id];
    if (answer === undefined) continue;
    for (const { quality, weight } of question.effects) {
      sums[quality] = (sums[quality] ?? 0) + answer * weight;
      norms[quality] = (norms[quality] ?? 0) + Math.abs(weight);
    }
  }
  const scores: Record<QualityId, number> = {};
  for (const q of quiz.qualities) {
    scores[q.id] = norms[q.id] ? sums[q.id] / norms[q.id] : 0;
  }
  return scores;
}

export function euclideanDistance(
  a: Record<QualityId, number>,
  b: Record<QualityId, number>,
  ids: QualityId[],
): number {
  let total = 0;
  for (const id of ids) {
    const diff = (a[id] ?? 0) - (b[id] ?? 0);
    total += diff * diff;
  }
  return Math.sqrt(total);
}

/** All characters, closest (smallest Euclidean distance) first. */
export function rankCharacters(quiz: Quiz, answers: Answers): CharacterMatch[] {
  const scores = computeQualityScores(quiz, answers);
  const ids = quiz.qualities.map((q) => q.id);
  const maxDistance = Math.sqrt(4 * ids.length) || 1;
  return quiz.characters
    .map((character) => {
      const distance = euclideanDistance(scores, character.traits, ids);
      return {
        character,
        distance,
        matchPercent: Math.round((1 - distance / maxDistance) * 100),
      };
    })
    .sort((x, y) => x.distance - y.distance);
}
