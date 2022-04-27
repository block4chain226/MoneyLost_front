import React, { useContext, useEffect, useState } from "react";
import cl from "./Category.module.css";
import MyButton from "../MyButton/MyButton";
import ExpensesContext from "../../context/ExpensesContext";

const Category = (props) => {
  const { amount, setCategoryName, addNewExpense } =
    useContext(ExpensesContext);
  const {
    titleCategory,
    setTitleCategory,
    allExpenses,
    setAllExpenses,
    setMoneyAmount,
  } = useContext(ExpensesContext);

  const postNewExpense = (categor) => {
    setCategoryName(categor);
    addNewExpense(categor);
    displayNewExpense(categor);
    setMoneyAmount(amount);
    updateAllExpenses(categor);
    props.toggleMenu();
    props.showCategory(false);
  };

  const updateAllExpenses = (categor) => {
    setAllExpenses([
      ...allExpenses,
      {
        category: categor,
        date: new Date().toLocaleDateString("en-US"),
        moneyAmount: +amount,
      },
    ]);
    console.log("updater allExpenses: ", allExpenses);
  };

  const displayNewExpense = (categor) => {
    if (!titleCategory.includes(categor)) {
      setTitleCategory([...titleCategory, categor]);
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
