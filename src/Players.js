import React from "react";
import { useGlobalContext } from "./context";

const Players = () => {
  const { players } = useGlobalContext();
  return (
    <div className="players">
      <h4>In Game:</h4>
      {players &&
        players.map((player) => {
          return <section key={player.id}>{player.name}</section>;
        })}
    </div>
  );
};

export default Players;
