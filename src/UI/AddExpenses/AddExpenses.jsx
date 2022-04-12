import React, { useState, useRef, useEffect } from "react";
import cl from "./AddExpenses.module.css";
import NumPad from "./NumPad/NumPad";

//AddExpenses body
const AddExpenses = (props) => {
  const [menu, setMenu] = useState({ isOpen: false });
  const [toggleButton, setToggleButton] = useState({
    isExpense: true,
    isIncome: false,
  });

  return (
    <div className={`${cl.body} ${menu.isOpen ? cl.open : ""}`}>
      <div className={cl.container}>
        <div className={cl.content}>
          <span
            style={{ textAlign: "center", marginBottom: "20px" }}
            onClick={() => {
              setMenu({ isOpen: !menu.isOpen });
            }}
          >
            open {toggleButton.isExpense ? "true" : "false"}
          </span>

          <div className={cl.category}>
            <button
              className={` ${toggleButton.isExpense ? cl.checkb : ""}`}
              onClick={() => {
                setToggleButton({ isExpense: true, isIncome: false });
              }}
            >
              EXPENSES
            </button>
            <button
              className={` ${toggleButton.isIncome ? cl.checkb : ""}`}
              onClick={() => {
                setToggleButton({ isExpense: false, isIncome: true });
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
