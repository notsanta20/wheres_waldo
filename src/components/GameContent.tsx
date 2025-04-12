import { useState } from "react";
import axios from "axios";
import alert from "../../utils/alert";
import Box from "./Box";
import PopUpMenu from "./PopUpMenu";

interface charObj {
  name: string;
  found: boolean;
}

interface coords {
  x: number;
  y: number;
}

interface myEvent extends EventTarget {
  width: number;
  height: number;
}

function GameContent({
  chars,
  setChars,
  score,
  setWinner,
}: {
  chars: Array<charObj>;
  setChars: Function;
  score: React.RefObject<number>;
  setWinner: Function;
}) {
  const [coord, setCoord] = useState<coords>({
    x: 0,
    y: 0,
  });

  function handleMouseClick(e: React.MouseEvent) {
    const menu: HTMLDivElement | null = document.querySelector(`.menu`);
    const { offsetX, offsetY } = e.nativeEvent;
    const target = e.target as myEvent;
    let targetWidth: number = target.width;
    let targetHeight: number = target.height;

    const clickCoords = {
      x: Math.round((offsetX / targetWidth) * 1920),
      y: Math.round((offsetY / targetHeight) * 3858),
    };

    if (menu) {
      menu.style.display = `flex`;
      menu.style.top = `${e.pageY - 32}px`;
      menu.style.left = `${e.pageX - 93}px`;

      menu.addEventListener(`mouseleave`, () => {
        hideMenu(menu);
      });
    }

    setCoord(clickCoords);
  }

  function hideMenu(item: HTMLDivElement | null) {
    if (item) {
      item.style.display = `none`;
    }
  }

  function checkCoords(x: number, y: number, char: string) {
    const baseURL: string = import.meta.env.VITE_HOST_URL;
    const menu: HTMLDivElement | null = document.querySelector(`.menu`);

    if (menu) {
      hideMenu(menu);
    }

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
    <main className="flex-1 flex justify-center items-center overflow-scroll w-[250vw] lg:w-[100vw]">
      <img
        src="/assets/main.jpg"
        alt="game art"
        className=""
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
