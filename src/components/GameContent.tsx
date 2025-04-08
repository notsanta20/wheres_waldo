function GameContent() {
  function handleMouseClick(e: object) {
    const menu = document.querySelector(`.menu`);
    const menuX: number = e.pageX;
    const menuY: number = e.pageY;
    const clickX: number = e.screenX;
    const clickY: number = e.screenY;

    menu.style.display = `flex`;
    menu.style.top = `${menuY - 30}px`;
    menu.style.left = `${menuX - 40}px`;

    menu.addEventListener(`mouseleave`, () => {
      hideMenu(menu);
    });

    console.log(clickX, clickY);
  }

  function hideMenu(item) {
    item.style.display = `none`;
  }

  return (
    <main
      className="flex-1 flex justify-center items-center w-[250%] lg:w-[100%]"
      onClick={(e) => {
        handleMouseClick(e);
      }}
    >
      <div className="">
        <img src="/assets/main.jpg" alt="game art" className="w-full" />
        <div className="h-[300p] menu hidden flex-col items-center gap-3 absolute">
          <div className="w-[4rem] h-[4rem] border-3 border-red-500"></div>
          <div className="flex flex-col gap-2 bg-white rounded-lg p-3">
            <button>CHAR 1</button>
            <button>CHAR 2</button>
            <button>CHAR 3</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default GameContent;
