import Box from "../../utils/Box";

function Timer({ time }) {
  return <div className="w-[200px] text-xl">Time: {time}</div>;
}

function Icons({ chars }) {
  return (
    <ul className="p-2">
      {chars.map((char: {}) => {
        return (
          <li key={char.name}>
            <img
              src={"/assets/" + char.name + ".png"}
              alt={char.name}
              className={
                "w-[50px] h-[50px]" + (char.found ? " opacity-[.5]" : "")
              }
            />
          </li>
        );
      })}
    </ul>
  );
}

function Header({ chars, time }) {
  return (
    <header className="header text-2xl font-semibold p-3 fixed rounded-lg flex justify-evenly items-center w-screen">
      <div></div>
      {/* <div className="w-[200px] text-xl">Time: {time}</div> */}
      <Box children={<Icons chars={chars} />} />
      <Box children={<Timer time={time} />} />
    </header>
  );
}

export default Header;
