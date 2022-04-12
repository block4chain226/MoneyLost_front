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
    setIsCategory(true);
  }

  function toggleMenu() {
    setMenu({ isOpen: !menu.isOpen });
  }

  const bottom = props.position;
  return (
    <div className={`${cl.body}  ${menu.isOpen ? cl.open : ""}`}>
      <div className={cl.container}>
        <span onClick={toggleMenu}>open</span>
        {/* show category or not */}
        {isCategory ? (
          <Category />
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
