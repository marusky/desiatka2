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
    console.log("show answer, id:", action.payload.id);
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
