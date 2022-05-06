import React, { useState, useContext, useEffect, useMemo } from "react";
import AddExpenses from "../AddExpenses/AddExpenses";
import MyDetails from "../MyDetails/MyDetails";
import cl from "./ExpensesDetails.module.css";
import ExpensesContext from "../../context/ExpensesContext";
import CategoryContext from "../../context/CategoryContext";

const ExpensesDetails = (props) => {
  const {
    allExpenses,
    setAllExpenses,
    byDay,
    callback,
    titleCategory,
    setTitleCategory,
    currentDate,
    moneyAmount,
    setAllIncome,
    allIncome,
  } = useContext(ExpensesContext);

  const { category } = useContext(CategoryContext);

  const userId = sessionStorage.getItem("userId");

  const getAllExpenses = async () => {
    await fetch(`http://localhost:3000/expenses/${userId}`)
      .then((res) => res.json())
      .then((data) => setAllExpenses(data.answer));
  };

  const getAllIncomes = async () => {
    await fetch(`http://localhost:3000/income/${userId}`)
      .then((res) => res.json())
      .then((data) => setAllIncome(data.answer))
      .then((file) => console.log("income = ", file));
  };

  useEffect(() => {
    getAllExpenses();
  }, []);
  useEffect(() => {
    getAllIncomes();
  }, []);

  useEffect(() => {
    byDay();
  }, [allExpenses, allIncome]);

  return (
    <div className={cl.expenses}>
      <div className={cl.expenses__details}>
        <div className={cl.expenses__container}>
          <div className={cl.expenses}>
            <ul>
              {Object.entries(titleCategory).map((item) => {
                return (
                  <MyDetails
                    key={item[1][0].id}
                    money={moneyAmount}
                    categoryName={item[0]}
                    items={item[1]}
                  />
                );
              })}
              {/* {Object.values(titleCategory).map((item) => (
                <h1>{item}</h1>
                // <MyDetails
                //   key={item.toString()}
                //   money={moneyAmount}
                //   categoryName={item}
                // />
              ))} */}
            </ul>
          </div>
        </div>
      </div>
      {/* <AddExpenses position="bottom" category={props.category}></AddExpenses> */}
      <AddExpenses position="bottom" category={category}></AddExpenses>
    </div>
  );
};

export default ExpensesDetails;
