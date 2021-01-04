import React, { useState } from "react";
import { useGlobalContext } from "./context";

const QuestionModal = ({ closeModal, modalType }) => {
  const { addQuestion } = useGlobalContext();
  const questionTemplate = {
    text: "",
    type: modalType,
    queries: {
      option1: { id: 1, given: "", correct: "", show: false },
      option2: { id: 2, given: "", correct: "", show: false },
      option3: { id: 3, given: "", correct: "", show: false },
      option4: { id: 4, given: "", correct: "", show: false },
      option5: { id: 5, given: "", correct: "", show: false },
      option6: { id: 6, given: "", correct: "", show: false },
      option7: { id: 7, given: "", correct: "", show: false },
      option8: { id: 8, given: "", correct: "", show: false },
      option9: { id: 9, given: "", correct: "", show: false },
      option10: { id: 10, given: "", correct: "", show: false },
    },
  };

  const [question, setQuestion] = useState(questionTemplate);

  const handleChange = (e) => {
    if (e.target.name === "questionText") {
      setQuestion((oldQuestion) => {
        const newQuestion = { ...oldQuestion, text: e.target.value };
        return newQuestion;
      });
    } else {
      setQuestion((oldQuestion) => {
        const [option, state] = e.target.name.split(" ");
        const newQuestion = {
          ...oldQuestion,
          queries: {
            ...oldQuestion.queries,
            [option]: {
              ...oldQuestion.queries[option],
              [state]: e.target.value,
            },
          },
        };
        return newQuestion;
      });
    }
  };

  return (
    <section>
      {modalType}
      <form onSubmit={(e) => addQuestion(e, question)}>
        <label>
          <input
            type="text"
            name="questionText"
            placeholder="question text"
            value={question.text}
            onChange={handleChange}
          />
        </label>
        {Object.keys(question.queries).map((option) => (
          <div className="given-answer" key={question.queries[option].id}>
            <label>
              <input
                type="text"
                placeholder={`given ${question.queries[option].id}`}
                name={`${option} given`}
                value={question.queries[option].given}
                onChange={handleChange}
              />
            </label>
            <label>
              <input
                type="text"
                placeholder={`answer ${question.queries[option].id}`}
                name={`${option} correct`}
                value={question.queries[option].correct}
                onChange={handleChange}
              />
            </label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      <button type="button" onClick={closeModal}>
        close
      </button>
    </section>
  );
};

export default QuestionModal;
