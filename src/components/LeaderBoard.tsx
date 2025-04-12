import Box from "./Box";
import { useEffect, useState } from "react";
import axios from "axios";

interface data {
  id: string;
  player: string;
  timeTaken: string;
}

function LeaderBoard() {
  const [data, setData] = useState<Array<data> | null>(null);

  useEffect(() => {
    const baseURL: string = import.meta.env.VITE_HOST_URL;
    axios
      .get(`${baseURL}/leaderBoard`)
      .then((res) => {
        setData(res.data.users);
      })
      .catch(() => {
        return;
      });
  }, []);

  function LeaderBoard() {
    if (data) {
      return (
        <div className="w-[80vw] lg:w-[50vw] h-[60vh] overflow-scroll p-3">
          <h1 className="p-2 text-2xl lg:text-3xl font-bold text-center">
            LeaderBoard
          </h1>
          <ul className="flex flex-col gap-2">
            <li className="flex gap-5 text-amber-400 rounded-lg p-2 text-2xl font-semibold">
              <div className="flex-1">Player Name</div>
              <div>Time</div>
            </li>
            {data.map((d: data) => (
              <li className="flex gap-5 p-2 font-medium" key={d.id}>
                <div className="flex-1">{d.player}</div>
                <div>{d.timeTaken}</div>
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return (
        <div className="w-[50vw] h-[60vh] flex justify-center items-center text-2xl">
          Loading ...
        </div>
      );
    }
  }

  return (
    <main>
      <div className="bg-[url(/assets/main.jpg)] blur-xs h-screen"></div>
      <div className="fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
        <Box children={<LeaderBoard />} />
      </div>
    </main>
  );
}

export default LeaderBoard;
