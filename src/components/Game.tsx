import Header from "./Header";
import GameContent from "./GameContent";
import timer from "../../utils/timer";
import { RefObject, useEffect, useRef, useState } from "react";
import Box from "../../utils/Box";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

interface charObj {
  name: string;
  found: boolean;
}

const schema = z.object({
  name: z.string().min(1, { message: `Name must be at least 1 character` }),
});

function Game() {
  const score = useRef<number>(0);
  const timerInterval = useRef(0);
  const [winner, setWinner] = useState(false);
  const [chars, setChars] = useState<Array<charObj>>([
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
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [time, setTime] = useState({
    startTime: new Date(),
    currentTime: ``,
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

  function onSubmitForm(data: {}) {
    const baseURL: string = import.meta.env.VITE_LOCAL_URL;

    axios
      .post(`${baseURL}/leaderBoard`, data)
      .then(() => {
        navigate(`/leaderBoard`);
      })
      .catch(() => {
        setError(`name`, { message: `Internal server error, try again` });
      });
  }

  function GetNameModal({ time }: { time: { currentTime: string } }) {
    return (
      <div className="flex flex-col gap-3 py-6 px-10 text-2xl">
        <div className="font-medium">
          Congrats You Found all the Characters, Enter your Name
        </div>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit((data) => {
            data.time = time.currentTime;
            onSubmitForm(data);
          })}
        >
          <div className="flex gap-2">
            <input
              type="text"
              name="name"
              id="name"
              className="flex-1 border-1 border-white rounded-lg py-2 px-3"
              {...register(`name`)}
            />
            <button className="bg-gray-600 rounded-lg py-2 px-3 cursor-pointer">
              {isSubmitting ? `Submitting` : `Submit`}
            </button>
          </div>
          <div className="h-[35px] text-red-600 font-sm">
            {typeof errors.name === `undefined` ? "" : errors.name.message}
          </div>
        </form>
      </div>
    );
  }

  return (
    <main className="flex flex-col relative p-2">
      <Header chars={chars} time={time.currentTime} />
      <GameContent
        chars={chars}
        setChars={setChars}
        score={score}
        setWinner={setWinner}
      />
      {winner && (
        <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <Box children={<GetNameModal time={time} />} />
        </div>
      )}
    </main>
  );
}

export default Game;
