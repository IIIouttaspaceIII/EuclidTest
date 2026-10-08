import type { Question, Quiz, QualityDef } from "@/lib/quiz/types";
import { character } from "./helpers";
import { includeChampionRoster } from "./champion-roster";
import { gameplayChampionTraits } from "./champion-traits";

const qualities: QualityDef[] = [
  { id: "aggression", name: "Aggression", low: "Passive", high: "Aggressive" },
  { id: "mobility", name: "Mobility", low: "Planted", high: "Mobile" },
  { id: "teamplay", name: "Teamplay", low: "Self-focused", high: "Team-focused" },
  { id: "risk", name: "Risk-taking", low: "Safe", high: "Risky" },
  { id: "mechanics", name: "Mechanical skill", low: "Simple", high: "Demanding" },
  { id: "range", name: "Range", low: "Melee", high: "Ranged" },
  { id: "burst", name: "Burst", low: "Sustained", high: "Burst" },
  { id: "macro", name: "Macro", low: "Skirmish-focused", high: "Macro-focused" },
  { id: "tank", name: "Durability", low: "Squishy", high: "Durable" },
  { id: "trick", name: "Trickery", low: "Straightforward", high: "Tricky" },
];

const questions: Question[] = [
  { id: "g1", text: "I like to start fights rather than wait for them.", effects: [{ quality: "aggression", weight: 1 }] },
  { id: "g2", text: "I prefer to farm safely and wait for the enemy to make mistakes.", effects: [{ quality: "aggression", weight: -1 }, { quality: "risk", weight: -0.5 }] },
  { id: "g3", text: "Dashing around the battlefield is the most fun part of the game.", effects: [{ quality: "mobility", weight: 1 }] },
  { id: "g4", text: "I'd rather stand my ground than chase or run away.", effects: [{ quality: "mobility", weight: -1 }] },
  { id: "g5", text: "I'm happiest when I'm making my teammates stronger.", effects: [{ quality: "teamplay", weight: 1 }] },
  { id: "g6", text: "I want to carry games on my own.", effects: [{ quality: "teamplay", weight: -1 }, { quality: "aggression", weight: 0.3 }] },
  { id: "g7", text: "A risky all-in play is worth it for a big payoff.", effects: [{ quality: "risk", weight: 1 }] },
  { id: "g8", text: "I want a champion I can learn in a few games.", effects: [{ quality: "mechanics", weight: -1 }] },
  { id: "g9", text: "I love high-skill champions with a demanding skill ceiling.", effects: [{ quality: "mechanics", weight: 1 }] },
  { id: "g10", text: "I want to deal damage from a safe distance.", effects: [{ quality: "range", weight: 1 }, { quality: "tank", weight: -0.3 }] },
  { id: "g11", text: "I want to be right in the middle of the action.", effects: [{ quality: "range", weight: -1 }] },
  { id: "g12", text: "Deleting an enemy in a split second is the best feeling.", effects: [{ quality: "burst", weight: 1 }] },
  { id: "g13", text: "I prefer steady damage or healing over a long fight to quick bursts.", effects: [{ quality: "burst", weight: -1 }] },
  { id: "g14", text: "I'm always looking at the minimap and thinking about objectives.", effects: [{ quality: "macro", weight: 1 }] },
  { id: "g15", text: "I'd rather win by outplaying someone in a duel than by taking towers.", effects: [{ quality: "macro", weight: -1 }, { quality: "mechanics", weight: 0.3 }] },
  { id: "g16", text: "I like absorbing damage so my team doesn't have to.", effects: [{ quality: "tank", weight: 1 }, { quality: "teamplay", weight: 0.3 }] },
  { id: "g17", text: "I'd rather be a glass cannon with huge damage than have lots of health.", effects: [{ quality: "tank", weight: -1 }] },
  { id: "g18", text: "I enjoy traps, ambushes and mind games.", effects: [{ quality: "trick", weight: 1 }] },
  { id: "g19", text: "I'd rather play on my own terms, even when the team wants something else.", effects: [{ quality: "teamplay", weight: -1 }] },
  { id: "g20", text: "When I'm ahead, I like to snowball and end the game fast.", effects: [{ quality: "aggression", weight: 1 }, { quality: "macro", weight: 0.5 }] },
];

const c = (...args: [string, string, string, string, number[]]) =>
  character(qualities, ...args);

