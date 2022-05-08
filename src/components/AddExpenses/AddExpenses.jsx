import React, { useState, useRef, useEffect, useContext } from "react";
import cl from "./AddExpenses.module.css";
import NumPad from "../NumPad/NumPad";
import Category from "../Category/Category";
import SwitchButton from "../SwitchButton/SwitchButton";
import MyButton from "../MyButton/MyButton";
import useAuth from "../hooks/useAuth";
import ExpensesContext from "../../context/ExpensesContext";

//AddExpenses body
const AddExpenses = (props) => {
  const [isCategory, setIsCategory] = useState(false);
  const [menu, setMenu] = useState({ isOpen: false });
  const { auth } = useAuth();

  const { switchMode, amount, dayIncome, setDayIncome, currentDate } =
    useContext(ExpensesContext);

  function showCategory(callback) {
    setIsCategory(callback);
  }

  function toggleMenu() {
    setMenu({ isOpen: !menu.isOpen });
  }

  const postNewIncome = () => {
    AddNewIncome();

    displayNewIncome(amount);
  };

  const displayNewIncome = () => {
    if (JSON.parse(sessionStorage.getItem("income") !== null)) {
      JSON.parse(sessionStorage.getItem("income")).map((element) => {
        if (element.date === currentDate.toLocaleDateString("en-US")) {
          setDayIncome(element.incomeAmount);
        }
      });
    }
  };

  const AddNewIncome = () => {
    const newIncome = {
      userId: sessionStorage.getItem("userId"),
      date: currentDate.toLocaleDateString("en-US"),
      incomeAmount: amount,
    };
    const config = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newIncome),
    };
    try {
      const response = fetch("http://localhost:3000/income", config).then(
        (res) => res.json()
      );
    } catch (error) {}
    // debugger;
    if (sessionStorage.getItem("income") !== null) {
      let income = JSON.parse(sessionStorage.getItem("income"));
      ////check if we have the same date income, if yes - need to update it
      let total = +dayIncome;
      income.map((item) => {
        if (item.date === currentDate.toLocaleDateString("en-US")) {
          const index = income.indexOf(item);
          total += +amount;
          income.splice(index, 1);
        }
      });
      if (+total === +dayIncome) {
        total += +amount;
      }
      // JSON.parse(sessionStorage.getItem("income"));

      income.push({
        userId: sessionStorage.getItem("userId"),
        date: currentDate.toLocaleDateString("en-US"),
        incomeAmount: +total,
      });
      sessionStorage.setItem("income", JSON.stringify(income));
    } else {
      let income = [];
      const incomeAmount = +dayIncome + +amount;
      income.push({
        userId: sessionStorage.getItem("userId"),
        date: currentDate.toLocaleDateString("en-US"),
        incomeAmount: incomeAmount,
      });
      sessionStorage.setItem("income", JSON.stringify(income));
    }

    toggleMenu();
  };

  useEffect(() => {
    displayNewIncome();
  });

  const bottom = props.position;
  return (
    <div className={`${cl.body}  ${menu.isOpen ? cl.open : ""}`}>
      <div className={cl.container}>
        <div className={cl.topmenu}>
          <span onClick={toggleMenu}>open</span>
        </div>
        {/* <button onClick={() => console.log(amount)}>showAmount</button> */}
        {/* show category or not */}
        {isCategory ? (
          <Category
            toggleMenu={toggleMenu}
            showCategory={showCategory}
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
