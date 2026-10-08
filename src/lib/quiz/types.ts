export type QualityId = string;

export interface QualityDef {
  id: QualityId;
  name: string;
  /** Label shown for the negative (-1) and positive (+1) ends. */
  low: string;
  high: string;
}

export interface QuestionEffect {
  quality: QualityId;
  /** Positive: agreeing raises the quality. Negative: reverse-scored. */
  weight: number;
}

export interface Question {
  id: string;
  text: string;
  effects: QuestionEffect[];
}

export interface Character {
  id: string;
  name: string;
  title: string;
  blurb: string;
  /** Position on each quality, -1..1. Missing qualities count as 0. */
  traits: Record<QualityId, number>;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  qualities: QualityDef[];
  questions: Question[];
  characters: Character[];
}

/** Answers keyed by question id, each in -1..1. */
export type Answers = Record<string, number>;

export interface CharacterMatch {
  character: Character;
  distance: number;
  /** 0-100, 100 being identical. */
  matchPercent: number;
}
