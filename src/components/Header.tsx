import Box from "./Box";

interface charObj {
  name: string;
  found: boolean;
}

function Timer({ time }: { time: string }) {
  return <div className="w-[200px] p-1 text-xl text-center">Time: {time}</div>;
}

function Icons({ chars }: { chars: Array<charObj> }) {
  return (
    <ul className="p-2 flex gap-5 h-[59px] w-[250px] justify-center items-center">
      {chars.map((char: charObj) => {
        return (
          <li
            key={char.name}
            className={char.found ? "border-2 border-red-600" : ""}
          >
            <img
              src={"/assets/" + char.name + ".png"}
              alt={char.name}
              className={"w-[55px] h-[55px]" + (char.found && " opacity-40")}
            />
          </li>
        );
      })}
    </ul>
  );
}

function Header({ chars, time }: { chars: Array<charObj>; time: string }) {
  return (
    <header className="text-2xl font-semibold p-3 fixed rounded-lg grid grid-rows-2 gap-5 justify-items-center lg:grid-cols-2 lg:gap-2 w-screen">
      <Box children={<Icons chars={chars} />} />
      <Box children={<Timer time={time} />} />
    </header>
  );
}

export default Header;
