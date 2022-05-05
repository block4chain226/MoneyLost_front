import React, { useContext, useEffect, useState } from "react";
import cl from "./Category.module.css";
import MyButton from "../MyButton/MyButton";
import ExpensesContext from "../../context/ExpensesContext";

const Category = (props) => {
  const { amount, setAmount, setCategoryName, addNewExpense, expenseId } =
    useContext(ExpensesContext);
  const {
    titleCategory,
    setTitleCategory,
    allExpenses,
    setAllExpenses,
    currentDate,
    setMoneyAmount,
  } = useContext(ExpensesContext);

  const postNewExpense = (categor) => {
    setCategoryName(categor);
    addNewExpense(categor);
    updateAllExpenses(categor);
    displayNewExpense(categor);
    setMoneyAmount(amount);
    props.toggleMenu();
    props.showCategory(false);
    setAmount("");
  };

  const updateAllExpenses = (categor) => {
    if (Object.keys(titleCategory).length !== 0) {
      const cat = {};
      const newExpense = {
        id: expenseId,
        category: categor,
        date: currentDate.toLocaleDateString("en-US"),
        moneyAmount: +amount,
      };
      Object.entries(titleCategory).map((element) => {
        console.log("ele", element);
        if (element[0] === categor) {
          cat[element[0]] = element;
          setTitleCategory(
            titleCategory,
            titleCategory[categor].push(newExpense)
          );
          if (JSON.parse(sessionStorage.getItem("tC") !== null)) {
            let expenses = JSON.parse(sessionStorage.getItem("tC"));
            expenses.push(newExpense);
            console.log("exp=", expenses);
            sessionStorage.setItem("tC", JSON.stringify(expenses));
          } else {
            let expenses = [];
            expenses.push(newExpense);
            sessionStorage.setItem("tC", JSON.stringify(expenses));
          }
        }
      });
    }
  };

  const displayNewExpense = (categor) => {
    const cat = {};
    if (!titleCategory.hasOwnProperty(categor)) {
      const newExpense = {
        id: expenseId,
        category: categor,
        date: currentDate.toLocaleDateString("en-US"),
        moneyAmount: +amount,
      };
      cat[categor] = [];
      titleCategory[categor] = [];
      setTitleCategory(titleCategory, titleCategory[categor].push(newExpense));
      if (JSON.parse(sessionStorage.getItem("tC") !== null)) {
        let expenses = JSON.parse(sessionStorage.getItem("tC"));
        expenses.push(newExpense);
        console.log("exp=", expenses);
        sessionStorage.setItem("tC", JSON.stringify(expenses));
      } else {
        let expenses = [];
        expenses.push(newExpense);
        sessionStorage.setItem("tC", JSON.stringify(expenses));
      }
    }
  };

  return (
    <div className={cl.category}>
      <MyButton onClick={() => props.showCategory(false)}>Back</MyButton>
      <div className={cl.category__container}>
        {props.category.map((item) => (
          <div key={item.name} className={cl.category__item}>
            <div className={cl.category__img}>
              <button
                onClick={() => {
                  postNewExpense(item.name);
                }}
              >
                <img src={`http:${item.path}`}></img>
              </button>
            </div>
            <div className={cl.category__name}>
              <span>{item.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
