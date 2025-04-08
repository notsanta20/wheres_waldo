import { Link } from "react-router";

function Index() {
  return (
    <main className="flex justify-center items-center h-screen">
      <section className="flex flex-col justify-center items-center gap-5">
        <h1 className="font-semibold text-3xl">Find Where's Waldo</h1>
        <div className="text-2xl flex items-center gap-2">
          <button className="bg-gray-100 py-2 px-3 rounded-lg">
            <Link to={`/game`}>Start Game</Link>
          </button>
          <button className="bg-gray-100 py-2 px-3 rounded-lg">
            <Link to={`/leaderboard`}>LeaderBoard</Link>
          </button>
        </div>
      </section>
    </main>
  );
}

export default Index;
