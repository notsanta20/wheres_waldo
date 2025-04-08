import Header from "./Header";
import GameContent from "./GameContent";

function Game() {
  return (
    <main className="flex flex-col relative p-2">
      <Header />
      <GameContent />
    </main>
  );
}

export default Game;
