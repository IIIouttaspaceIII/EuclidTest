import type { Quiz } from "@/lib/quiz/types";
import { character, expandGameplayTraitScores } from "./helpers";
import { includeChampionRoster } from "./champion-roster";
import { gameplayChampionTraits } from "./champion-traits";
import gameplayData from "./lol-gameplay.json";

const { qualities, questions } = gameplayData;

const c = (
  id: string,
  name: string,
  title: string,
  blurb: string,
  values: number[],
) => character(qualities, id, name, title, blurb, expandGameplayTraitScores(values));

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
