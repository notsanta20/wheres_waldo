import React from "react";

interface charObj {
  name: string;
  found: boolean;
}

interface coords {
  x: number;
  y: number;
}

function PopUpMenu({
  chars,
  checkCoords,
  coord,
}: {
  chars: Array<charObj>;
  checkCoords: Function;
  coord: coords;
}) {
  return (
    <ul>
      {chars.map((char) => {
        if (!char.found) {
          return (
            <li
              key={char.name}
              onClick={(e) => {
                e.stopPropagation();
                checkCoords(coord.x, coord.y, char.name);
              }}
              className="flex gap-2 items-center cursor-pointer hover:bg-white/50 p-2"
            >
              <span className="flex-1 text-left">{char.name}</span>
              <img
                src={"/assets/" + char.name + ".png"}
                alt={char.name}
                className="w-[45px] h-[45px]"
              />
            </li>
          );
        }
      })}
    </ul>
  );
}

export default PopUpMenu;
