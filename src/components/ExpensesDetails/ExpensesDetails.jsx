import React, { useState } from "react";
import AddExpenses from "../AddExpenses/AddExpenses";
import Category from "../Category/Category";
import cl from "./ExpensesDetails.module.css";

const ExpensesDetails = (props) => {
  return (
    <div className={cl.expenses}>
      <div className={cl.expenses__details}>
        <div className={cl.expenses__container}>
          <div className={cl.expenses}>{/* <details>555</details> */}</div>
        </div>
      </div>

      <AddExpenses position="bottom" category={props.category}></AddExpenses>
      {/* <Category /> */}
    </div>
  );
};

export default ExpensesDetails;
