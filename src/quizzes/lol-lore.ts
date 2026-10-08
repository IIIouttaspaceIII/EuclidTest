import type { Question, Quiz, QualityDef } from "@/lib/quiz/types";
import { character } from "./helpers";
import { includeChampionRoster } from "./champion-roster";
import { loreChampionTraits } from "./champion-traits";

const qualities: QualityDef[] = [
  { id: "honor", name: "Honor", low: "Dishonorable", high: "Honorable" },
  { id: "ambition", name: "Ambition", low: "Content", high: "Ambitious" },
  { id: "ruthless", name: "Ruthlessness", low: "Merciful", high: "Ruthless" },
  { id: "order", name: "Order", low: "Chaotic", high: "Orderly" },
  { id: "curiosity", name: "Curiosity", low: "Incurious", high: "Curious" },
  { id: "arcane", name: "Arcane", low: "Mundane", high: "Arcane" },
  { id: "wild", name: "Wildness", low: "Civilized", high: "Wild" },
  { id: "mirth", name: "Mischief", low: "Grim", high: "Mischievous" },
  { id: "loyalty", name: "Loyalty", low: "Lone wolf", high: "Loyal" },
];

const questions: Question[] = [
  { id: "l1", text: "Keeping my word matters more to me than winning.", effects: [{ quality: "honor", weight: 1 }] },
  { id: "l2", text: "Dishonest means are justified if the cause is good.", effects: [{ quality: "honor", weight: -1 }] },
  { id: "l3", text: "I want to be remembered for something great.", effects: [{ quality: "ambition", weight: 1 }] },
  { id: "l4", text: "I'd be happy living a quiet life out of the spotlight.", effects: [{ quality: "ambition", weight: -1 }] },
  { id: "l5", text: "Some enemies can't be redeemed and shouldn't be spared.", effects: [{ quality: "ruthless", weight: 1 }] },
  { id: "l6", text: "I'd rather show mercy than take a life.", effects: [{ quality: "ruthless", weight: -1 }] },
  { id: "l7", text: "I'd sacrifice a few to save many.", effects: [{ quality: "ruthless", weight: 1 }, { quality: "honor", weight: -0.5 }] },
  { id: "l8", text: "Strong laws and institutions keep people safe.", effects: [{ quality: "order", weight: 1 }] },
  { id: "l9", text: "Rules are mostly suggestions.", effects: [{ quality: "order", weight: -1 }] },
  { id: "l10", text: "I'd defy my own people if I believed they were wrong.", effects: [{ quality: "order", weight: -1 }, { quality: "loyalty", weight: -0.5 }] },
  { id: "l11", text: "I can't resist opening a sealed door.", effects: [{ quality: "curiosity", weight: 1 }] },
  { id: "l12", text: "Some knowledge is best left buried.", effects: [{ quality: "curiosity", weight: -1 }] },
  { id: "l13", text: "I'd love to study magic and unravel its secrets.", effects: [{ quality: "arcane", weight: 1 }, { quality: "curiosity", weight: 0.5 }] },
  { id: "l14", text: "I trust steel more than spells.", effects: [{ quality: "arcane", weight: -1 }] },
  { id: "l15", text: "I feel most at home far away from cities.", effects: [{ quality: "wild", weight: 1 }] },
  { id: "l16", text: "I cope with danger by joking about it.", effects: [{ quality: "mirth", weight: 1 }] },
  { id: "l17", text: "I would follow my friends into certain doom.", effects: [{ quality: "loyalty", weight: 1 }] },
  { id: "l18", text: "I do my best work alone.", effects: [{ quality: "loyalty", weight: -1 }] },
  { id: "l19", text: "Family and homeland come before everything else.", effects: [{ quality: "loyalty", weight: 1 }, { quality: "order", weight: 0.5 }] },
  { id: "l20", text: "I would take power by force if no one else could be trusted with it.", effects: [{ quality: "ambition", weight: 1 }, { quality: "ruthless", weight: 0.5 }, { quality: "honor", weight: -0.5 }] },
];

const c = (...args: [string, string, string, string, number[]]) =>
  character(qualities, ...args);

