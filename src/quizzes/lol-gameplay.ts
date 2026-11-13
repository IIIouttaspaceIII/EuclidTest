import type { Quiz } from "@/lib/quiz/types";
import { character } from "./helpers";
import { includeChampionRoster } from "./champion-roster";
import { gameplayChampionTraits } from "./champion-traits";
import gameplayData from "./lol-gameplay.json";

const { qualities, questions } = gameplayData;

function c(
  id: string,
  name: string,
  title: string,
  blurb: string,
) {
  const values = gameplayChampionTraits[name];
  if (!values) {
    throw new Error(`Missing quiz trait profile for ${name}`);
  }
  if (values.some((value) => !Number.isFinite(value) || value < -1 || value > 1)) {
    throw new Error(`${name}: trait values must be finite and between -1 and 1`);
  }
  return character(qualities, id, name, title, blurb, [...values]);
}

export const gameplayQuiz: Quiz = {
  id: "lol-gameplay",
  title: "League of Legends: Gameplay",
  description:
    "Which champion matches your playstyle? Based on kits, roles and how they feel to play.",
  qualities,
  questions,
  characters: includeChampionRoster(qualities, [
    c("garen", "Garen", "Top laner", "Simple, sturdy bruiser that spins and executes."),
    c("darius", "Darius", "Top laner", "Dominating juggernaut who wins with stacks and executes."),
    c("ezreal", "Ezreal", "Marksman", "Skill-shot-heavy mobile ranged carry."),
    c("jinx", "Jinx", "Marksman", "Hypercarry who snowballs from resets."),
    c("lux", "Lux", "Mage / Support", "Long-range burst with big skillshots."),
    c("ahri", "Ahri", "Mid laner", "Mobile mage with charm and pick potential."),
    c("teemo", "Teemo", "Top laner", "Annoying skirmisher with mushrooms and poison."),
    c("thresh", "Thresh", "Support", "Hook-and-lantern playmaker."),
    c("yasuo", "Yasuo", "Mid / Bottom", "High-skill dashing duelist."),
    c("katarina", "Katarina", "Mid laner", "Mobile assassin who resets on kills."),
    c("ashe", "Ashe", "Marksman", "Utility ranged carry who sets up fights with her ultimate."),
    c("leesin", "Lee Sin", "Jungler", "Famously high-skill early game jungler."),
    c("singed", "Singed", "Top laner", "Poison-trailing troll tank."),
    c("zilean", "Zilean", "Support", "Bomb-slinging support who speeds allies up and revives himself."),
    c("soraka", "Soraka", "Support", "Healer who sustains her team across the map."),
    c("zed", "Zed", "Mid laner", "Shadow-swapping burst assassin."),
    c("vi", "Vi", "Jungler", "Punch-through diver who locks down a target."),
    c("nasus", "Nasus", "Top laner", "Patient stacker who becomes a monster late."),
    c("draven", "Draven", "Marksman", "Showy, high-risk, axe-catching carry."),
    c("ivern", "Ivern", "Jungler", "Utility jungler who helps his team with camps and shields."),
    c("mordekaiser", "Mordekaiser", "Top laner", "Heavy metal juggernaut with a duel ultimate."),
  ], gameplayChampionTraits),
};
