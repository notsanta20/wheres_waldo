import Header from "./Header";
import GameContent from "./GameContent";

function Game() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <GameContent />
    </div>
  );
}

export default Game;
