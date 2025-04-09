import { useState } from "react";
import axios from "axios";
import alert from "../../utils/alert";

function GameContent({ chars, setChars }: { chars: {} }) {
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
    menu.style.left = `${e.pageX - 60}px`;

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
          alert(res.data.message);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <main className="flex-1 flex justify-center items-center w-[250%] lg:w-[100vw]">
      <img
        src="/assets/main.jpg"
        alt="game art"
        className="w-full h-auto"
        onClick={(e) => {
          handleMouseClick(e);
        }}
      />
      <div className="h-[300p] menu hidden flex-col items-center gap-3 absolute">
        <div className="w-[4rem] h-[4rem] border-3 border-red-500"></div>
        <div className="flex flex-col gap-2 bg-white rounded-lg p-3">
          {chars.map((char) => {
            if (!char.found) {
              return (
                <button
                  key={char.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    checkCoords(coord.x, coord.y, char.name);
                  }}
                >
                  {char.name}
                </button>
              );
            }
          })}
        </div>
      </div>
    </main>
  );
}

export default GameContent;
