import React, { useState, useRef, useEffect, useContext } from "react";
import cl from "./AddExpenses.module.css";
import NumPad from "../NumPad/NumPad";
import Category from "../Category/Category";
import SwitchButton from "../SwitchButton/SwitchButton";
import NewExpenseContext, {
  NewExpenseProvider,
} from "../../context/NewExpenseContext";
import MyButton from "../MyButton/MyButton";
import useAuth from "../hooks/useAuth";

//AddExpenses body
const AddExpenses = (props) => {
  const [isCategory, setIsCategory] = useState(false);
  const [menu, setMenu] = useState({ isOpen: false });
  const { auth } = useAuth();

  const {
    categoryName,
    setCategoryName,
    switchMode,
    setSwitchMode,
    amount,
    setAmount,
  } = useContext(NewExpenseContext);

  function showCategory(callback) {
    setIsCategory(callback);
  }

  function toggleMenu() {
    setMenu({ isOpen: !menu.isOpen });
  }

  const AddNewIncome = () => {
    const config = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: sessionStorage.getItem("userId"),
        date: new Date().toLocaleDateString("en-US"),
        incomeAmount: amount,
      }),
    };
    try {
      debugger;
      const response = fetch("http://localhost:3000/income", config).then(
        (res) => res.json()
      );
    } catch (error) {}
    toggleMenu();
  };

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
                switchMode.isExpense ? setIsCategory(true) : AddNewIncome()
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