export const loreQuiz: Quiz = {
  id: "lol-lore",
  title: "League of Legends: Lore",
  description:
    "Which champion do you match in personality, morals and background story?",
  qualities,
  questions,
  characters: includeChampionRoster(qualities, [
    //          honor ambit ruthl order curio arcan wild  mirth loyal
    c("garen", "Garen", "The Might of Demacia", "Dutiful, steadfast and proud of his kingdom.", [0.9, 0.3, -0.2, 0.9, -0.4, -0.7, -0.6, -0.2, 0.9]),
    c("darius", "Darius", "The Hand of Noxus", "A conqueror who believes strength is the only law.", [0.3, 0.8, 0.8, 0.8, -0.5, -0.8, -0.7, -0.5, 0.6]),
    c("ezreal", "Ezreal", "The Prodigal Explorer", "A cocky adventurer chasing lost ruins.", [0.2, 0.4, -0.6, -0.6, 1, 0.5, -0.3, 0.9, 0.2]),
    c("jinx", "Jinx", "The Loose Cannon", "A gleeful agent of chaos.", [-0.8, 0.2, 0.5, -1, 0.6, -0.6, -0.4, 0.9, -0.5]),
    c("lux", "Lux", "The Lady of Luminosity", "A hopeful mage hiding her gift to protect it.", [0.8, 0.3, -0.8, 0.4, 0.6, 0.9, -0.6, 0.6, 0.8]),
    c("ahri", "Ahri", "The Nine-Tailed Fox", "A vastaya searching for who she is.", [-0.1, 0.4, -0.1, -0.2, 0.7, 0.8, 0.5, 0.5, -0.3]),
    c("teemo", "Teemo", "The Swift Scout", "Cheerful, devoted and quietly dangerous.", [0.1, 0.1, 0.2, 0.6, 0.2, -0.5, 0.3, 0.8, 0.7]),
    c("thresh", "Thresh", "The Chain Warden", "A sadistic collector of souls.", [-0.9, 0.8, 0.9, 0.2, 0.5, 0.7, -0.5, 0.4, -0.8]),
    c("yasuo", "Yasuo", "The Unforgiven", "A wandering swordsman haunted by a false accusation.", [0.2, -0.2, -0.2, -0.5, 0.2, -0.5, 0.4, 0.1, -0.4]),
    c("katarina", "Katarina", "The Sinister Blade", "A Noxian assassin loyal to her family.", [0.2, 0.6, 0.7, 0.3, 0.2, -0.6, -0.7, -0.3, 0.7]),
    c("ashe", "Ashe", "The Frost Archer", "A warrior queen uniting the Freljord.", [0.7, 0.8, -0.3, 0.7, 0.3, 0.3, 0.6, -0.2, 0.7]),
    c("leesin", "Lee Sin", "The Blind Monk", "A disciplined monk who sacrificed his sight for his people.", [1, -0.2, -0.7, 0.7, 0.2, 0.2, 0.3, -0.3, 0.5]),
    c("singed", "Singed", "The Mad Chemist", "A scientist who sees people as experiments.", [-0.7, 0.4, 0.6, -0.3, 0.9, 0.3, -0.8, 0.3, -0.6]),
    c("zilean", "Zilean", "The Chronokeeper", "An ancient mage obsessed with time.", [0.4, -0.5, -0.3, 0.7, 1, 0.9, -0.4, 0.1, 0.2]),
    c("soraka", "Soraka", "The Starchild", "A celestial who gave up immortality to heal mortals.", [0.8, -0.4, -0.9, 0.5, 0.1, 0.6, 0.8, -0.1, 0.6]),
    c("zed", "Zed", "The Master of Shadows", "A ninja who will do anything for power.", [-0.2, 0.7, 0.7, 0.6, 0.4, 0.7, -0.7, -0.7, 0.2]),
    c("vi", "Vi", "The Piltover Enforcer", "A brawler turned lawwoman with a soft spot for her friends.", [0.3, 0.3, -0.1, 0.2, -0.3, -0.7, -0.6, 0.3, 0.6]),
    c("nasus", "Nasus", "The Curator of the Sands", "An ascended guardian of knowledge.", [0.8, -0.3, -0.3, 0.9, 0.9, 0.5, -0.1, -0.4, 0.4]),
    c("draven", "Draven", "The Glorious Executioner", "A showman who craves adoration.", [-0.4, 0.9, 0.5, -0.3, -0.5, -0.7, -0.7, 1, -0.3]),
    c("ivern", "Ivern", "The Green Father", "A gentle forest spirit who befriends everything.", [0.5, -0.8, -0.9, 0.1, 0.7, 0.5, 1, 0.7, 0.5]),
    c("mordekaiser", "Mordekaiser", "The Iron Revenant", "A dead warlord who wants to rule beyond death.", [-0.2, 0.8, 0.8, 0.7, -0.2, 0.8, -0.8, -0.5, 0.3]),
  ], loreChampionTraits),
};
