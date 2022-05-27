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
    setDayExpenses,
    setMonthExpenses,
    dayTitleCategory,
    amount,

    // byDayRef,
    setDayTitleCategory,
    setYearExpenses,
    monthTitleCategory,
    yearTitleCategory,
    setMonthTitleCategory,
    setYearTitleCategory,
  } = useContext(ExpensesContext);
  const { dateMode, currentMonth, currentDate, currentYear } =
    useContext(DateContext);

  const { category } = useContext(CategoryContext);
  const userId = sessionStorage.getItem("userId");

  const getAllExpenses = async () => {
    await fetch(`http://localhost:3000/expenses/${userId}`)
      .then((res) => res.json())
      .then((data) => setAllExpenses(data.answer));
  };

  function byDayRef(date) {
    const cat = {};

    allExpenses.forEach((element) => {
      if (
        new Date(element.date).getTime() ===
        new Date(currentDate.toLocaleDateString("en-US")).getTime()
      ) {
        if (!cat[element.category]) {
          cat[element.category] = [element];
        } else {
          cat[element.category].push(element);
        }
      }
    });

    setDayTitleCategory(cat);
  }

  function byMonthRef(month = currentMonth) {
    const curYear = new Date(
      currentMonth.toLocaleDateString("en-US")
    ).getFullYear();
    const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const lastDayOfMonth = new Date(
      month.getFullYear(),
      month.getMonth() + 1,
      0
    );
    const cat = {};
    allExpenses.forEach((element) => {
      if (
        new Date(element.date).getTime() >=
          new Date(firstDayOfMonth).getTime() &&
        new Date(element.date).getTime() <=
          new Date(lastDayOfMonth).getTime() &&
        new Date(element.date).getFullYear() === curYear
      ) {
        if (!cat[element.category]) {
          cat[element.category] = [element];
        } else {
          cat[element.category].push(element);
        }
      }
    });

    setMonthTitleCategory(cat);
  }

  function byYearRef() {
    const cat = {};

    allExpenses.forEach((element) => {
      if (
        new Date(element.date).getTime() >=
          new Date(new Date(currentYear.getFullYear(), 0, 1)).getTime() &&
        new Date(element.date).getTime() <=
          new Date(new Date(currentYear.getFullYear(), 11, 31)).getTime()
      ) {
        if (!cat[element.category]) {
          cat[element.category] = [element];
        } else {
          cat[element.category].push(element);
        }
      }
    });

    setYearTitleCategory(cat);
  }

  useEffect(() => {
    if (dateMode.month) {
      byMonthRef();
    }
  }, [currentMonth, dateMode, allExpenses]);

  useEffect(() => {
    if (dateMode.year) {
      byYearRef();
    }
  }, [currentYear, dateMode, allExpenses]);

  useEffect(() => {
    if (dateMode.day) {
      byDayRef(currentDate);
    }
  }, [currentDate, dateMode, allExpenses]);

  // ////////////////////////////////////
  // useEffect(() => {
  //   byDayRef(currentDate);
  // }, [allExpenses]);

  // useEffect(() => {
  //   byMonthRef(currentMonth);
  // }, [allExpenses]);

  // useEffect(() => {
  //   byYearRef(currentMonth);
  // }, [allExpenses]);
  // ///////////////////////////////////
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
    <>
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
      </div>
    </>
  );
};

export default ExpensesDetails;
