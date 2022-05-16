import React, { useState, useContext, useEffect, useMemo } from "react";
import AddExpenses from "../AddExpenses/AddExpenses";
import MyDetails from "../MyDetails/MyDetails";
import cl from "./ExpensesDetails.module.css";
import ExpensesContext from "../../context/ExpensesContext";
import CategoryContext from "../../context/CategoryContext";
import DateContext from "../../context/DateContext";
import IncomeContext from "../../context/IncomeContext";

const ExpensesDetails = (props) => {
  const {
    allExpenses,
    setAllExpenses,
    byDay,
    byDayRef,
    byMonthRef,
    month,
    dayExpenses,
    setDayExpenses,
    setMonthExpenses,
    titleCategory,
    setTitleCategory,
    dayTitleCategory,
    amount,
    moneyAmount,
    setYearExpenses,
    currentYear,
    monthTitleCategory,
  } = useContext(ExpensesContext);
  const { dateMode, setDateMode, currentMonth, currentDate, setCurrentDate } =
    useContext(DateContext);

  const { category } = useContext(CategoryContext);

  const userId = sessionStorage.getItem("userId");

  const getAllExpenses = async () => {
    await fetch(`http://localhost:3000/expenses/${userId}`)
      .then((res) => res.json())
      .then((data) => setAllExpenses(data.answer));
  };

  useEffect(() => {
    setDayExpenses(0);
  }, [currentDate, dateMode]);

  useEffect(() => {
    setMonthExpenses(0);
  }, [currentMonth, dateMode]);

  useEffect(() => {
    setYearExpenses(0);
  }, [currentYear, dateMode]);

  useEffect(() => {
    byDayRef(currentDate);
  }, [currentDate, dateMode, allExpenses]);

  useEffect(() => {
    byMonthRef();
  }, [currentMonth, dateMode, allExpenses]);

  useEffect(() => {
    getAllExpenses();
  }, []);

  return (
    <div className={cl.expenses}>
      <div className={cl.expenses__details}>
        <div className={cl.expenses__container}>
          <div className={cl.expenses}>
            <ul>
              {Object.entries(
                dateMode.day ? dayTitleCategory : monthTitleCategory
              ).map((item) => {
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