export const gameplayQuiz: Quiz = {
  id: "lol-gameplay",
  title: "League of Legends: Gameplay",
  description:
    "Which champion matches your playstyle? Based on kits, roles and how they feel to play.",
  qualities,
  questions,
  characters: includeChampionRoster(qualities, [
    //          aggr  mobil team  risk  mech  range burst macro tank  trick
    c("garen", "Garen", "Top laner", "Simple, sturdy bruiser that spins and executes.", [0.4, -0.3, 0.3, -0.3, -0.7, -0.8, -0.2, -0.2, 0.6, -0.6]),
    c("darius", "Darius", "Top laner", "Dominating juggernaut who wins with stacks and executes.", [0.8, -0.4, 0.1, 0.1, -0.1, -0.8, 0.4, -0.3, 0.5, -0.5]),
    c("ezreal", "Ezreal", "Marksman", "Skill-shot-heavy mobile ranged carry.", [0, 0.8, -0.1, 0.5, 0.8, 0.9, 0.4, 0, -0.8, 0.2]),
    c("jinx", "Jinx", "Marksman", "Hypercarry who snowballs from resets.", [0.5, -0.3, 0.2, 0.2, 0.3, 0.9, 0.3, 0.3, -0.8, -0.2]),
    c("lux", "Lux", "Mage / Support", "Long-range burst with big skillshots.", [0.1, -0.5, 0.5, 0.1, 0, 0.9, 0.9, 0.1, -0.8, 0]),
    c("ahri", "Ahri", "Mid laner", "Mobile mage with charm and pick potential.", [0.3, 0.8, 0, 0.3, 0.4, 0.5, 0.7, 0.1, -0.6, 0.4]),
    c("teemo", "Teemo", "Top laner", "Annoying skirmisher with mushrooms and poison.", [0, -0.2, -0.5, -0.1, -0.4, 0.7, -0.2, 0.4, -0.6, 1]),
    c("thresh", "Thresh", "Support", "Hook-and-lantern playmaker.", [0.4, -0.1, 0.9, 0.5, 0.9, 0.1, -0.3, 0.2, 0.2, 0.5]),
    c("yasuo", "Yasuo", "Mid / Bottom", "High-skill dashing duelist.", [0.6, 0.9, -0.4, 0.8, 1, -0.2, 0.4, -0.4, -0.1, 0.2]),
    c("katarina", "Katarina", "Mid laner", "Mobile assassin who resets on kills.", [0.9, 1, -0.4, 0.8, 0.8, -0.8, 1, -0.3, -0.7, 0]),
    c("ashe", "Ashe", "Marksman", "Utility ranged carry who sets up fights with her ultimate.", [0.1, -0.2, 0.7, 0, 0.2, 1, -0.3, 0.7, -0.8, 0.1]),
    c("leesin", "Lee Sin", "Jungler", "Famously high-skill early game jungler.", [0.7, 1, 0.3, 0.9, 1, -0.6, 0.6, 0.2, 0, 0.2]),
    c("singed", "Singed", "Top laner", "Poison-trailing troll tank.", [0, 0.2, -0.7, 0, -0.3, -0.6, -0.6, 0.3, 0.5, 0.9]),
    c("zilean", "Zilean", "Support", "Bomb-slinging support who speeds allies up and revives himself.", [-0.4, 0.2, 0.8, -0.1, 0.4, 0.5, -0.5, 0.5, -0.6, 0.3]),
    c("soraka", "Soraka", "Support", "Healer who sustains her team across the map.", [-0.6, -0.2, 1, -0.3, 0, 0.6, -0.9, 0.8, -0.5, -0.1]),
    c("zed", "Zed", "Mid laner", "Shadow-swapping burst assassin.", [0.8, 0.8, -0.3, 0.6, 0.8, -0.6, 1, -0.2, -0.6, 0.4]),
    c("vi", "Vi", "Jungler", "Punch-through diver who locks down a target.", [0.7, 0.4, 0.2, 0.3, 0.2, -0.7, 0.5, 0, 0.3, -0.4]),
    c("nasus", "Nasus", "Top laner", "Patient stacker who becomes a monster late.", [-0.2, -0.5, -0.2, -0.5, -0.6, -0.7, -0.7, 0.2, 0.6, -0.3]),
    c("draven", "Draven", "Marksman", "Showy, high-risk, axe-catching carry.", [0.7, -0.2, -0.2, 0.7, 0.8, 0.8, 0.7, -0.3, -0.7, 0]),
    c("ivern", "Ivern", "Jungler", "Utility jungler who helps his team with camps and shields.", [-0.5, 0, 0.7, -0.4, -0.3, 0.4, -0.7, 0.8, 0, 0.7]),
    c("mordekaiser", "Mordekaiser", "Top laner", "Heavy metal juggernaut with a duel ultimate.", [0.5, -0.5, 0, -0.3, -0.5, -0.5, 0, -0.2, 0.8, -0.4]),
  ], gameplayChampionTraits),
};
