import React, { useState, useContext, useEffect, useMemo } from "react";
import AddExpenses from "../AddExpenses/AddExpenses";
import MyDetails from "../MyDetails/MyDetails";
import cl from "./ExpensesDetails.module.css";
import ExpensesContext from "../../context/ExpensesContext";
import CategoryContext from "../../context/CategoryContext";
import DateContext from "../../context/DateContext";

const ExpensesDetails = (props) => {
  const {
    allExpenses,
    setAllExpenses,
    byDay,
    byDayRef,
    dayExpenses,
    setDayExpenses,
    callback,
    titleCategory,
    setTitleCategory,
    dayTitleCategory,
    // currentDate,
    amount,
    moneyAmount,
    setAllIncome,
    allIncome,
  } = useContext(ExpensesContext);
  const { dateMode, setDateMode, currentDate, setCurrentDate } =
    useContext(DateContext);

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
      .then((data) => setAllIncome(data.answer));
  };

  useEffect(() => {
    byDayRef(currentDate);
  }, [currentDate, allExpenses]);

  useEffect(() => {
    setDayExpenses(0);
  }, [currentDate]);

  useEffect(() => {
    getAllExpenses();
  }, []);
  useEffect(() => {
    getAllIncomes();
  }, []);

  // useEffect(() => {
  //   byDay();
  // }, [allExpenses, allIncome]);

  return (
    <div className={cl.expenses}>
      <div className={cl.expenses__details}>
        <div className={cl.expenses__container}>
          <div className={cl.expenses}>
            <ul>
              {Object.entries(dayTitleCategory).map((item) => {
                return (
                  <MyDetails
                    key={item[1][0].id}
                    money={amount}
                    categoryName={item[0]}
                    items={item[1]}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <AddExpenses position="bottom" category={category}></AddExpenses>
    </div>
  );
};

export default ExpensesDetails;
