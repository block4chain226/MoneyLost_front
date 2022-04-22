import React, { useState, useRef, useEffect, useContext } from "react";
import cl from "./AddExpenses.module.css";
import NumPad from "../NumPad/NumPad";
import Category from "../Category/Category";
import SwitchButton from "../SwitchButton/SwitchButton";
import NewExpenseContext, {
  NewExpenseProvider,
} from "../../context/NewExpenseContext";
import MyButton from "../MyButton/MyButton";

//AddExpenses body
const AddExpenses = (props) => {
  const [isCategory, setIsCategory] = useState(false);
  const [menu, setMenu] = useState({ isOpen: false });
  const {
    categoryName,
    setCategoryName,
    switchMode,
    setSwitchMode,
    amount,
    setAmount,
  } = useContext(NewExpenseContext);
  console.log(
    "🚀 ~ file: AddExpenses.jsx ~ line 23 ~ AddExpenses ~ categoryName",
    categoryName
  );

  useEffect(() => {
    console.log("expenses: ", switchMode);
  }, [switchMode]);

  function showCategory(callback) {
    setIsCategory(callback);
  }

  function toggleMenu() {
    setMenu({ isOpen: !menu.isOpen });
  }

  // function getAmount(newAmount) {
  //   setAmount(amount + newAmount);
  // }

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
          <Category showCategory={showCategory} category={props.category} />
        ) : (
          <div className={cl.content}>
            <SwitchButton />
            <NumPad />
            <MyButton onClick={() => setIsCategory(true)}>submit</MyButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddExpenses;
