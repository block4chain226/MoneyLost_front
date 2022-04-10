import React from "react";
import "../styles/App.css";
import MoneyInfo from "../components/MoneyInfo";
import ExpensesDetails from "../components/ExpensesDetails";
import AddExpenses from "../UI/AddExpenses/AddExpenses";
import NumPad from "../UI/AddExpenses/NumPad/NumPad";

const Main = () => {
  return (
    <div className="wrapper">
      <section className="header">
        <div className="header__container">
          <MoneyInfo />
        </div>
      </section>
      <section className="main">
        <div className="expenses">
          <div className="expenses__details">
            <div className="expenses__container">
              <ExpensesDetails />
            </div>
          </div>

          <div className="expenses__add-expenses">
            {/* <AddExpenses></AddExpenses> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;
