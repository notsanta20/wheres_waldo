import Header from "./Header";
import GameContent from "./GameContent";
import timer from "../../utils/timer";
import { useEffect, useRef, useState } from "react";

function Game() {
  const score = useRef(0);
  const timerInterval = useRef(0);
  const [winner, setWinner] = useState(false);

  const [chars, setChars] = useState([
    {
      name: `Captain Price`,
      found: false,
    },
    {
      name: `Popeye`,
      found: false,
    },
    {
      name: `Deadpool`,
      found: false,
    },
  ]);

  const [time, setTime] = useState({
    startTime: new Date(),
    currentTime: 0,
  });

  useEffect(() => {
    timerInterval.current = setInterval(() => {
      if (winner) {
        clearInterval(timerInterval.current);
        console.log(time.currentTime);
        return;
      }
      timer(time, setTime);
    }, 10);

    return () => {
      clearInterval(timerInterval.current);
    };
  }, [winner]);

  return (
    <main className="flex flex-col relative p-2">
      <Header chars={chars} time={time.currentTime} />
      <GameContent
        chars={chars}
        setChars={setChars}
        score={score}
        setWinner={setWinner}
      />
    </main>
  );
}

export default Game;
