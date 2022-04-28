import React, { useState, useContext, useEffect, useMemo } from "react";
import AddExpenses from "../AddExpenses/AddExpenses";

import MyDetails from "../MyDetails/MyDetails";
import cl from "./ExpensesDetails.module.css";
import ExpensesContext from "../../context/ExpensesContext";

const ExpensesDetails = (props) => {
  const {
    allExpenses,
    setAllExpenses,
    byDay,
    callback,
    titleCategory,
    setTitleCategory,
    moneyAmount,
  } = useContext(ExpensesContext);

  const userId = sessionStorage.getItem("userId");

  const getAllExpenses = async () => {
    await fetch(`http://localhost:3000/expenses/${userId}`)
      .then((res) => res.json())
      .then((data) => setAllExpenses(data.answer));
  };

  useEffect(() => {
    getAllExpenses();
  }, []);

  useEffect(() => {
    byDay();
  }, [titleCategory]);
  // debugger;

  return (
    <div className={cl.expenses}>
      <div className={cl.expenses__details}>
        <div className={cl.expenses__container}>
          <div className={cl.expenses}>
            <ul>
              {titleCategory.map((item) => (
                <MyDetails
                  key={item.toString()}
                  money={moneyAmount}
                  categoryName={item}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
      <AddExpenses position="bottom" category={props.category}></AddExpenses>
    </div>
  );
};

export default ExpensesDetails;
