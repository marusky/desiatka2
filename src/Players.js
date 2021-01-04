import React from "react";
import { useGlobalContext } from "./context";

const Players = () => {
  const { players, changeScore } = useGlobalContext();
  return (
    <div className="players">
      {players &&
        players.map((player) => {
          return (
            <section key={player.id} className="player">
              <h3>{player.name}</h3>
              <div className="player-score">
                <button
                  className="unit minus"
                  onClick={() => changeScore(-1, player.name)}
                >
                  -
                </button>
                {player.points}
                <button
                  className="unit plus"
                  onClick={() => changeScore(1, player.name)}
                >
                  +
                </button>
              </div>
            </section>
          );
        })}
    </div>
  );
};

export default Players;
