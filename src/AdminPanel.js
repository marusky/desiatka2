import React, { useState } from "react";
import QuestionModal from "./QuestionModal";

const buttons = [
  {
    id: 1,
    text: "spravne",
  },
  {
    id: 2,
    text: "poradie",
  },
  {
    id: 3,
    text: "farba",
  },
  {
    id: 4,
    text: "odpoved",
  },
];

const AdminPanel = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const openModal = (text) => {
    setShowModal(true);
    setModalType(text);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <main>
      <section className="buttons">
        {buttons.map(({ id, text }) => (
          <button key={id} onClick={() => openModal(text)}>
            {text}
          </button>
        ))}
      </section>
      {showModal && (
        <QuestionModal closeModal={closeModal} modalType={modalType} />
      )}
    </main>
  );
};

export default AdminPanel;
