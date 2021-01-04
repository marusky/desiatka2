import React from "react";
import { useGlobalContext } from "./context";

const Players = () => {
  const { players, changeScore } = useGlobalContext();
  return (
    <div className="players">
      <h4>In Game:</h4>
      {players &&
        players.map((player) => {
          return (
            <section key={player.id} className="player">
              {player.name}
              <div className="segment">
                <button
                  className="unit"
                  onClick={() => changeScore(-1, player.name)}
                >
                  -
                </button>
                {player.points}
                <button
                  className="unit"
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
