import Box from "../../utils/Box";

function Timer({ time }) {
  return <div className="w-[200px] p-1 text-xl">Time: {time}</div>;
}

function Icons({ chars }) {
  return (
    <ul className="p-2 flex gap-5 h-[59px] w-[250px] justify-center items-center">
      {chars.map((char: {}) => {
        return (
          <li
            key={char.name}
            className={char.found && "border-2 border-red-600"}
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

function Header({ chars, time }) {
  return (
    <header className="header text-2xl font-semibold p-3 fixed rounded-lg grid grid-cols-2 justify-items-center w-screen">
      <Box children={<Icons chars={chars} />} />
      <Box children={<Timer time={time} />} />
    </header>
  );
}

export default Header;
