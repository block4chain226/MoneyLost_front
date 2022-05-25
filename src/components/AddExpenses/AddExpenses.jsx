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
    deleteExpenseId,
    setDeleteExpenseId,
    editExpenseId,
    setEditExpenseId,
  } = useContext(ExpensesContext);

  const { dateMode, currentDate, currentMonthNumber, currentYear } =
    useContext(DateContext);

  const { addNewIncome } = useContext(IncomeContext);

  const lastMonth = new Date().getMonth();

  function showCategory(callback) {
    setIsCategory(callback);
  }

  const postNewExpense = (categor) => {
    addNewExpense(categor);
    updateExpenses(dateMode, amount, categor);
  };

  const deleteExpense = () => {
    const config = {
      method: "DELETE",
    };

    try {
      fetch(`http://localhost:3000/expenses/${deleteExpenseId}`, config);
    } catch (error) {}

    let deletedExpenseAmount;
    const newExp = allExpenses.filter((item) => {
      if (item._id !== deleteExpenseId) {
        return item;
      }

      deletedExpenseAmount = item.moneyAmount;
    });

    setAllExpenses(newExp);
    setIsUpdate(true);
    updateTotalExpenses(deletedExpenseAmount);
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

    updateTotalExpenses();
  };

  const updateTotalExpenses = (deletedAmount) => {
    if (dateMode.day && deleteExpenseId === null) {
      const dayExp = +amount + dayExpenses;
      setDayExpenses(dayExp);
    }
    if (dateMode.day && deleteExpenseId !== null) {
      const dayExp = +dayExpenses - +deletedAmount;
      setDayExpenses(dayExp);
      setDeleteExpenseId(null);
    }
    if (dateMode.month && currentMonthNumber === lastMonth) {
      const monthExp = +amount + monthExpenses;
      setMonthExpenses(monthExp);
    }
    if (dateMode.month && currentMonthNumber !== lastMonth) {
      const monthExp = monthExpenses;
      setMonthExpenses(monthExp);
    }
    if (dateMode.month && deleteExpenseId !== null) {
      const monthExp = +monthExpenses - +deletedAmount;
      setMonthExpenses(monthExp);
      setDeleteExpenseId(null);
    }

    ///
    if (
      dateMode.year &&
      currentYear.getFullYear() === new Date().getFullYear()
    ) {
      const yearExp = +amount + yearExpenses;
      setYearExpenses(yearExp);
    }
    if (
      dateMode.year &&
      currentYear.getFullYear() !== new Date().getFullYear()
    ) {
      const yearExp = yearExpenses;
      setYearExpenses(yearExp);
    }
    if (dateMode.year && deleteExpenseId !== null) {
      const yearExp = +yearExpenses - +deletedAmount;
      setYearExpenses(yearExp);
      setDeleteExpenseId(null);
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

  useEffect(() => {
    deleteExpense();
  }, [deleteExpenseId || deleteExpenseId !== null]);

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
            <NumPad
              setIsCategory={setIsCategory}
              postNewIncome={postNewIncome}
            />
            {/* <MyButton
              onClick={() =>
                switchMode.isExpense ? setIsCategory(true) : postNewIncome()
              }
            >
              submit
            </MyButton> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddExpenses;
