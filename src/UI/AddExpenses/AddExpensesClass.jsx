import { render } from "@testing-library/react";
import React, { useState, useRef, useEffect } from "react";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";
import cl from "./AddExpenses.module.css";
import NumPad from "./NumPad/NumPad";

//AddExpenses body
class AddExpensesClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: { isOpen: false },
      toggleButton: { isExpense: true, isIncome: false },
    };
  }

  //   const [menu, setMenu] = useState({ isOpen: false });
  // const [toggleButton, setToggleButton] = useState({
  //   isExpense: "",
  //   isIncome: "",
  // });
  //   const [toggleButton, setToggleButton] = useState({
  //     isExpense: true,
  //     isIncome: false,
  //   });

  //toggle expenses or income
  changeChecked(st) {
    let state;
    return function () {
      state = st;
      console.log(state);
      return state;
    };
  }
  toggleMode(st) {
    const change = this.changeChecked(st);
    return change();
  }
  render() {
    return (
      <div className={`${cl.body} ${this.state.menu.isOpen ? cl.open : ""}`}>
        <div className={cl.container}>
          <div className={cl.content}>
            <span
              style={{ textAlign: "center", marginBottom: "20px" }}
              onClick={() => {
                this.state.menu({ isOpen: !this.menu.isOpen });
              }}
            >
              open
            </span>

            <div className={cl.category}>
              <button
                className={` ${
                  this.state.toggleButton.isExpense ? cl.checkb : ""
                }`}
                onClick={() => {
                  this.state.toggleButton({ isExpense: true, isIncome: false });
                  console.log(
                    "expense=" + this.toggleButton.isExpense,
                    "income=" + this.toggleButton.isIncome
                  );
                  this.toggleMode("expense");
                }}
              >
                EXPENSES
              </button>
              <button
                className={` ${
                  this.state.toggleButton.isIncome ? cl.checkb : ""
                }`}
                onClick={() => {
                  this.toggleMode("income");

                  this.state.toggleButton({ isExpense: false, isIncome: true });
                  console.log(
                    "expense=" + this.toggleButton.isExpense,
                    "income=" + this.toggleButton.isIncome
                  );
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
  }
}

export default AddExpensesClass;
