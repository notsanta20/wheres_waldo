import Header from "./Header";
import GameContent from "./GameContent";
import { useState } from "react";

function Game() {
  const [chars, setChars] = useState([
    {
      name: `Captain Price`,
      found: false,
    },
  ]);

  return (
    <main className="flex flex-col relative p-2">
      <Header chars={chars} />
      <GameContent chars={chars} setChars={setChars} />
    </main>
  );
}

export default Game;
