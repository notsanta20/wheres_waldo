import { Routes, Route } from "react-router";
import Index from "./components/Index";
import Game from "./components/Game";
import LeaderBoard from "./components/LeaderBoard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/game" element={<Game />} />
      <Route path="/leaderBoard" element={<LeaderBoard />} />
    </Routes>
  );
}

export default App;
