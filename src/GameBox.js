import React, { useState } from "react";
import { useGlobalContext } from "./context";
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";

const colorTranslator = {
  biela: ["white", "black"],
  žltá: ["yellow", "black"],
  oranžová: ["orange", "black"],
  červená: ["red", "black"],
  modrá: ["blue", "white"],
  zelená: ["green", "white"],
  ružová: ["pink", "black"],
  fialová: ["purple", "white"],
  hnedá: ["brown", "white"],
  sivá: ["gray", "white"],
  čierna: ["black", "white"],
};

const GameBox = () => {
  const {
    questions,
    questionNum,
    questionLast,
    nextQuestion,
    showAnswer,
  } = useGlobalContext();

  //   TODO nech posielam rovno cislo a nie taketo blbosti
  const { text, type, queries } = questions[questionNum];
  console.log(questionNum);
  return (
    <div className="flexbox">
      <article className="box">
        <section className="oval">
          <section className="question">{text}</section>
        </section>
        {Object.values(queries).map(({ id, given, correct }, index) => {
          return (
            <>
              <section
                key={id}
                className={`option`}
                style={{
                  transform: `translateX(${
                    170 * Math.sin(((Math.PI * 2) / 10) * index)
                  }px) translateY(${
                    170 * Math.cos(((Math.PI * 2) / 10) * index)
                  }px)`,
                }}
              >
                {given}
              </section>
              <section
                key={100 + id}
                className={`answer-circle`}
                style={{
                  transform: `translateX(${
                    290 * Math.sin(((Math.PI * 2) / 10) * index)
                  }px) translateY(${
                    290 * Math.cos(((Math.PI * 2) / 10) * index)
                  }px)`,
                }}
                // onClick={() => showAnswer(id)}
              >
                {type === "spravne" && (
                  <p className="answer-text">
                    {correct ? (
                      <AiFillCheckCircle className="icon icon-correct" />
                    ) : (
                      <AiFillCloseCircle className="icon icon-incorrect" />
                    )}
                  </p>
                )}
                {type === "farba" && (
                  <p
                    className="answer-text color"
                    style={{
                      backgroundColor: colorTranslator[correct][0],
                      color: colorTranslator[correct][1],
                    }}
                  >
                    {correct}
                  </p>
                )}
              </section>
            </>
          );
        })}
      </article>
      {!questionLast && (
        <button onClick={nextQuestion} className="next-question">
          Next Question ({questionNum + 2}.) {questionLast}
        </button>
      )}
    </div>
  );
};

export default GameBox;
