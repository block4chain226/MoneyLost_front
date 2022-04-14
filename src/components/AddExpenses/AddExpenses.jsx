import React, { useState, useRef, useEffect } from "react";
import cl from "./AddExpenses.module.css";
import NumPad from "../NumPad/NumPad";
import Category from "../Category/Category";
import SwitchButton from "../SwitchButton/SwitchButton";

//AddExpenses body
const AddExpenses = (props) => {
  const [isCategory, setIsCategory] = useState(false);
  const [menu, setMenu] = useState({ isOpen: false });

  function showCategory(callback) {
    setIsCategory(callback);
  }

  function toggleMenu() {
    setMenu({ isOpen: !menu.isOpen });
  }

  const bottom = props.position;
  return (
    <div className={`${cl.body}  ${menu.isOpen ? cl.open : ""}`}>
      <div className={cl.container}>
        <div className={cl.topmenu}>
          {/* {isCategory ? (
            <button onClick={() => props.showCategory(false)}>Back</button>
          ) : (
            <></>
          )} */}

          <span onClick={toggleMenu}>open</span>
        </div>

        {/* show category or not */}
        {isCategory ? (
          <Category showCategory={showCategory} category={props.category} />
        ) : (
          <div className={cl.content}>
            <SwitchButton />
            <NumPad showCategory={showCategory} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddExpenses;
