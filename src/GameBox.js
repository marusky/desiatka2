import React from "react";
import { useGlobalContext } from "./context";
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";
import { GrNext } from "react-icons/gr";

const colorTranslator = {
  biela: ["white", "black"],
  žltá: ["yellow", "black"],
  oranžová: ["orange", "black"],
  červená: ["red", "black"],
  modrá: ["blue", "white"],
  zelená: ["green", "white"],
  ružová: ["pink", "black"],
  purpurová: ["purple", "white"],
  fialová: ["purple", "white"],
  hnedá: ["brown", "white"],
  sivá: ["gray", "white"],
  čierna: ["black", "white"],
  magenta: ["magenta", "white"],
};

const GameBox = () => {
  const {
    questions,
    questionNum,
    questionLast,
    nextQuestion,
    showAnswer,
  } = useGlobalContext();

  const { text, type, queries } = questions[questionNum];
  const questionID = questions[questionNum].id;

  return (
    <div className="flexbox">
      <article className="box">
        <section className="oval">
          <section className="question">{text}</section>
        </section>
        {Object.values(queries)
          .sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))
          .map(({ id: answerID, given, correct, show }, index) => {
            return (
              <div key={answerID}>
                <section
                  className="option"
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
                  className={`answer-circle ${show && "show"}`}
                  style={{
                    transform: `translateX(${
                      290 * Math.sin(((Math.PI * 2) / 10) * index)
                    }px) translateY(${
                      290 * Math.cos(((Math.PI * 2) / 10) * index)
                    }px)`,
                  }}
                  onClick={() => showAnswer(questionID, answerID)}
                >
                  {type === "spravne" && (
                    <p className={`answer-text ${show && "show"}`}>
                      {correct ? (
                        <AiFillCheckCircle className="icon icon-correct" />
                      ) : (
                        <AiFillCloseCircle className="icon icon-incorrect" />
                      )}
                    </p>
                  )}
                  {type === "farba" && (
                    <p
                      className={`answer-text color ${show && "show"}`}
                      style={{
                        backgroundColor: colorTranslator[correct][0],
                        color: colorTranslator[correct][1],
                      }}
                    >
                      {correct}
                    </p>
                  )}
                  {type === "poradie" && (
                    <p className={`answer-text ${show && "show"}`}>{correct}</p>
                  )}
                  {type === "odpoved" && (
                    <p className={`answer-text  ${show && "show"}`}>
                      {correct}
                    </p>
                  )}
                </section>
                <section className={`line line-${answerID}`}></section>
              </div>
            );
          })}
      </article>
      {!questionLast && (
        <button onClick={nextQuestion} className="next-question">
          <GrNext />
        </button>
      )}
    </div>
  );
};

export default GameBox;
