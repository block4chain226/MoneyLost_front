import React, { useContext, useEffect, useState } from "react";
import cl from "./Category.module.css";
import MyButton from "../MyButton/MyButton";
import NewExpenseContext from "../../context/NewExpenseContext";
import MyDetails from "../MyDetails/MyDetails";
import ExpensesDetailsContext from "../../context/ExpenseDetailsContext";

const Category = (props) => {
  const { amount, categoryName, setCategoryName } =
    useContext(NewExpenseContext);
  const { addNewExpense } = useContext(NewExpenseContext);
  const {
    titleCategory,
    setTitleCategory,
    newTitleCategory,
    setNewTitleCategory,
    allExpenses,
    setAllExpenses,
  } = useContext(ExpensesDetailsContext);
  const { setMoneyAmount } = useContext(ExpensesDetailsContext);

  const postNewExpense = (categor) => {
    setCategoryName(categor);
    addNewExpense(categor);
    console.log("categories from AddNewExpense", titleCategory);
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
    titleCategory.includes(categor)
      ? setNewTitleCategory(categor)
      : setTitleCategory([...titleCategory, categor]);
    console.log("newtitlecategory ", newTitleCategory);
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
