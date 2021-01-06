import React, { useState } from "react";
import { useGlobalContext } from "./context";

const Form = () => {
  const { handleSubmit } = useGlobalContext();
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <section className="center">
      <form onSubmit={(e) => handleSubmit(e, name)} className="neomorph">
        <div className="segment">
          <h1>Dvadsiatka</h1>
        </div>
        <label>
          <input
            type="text"
            placeholder="username"
            value={name}
            onChange={handleChange}
          />
        </label>
        <button type="submit">join</button>
      </form>
    </section>
  );
};

export default Form;
