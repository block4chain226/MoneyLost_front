import React, { useState, useRef, useEffect } from "react";
import cl from "./AddExpenses.module.css";
import NumPad from "./NumPad/NumPad";

//AddExpenses body
const AddExpenses = () => {
  //toggle expenses or income
  function changeChecked(st) {
    let state;
    return function () {
      state = st;
      console.log(state);
    };
  }
  function toggleMode(st) {
    const change = changeChecked(st);
    return change();
  }

  return (
    <div
      className={cl.body}
      onClick={(event) => {
        // event.stopPropagation();
        event.target.parentElement.parentElement.parentElement.parentElement.classList.toggle(
          cl.open
        );
      }}
    >
      <div className={cl.container}>
        <div className={cl.content}>
          <span style={{ textAlign: "center" }}>open</span>
          <div className={cl.category}>
            <button
              className={cl.checkb}
              onClick={() => {
                toggleMode("expense");
              }}
            >
              EXPENSES
            </button>
            <button
              className={cl.checkb}
              onClick={() => {
                toggleMode("income");
              }}
            >
              INCOME
            </button>
          </div>

          <NumPad />
        </div>
      </div>
    </div>
  );
};

export default AddExpenses;
