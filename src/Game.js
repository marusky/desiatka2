import React from "react";
import GameBox from "./GameBox";
import Players from "./Players";
import { useGlobalContext } from "./context";
import { RiLogoutCircleLine } from "react-icons/ri";

const Game = () => {
  const { logout } = useGlobalContext();
  return (
    <div>
      <button onClick={logout} className="logout-btn">
        <RiLogoutCircleLine />
      </button>
      <GameBox />
      <Players />
    </div>
  );
};

export default Game;
