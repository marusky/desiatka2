import React, { useState } from "react";
import { useGlobalContext } from "./context";
import { FaBars } from "react-icons/fa";

const Players = () => {
  const { players, changeScore } = useGlobalContext();
  const [isScoreOpen, setIsScoreOpen] = useState(false);
  return (
    <div>
      <div className="openPoints" onClick={() => setIsScoreOpen(!isScoreOpen)}>
        <FaBars />
      </div>
      <div className={isScoreOpen ? "players show" : "players"}>
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
    </div>
  );
};

export default Players;
