import React, { useState, useRef, useEffect, useContext } from "react";
import cl from "./AddExpenses.module.css";
import NumPad from "../NumPad/NumPad";
import Category from "../Category/Category";
import SwitchButton from "../SwitchButton/SwitchButton";
import MyButton from "../MyButton/MyButton";
import ExpensesContext from "../../context/ExpensesContext";
import DateContext from "../../context/DateContext";
import IncomeContext from "../../context/IncomeContext";

const AddExpenses = (props) => {
  const [isCategory, setIsCategory] = useState(false);
  const [menu, setMenu] = useState({ isOpen: false });

  const {
    switchMode,
    allExpenses,
    setAllExpenses,
    amount,
    addNewExpense,
    setDayExpenses,
    dayExpenses,
    setIsUpdate,
    setMonthExpenses,
    yearExpenses,
    monthExpenses,
    setYearExpenses,
  } = useContext(ExpensesContext);

  const { dateMode, currentDate, currentMonthNumber, lastMonth, currentYear } =
    useContext(DateContext);

  const { addNewIncome } = useContext(IncomeContext);

  function showCategory(callback) {
    setIsCategory(callback);
  }

  const postNewExpense = (categor) => {
    addNewExpense(categor);
    updateExpenses(dateMode, amount, categor);
  };

  const updateExpenses = (dateMode, amount, categor) => {
    setAllExpenses([
      ...allExpenses,
      {
        userId: sessionStorage.getItem("userId"),
        category: categor,
        date: dateMode.day
          ? currentDate.toLocaleDateString("en-US")
          : new Date().toLocaleDateString("en-US"),
        moneyAmount: +amount,
      },
    ]);

    if (dateMode.day) {
      const dayExp = +amount + dayExpenses;
      setDayExpenses(dayExp);
    } else if (dateMode.month && currentMonthNumber === lastMonth) {
      const monthExp = +amount + monthExpenses;
      setMonthExpenses(monthExp);
    } else if (dateMode.month && currentMonthNumber !== lastMonth) {
      const monthExp = monthExpenses;
      setMonthExpenses(monthExp);
    } else if (
      dateMode.year &&
      currentYear.getFullYear() === new Date().getFullYear()
    ) {
      const yearExp = +amount + yearExpenses;
      setYearExpenses(yearExp);
    } else if (
      dateMode.year &&
      currentYear.getFullYear() !== new Date().getFullYear()
    ) {
      const yearExp = yearExpenses;
      setYearExpenses(yearExp);
    }

    setIsUpdate(true);
    setMenu({ isOpen: !menu.isOpen });
    setIsCategory(false);
  };

  const postNewIncome = () => {
    addNewIncome();
  };

  function toggleMenu() {
    setMenu({ isOpen: !menu.isOpen });
  }

  const bottom = props.position;
  return (
    <div className={`${cl.body}  ${menu.isOpen ? cl.open : ""}`}>
      <div className={cl.container}>
        <div className={cl.topmenu}>
          <span onClick={toggleMenu}>open</span>
        </div>
        {isCategory ? (
          <Category
            toggleMenu={toggleMenu}
            showCategory={showCategory}
            postNewExpense={postNewExpense}
            category={props.category}
          />
        ) : (
          <div className={cl.content}>
            <SwitchButton />
            <NumPad />
            <MyButton
              onClick={() =>
                switchMode.isExpense ? setIsCategory(true) : postNewIncome()
              }
            >
              submit
            </MyButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddExpenses;
