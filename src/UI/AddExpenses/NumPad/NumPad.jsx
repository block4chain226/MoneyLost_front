import React, { useState } from "react";
import MyButton from "../../MyButton/MyButton";
import MyInput from "../Input/MyInput";
import cl from "./NumPad.module.css";

const NumPad = () => {
  let [amount, setAmount] = useState("");

  function deleteChar() {
    if (amount) {
      setAmount(amount.split("").slice(0, -1).join(""));
    }
  }

  return (
    <div className={cl.numpad}>
      <MyInput
        value={amount}
        className=""
        type="text"
        onChange={(event) => {
          setAmount(event.target.value);
        }}
      />
      <div className={cl.numpadrow}>
        <button
          value={1}
          type="text"
          onClick={(event) => {
            setAmount((amount += event.target.value));
          }}
        >
          1
        </button>
        <button
          value={2}
          type="text"
          onClick={(event) => {
            setAmount((amount += event.target.value));
          }}
        >
          2
        </button>
        <button
          value={3}
          type="text"
          onClick={(event) => {
            setAmount((amount += event.target.value));
          }}
        >
          3
        </button>
      </div>
      <div className={cl.numpadrow}>
        <button
          value={4}
          type="text"
          onClick={(event) => {
            setAmount((amount += event.target.value));
          }}
        >
          4
        </button>
        <button
          value={5}
          type="text"
          onClick={(event) => {
            setAmount((amount += event.target.value));
          }}
        >
          5
        </button>
        <button
          value={6}
          type="text"
          onClick={(event) => {
            setAmount((amount += event.target.value));
          }}
        >
          6
        </button>
      </div>
      <div className={cl.numpadrow}>
        <button
          value={7}
          type="text"
          onClick={(event) => {
            setAmount((amount += event.target.value));
          }}
        >
          7
        </button>
        <button
          value={8}
          type="text"
          onClick={(event) => {
            setAmount((amount += event.target.value));
          }}
        >
          8
        </button>
        <button
          value={9}
          type="text"
          onClick={(event) => {
            setAmount((amount += event.target.value));
          }}
        >
          9
        </button>
      </div>
      <div className={cl.numpadrow}>
        <button
          value={"."}
          type="text"
          onClick={(event) => {
            setAmount((amount += event.target.value));
          }}
        >
          .
        </button>
        <button
          value={0}
          type="text"
          onClick={(event) => {
            setAmount((amount += event.target.value));
          }}
        >
          0
        </button>
        <button type="text" onClick={deleteChar}>
          delete
        </button>
      </div>
      <MyButton type="submit">submit</MyButton>
    </div>
  );
};

export default NumPad;
