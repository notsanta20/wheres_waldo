function Header({ chars }) {
  return (
    <header className="header text-2xl font-semibold p-3 fixed rounded-lg flex justify-evenly items-center w-screen bg-black text-white">
      <div>
        <ul>
          {chars.map((char: {}) => {
            return (
              <li key={char.name}>
                <img
                  src={"/assets/" + char.name + ".png"}
                  alt={char.name}
                  className={
                    "w-[75px] h-[75px]" + (char.found ? " opacity-[.5]" : "")
                  }
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div>Timer</div>
    </header>
  );
}

export default Header;
