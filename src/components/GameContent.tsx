import { useState } from "react";
import axios from "axios";
import alert from "../../utils/alert";
import Box from "../../utils/Box";
import PopUpMenu from "../../utils/PopUpMenu";

function GameContent({
  chars,
  setChars,
  score,
  setWinner,
}: {
  chars: {};
  setChars: Function;
  score: number;
  setWinner: Function;
}) {
  const [coord, setCoord] = useState({
    x: 0,
    y: 0,
  });

  function handleMouseClick(e: React.ChangeEvent<HTMLInputElement>) {
    const menu: HTMLElement | null = document.querySelector(`.menu`);
    const { offsetX, offsetY } = e.nativeEvent;

    const clickCoords = {
      x: Math.round((offsetX / e.target.width) * 1920),
      y: Math.round((offsetY / e.target.height) * 3858),
    };

    menu.style.display = `flex`;
    menu.style.top = `${e.pageY - 32}px`;
    menu.style.left = `${e.pageX - 93}px`;

    menu.addEventListener(`mouseleave`, () => {
      hideMenu(menu);
    });

    setCoord(clickCoords);
  }

  function hideMenu(item) {
    item.style.display = `none`;
  }

  function checkCoords(x: number, y: number, char: string) {
    const baseURL = import.meta.env.VITE_LOCAL_URL;
    const menu = document.querySelector(`.menu`);
    hideMenu(menu);

    axios
      .get(`${baseURL}/checkCoord?x=${x}&y=${y}&char=${char}`)
      .then((res) => {
        if (res.data.found) {
          setChars(
            chars.map((c) => {
              if (c.name === char) {
                return { ...c, found: true };
              } else {
                return c;
              }
            })
          );
          score.current += 1;
          alert(res.data.message);
          if (score.current === 3) {
            setWinner(true);
          }
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <main className="flex-1 flex justify-center items-center overflow-scroll">
      <img
        src="/assets/main.jpg"
        alt="game art"
        className="w-[2500px] lg:w-full h-auto"
        onClick={(e) => {
          handleMouseClick(e);
        }}
      />
      <div className="h-[300p] menu hidden flex-col items-center gap-3 absolute">
        <div className="w-[4rem] h-[4rem] border-3 border-red-500"></div>
        <Box
          children={
            <PopUpMenu chars={chars} checkCoords={checkCoords} coord={coord} />
          }
        />
      </div>
    </main>
  );
}

export default GameContent;
