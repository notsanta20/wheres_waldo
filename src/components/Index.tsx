import { Link } from "react-router";
import Box from "../../utils/Box";

function Index() {
  function Home() {
    return (
      <div className="flex flex-col justify-center items-center gap-5 p-5">
        <h1 className="font-semibold text-3xl">Find Where's Waldo</h1>
        <div className="text-2xl flex items-center gap-2">
          <button className="bg-gray-600 py-2 px-3 rounded-lg hover:bg-gray-700">
            <Link to={`/game`}>Start Game</Link>
          </button>
          <button className="bg-gray-600 py-2 px-3 rounded-lg hover:bg-gray-700">
            <Link to={`/leaderboard`}>LeaderBoard</Link>
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="">
      <div className="bg-[url(/assets/main.jpg)] blur-xs h-screen"></div>
      <div className="fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
        <Box children={<Home />} />
      </div>
    </main>
  );
}

export default Index;
