import { act } from "react-dom/test-utils";
import { firestore } from "./config";

const addToDB = async (collection, data) => {
  await firestore.collection(collection).add(data);
};

const updateItemDB = async (collection, document, item, data) => {
  await firestore
    .collection(collection)
    .doc(document)
    .update({
      [item]: data,
    });
};

const updateQuestionDB = async (questionID, answerID, queries, show = true) => {
  await firestore
    .collection("questions")
    .doc(questionID)
    .update({
      queries: {
        ...queries,
        [`option${answerID}`]: { ...queries[`option${answerID}`], show },
      },
    });
};

const reducer = (state, action) => {
  if (action.type === "JOIN_GAME") {
    addToDB("players", { name: action.payload.name, points: 0 });
    console.log("Player joined game:", {
      name: action.payload.name,
      points: 0,
    });
    return {
      ...state,
      player: { ...state.player, name: action.payload.name, isLoggedIn: true },
    };
  }

  if (action.type === "NO_NAME") {
    console.log("no val");
    return {
      ...state,
    };
  }

  if (action.type === "ADMIN") {
    console.log("admin is here fellas");
    return {
      ...state,
      admin: true,
    };
  }

  if (action.type === "ADD_QUESTION") {
    console.log("question added");
    addToDB("questions", action.payload);
    return {
      ...state,
    };
  }

  if (action.type === "NEXT_QUESTION") {
    console.log("next question");
    updateItemDB("questionNum", "number", "number", state.questionNum + 1);
    if (action.payload.questions.length === state.questionNum + 2) {
      return {
        ...state,
        questionLast: true,
      };
    }
    return {
      ...state,
      questionNum: state.questionNum + 1,
    };
  }

  if (action.type === "SHOW_ANSWER") {
    console.log("question id:", action.payload.questionID);
    console.log("question num:", state.questionNum);
    console.log(
      "question queries:",
      action.payload.questions[state.questionNum].queries
    );
    console.log("answer id:", action.payload.answerID);
    updateQuestionDB(
      action.payload.questionID,
      action.payload.answerID,
      action.payload.questions[state.questionNum].queries
    );
    return { ...state };
  }

  if (action.type === "UPDATE_QUESTION") {
    console.log("update question");
    if (action.payload.questionNum + 1 === action.payload.questions.length) {
      var questionLast = true;
    }
    return {
      ...state,
      questionNum: action.payload.questionNum,
      questionLast,
    };
  }
  throw new Error("no matching action type");
};

export { reducer };
