import React, { useContext, useReducer, useEffect } from "react";
import { reducer } from "./reducer";
import Loading from "./Loading";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { firestore } from "./config";

const AppContext = React.createContext();

const defaultState = {
  admin: false,
  player: {
    name: "",
    isLoggedIn: false,
    points: 0,
  },
  players: [],
  questions: [],
  questionNum: 0,
  questionLast: false,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const playersRef = firestore.collection("players");
  const playersQuery = playersRef.orderBy("name");
  const [players, loadingP, errorP] = useCollectionData(playersQuery, {
    idField: "id",
  });

  const questionsRef = firestore.collection("questions");
  const questionsQuery = questionsRef;
  const [questions, loadingQ, errorQ] = useCollectionData(questionsQuery, {
    idField: "id",
  });

  const questionNumRef = firestore.doc("questionNum/number");
  const [questionObj, loadingN, errorN] = useDocumentData(questionNumRef);

  const handleSubmit = async (e, name) => {
    e.preventDefault();
    console.log("submit name:", name);
    console.log(name === "admin");
    if (name === "admin") {
      dispatch({ type: "ADMIN" });
    } else if (name) {
      dispatch({ type: "JOIN_GAME", payload: { name } });
    } else {
      dispatch({ type: "NO_NAME" });
    }
  };

  const addQuestion = (e, question) => {
    e.preventDefault();
    console.log("add question:", question);
    console.log(e);
    dispatch({ type: "ADD_QUESTION", payload: question });
  };

  const nextQuestion = () => {
    dispatch({
      type: "NEXT_QUESTION",
      payload: { questions, questionNum: state.questionNum },
    });
  };

  const showAnswer = (questionID, answerID) => {
    dispatch({
      type: "SHOW_ANSWER",
      payload: { questionID, answerID, questions },
    });
  };

  if (loadingP || loadingQ || loadingN) {
    return (
      <AppContext.Provider value={{}}>
        <Loading />
      </AppContext.Provider>
    );
  } else {
    const questionNum = questionObj.number;
    if (questionNum !== state.questionNum) {
      dispatch({
        type: "UPDATE_QUESTION",
        payload: { questionNum, questions },
      });
    }

    return (
      <AppContext.Provider
        value={{
          ...state,
          players,
          errorP,
          errorQ,
          errorN,
          loadingP,
          loadingQ,
          loadingN,
          questions,
          questionNum,
          showAnswer,
          handleSubmit,
          addQuestion,
          nextQuestion,
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext, reducer };
