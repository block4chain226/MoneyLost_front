import React, { useState, useContext, useEffect, useMemo } from "react";
import AddExpenses from "../AddExpenses/AddExpenses";
import MyDetails from "../MyDetails/MyDetails";
import cl from "./ExpensesDetails.module.css";
import ExpensesContext from "../../context/ExpensesContext";
import CategoryContext from "../../context/CategoryContext";
import DateContext from "../../context/DateContext";

const ExpensesDetails = (props) => {
  const {
    setAllExpenses,
    setDayExpenses,
    setMonthExpenses,
    dayTitleCategory,
    amount,
    setYearExpenses,
    monthTitleCategory,
    yearTitleCategory,
  } = useContext(ExpensesContext);
  const { dateMode, currentMonth, currentDate, currentYear } =
    useContext(DateContext);

  const { category } = useContext(CategoryContext);
  const [title, setTitle] = useState({});
  const userId = sessionStorage.getItem("userId");

  const getAllExpenses = async () => {
    await fetch(`http://localhost:3000/expenses/${userId}`)
      .then((res) => res.json())
      .then((data) => setAllExpenses(data.answer));
  };

  useEffect(() => {
    if (dateMode.day) {
      setDayExpenses(0);
    }
  }, [currentDate, dateMode]);

  useEffect(() => {
    if (dateMode.month) {
      setMonthExpenses(0);
    }
  }, [currentMonth, dateMode]);

  useEffect(() => {
    if (dateMode.year) {
      setYearExpenses(0);
    }
  }, [currentYear, dateMode]);

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
                dateMode.day
                  ? dayTitleCategory
                  : dateMode.month
                  ? monthTitleCategory
                  : yearTitleCategory
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
