import React, { useState } from "react";
import cl from "./SwitchButton.module.css";

const SwitchButton = () => {
  const [toggleButton, setToggleButton] = useState({
    isExpense: true,
    isIncome: false,
  });

  return (
    <div className={cl.switch}>
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
  );
};

export default SwitchButton;
