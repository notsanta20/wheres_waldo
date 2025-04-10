import Header from "./Header";
import GameContent from "./GameContent";
import timer from "../../utils/timer";
import { useEffect, useState } from "react";

function Game() {
  const [chars, setChars] = useState([
    {
      name: `Captain Price`,
      found: false,
    },
  ]);
  const [time, setTime] = useState({
    startTime: new Date(),
    currentTime: 0,
  });

  useEffect(() => {
    setInterval(() => {
      timer(time, setTime);
    }, 10);
  }, []);

  return (
    <main className="flex flex-col relative p-2">
      <Header chars={chars} time={time.currentTime} />
      <GameContent chars={chars} setChars={setChars} />
    </main>
  );
}

export default Game;
