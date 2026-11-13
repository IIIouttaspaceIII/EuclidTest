import { notFound } from "next/navigation";
import gameplayData from "@/quizzes/lol-gameplay.json";
import { GameplayEditor } from "@/components/GameplayEditor";

export default function GameplayEditorPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return <GameplayEditor initialData={gameplayData} />;
}
