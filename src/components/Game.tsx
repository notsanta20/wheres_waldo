import Header from "./Header";
import GameContent from "./GameContent";
import timer from "../../utils/timer";
import { useEffect, useRef, useState } from "react";
import Box from "../../utils/Box";
import axios from "axios";

function onSubmit(e, setError: Function, time: string) {
  e.preventDefault();
  const name: string = e.target[0].value;
  const url = import.meta.env.VITE_LOCAL_URL;

  const data = {
    name: name,
    time: time,
  };

  axios
    .post(`${url}/leaderBoard`, data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      setError(`Internal server error, try again`);
    });
}

function GetName({ time }) {
  const [error, setError] = useState(``);

  return (
    <div className="flex flex-col gap-3 text-pink-600 py-6 px-10 text-2xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <div className="font-medium">
        Congrats You Found all the Characters, Enter your Name
      </div>
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          onSubmit(e, setError, time);
        }}
      >
        <div className="flex gap-2">
          <input
            type="text"
            name="name"
            id="name"
            className="flex-1 border-1 border-black rounded-lg py-2 px-3"
          />
          <button className="bg-gray-600 rounded-lg py-2 px-3 cursor-pointer">
            Submit
          </button>
        </div>
        <div className="h-[3px] text-red-600 font-sm">{error}</div>
      </form>
    </div>
  );
}

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
      {winner && <Box children={<GetName time={time} />} />}
    </main>
  );
}

export default Game;
