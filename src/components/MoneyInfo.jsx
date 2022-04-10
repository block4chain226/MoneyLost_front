import React from "react";
import cl from "../styles/MoneyInfo.module.css";

const MoneyInfo = () => {
  return (
    <div className="header__money money">
      <div className={cl.money__total}>
        <h1>77877</h1>
      </div>

      <div className={cl.money__expenses}>
        <h6>Today exp</h6>
        <h6>1000</h6>
      </div>
      <div className={cl.money__income}>
        <h6>Money income</h6>
        <h6>700</h6>
      </div>
    </div>
  );
};

export default MoneyInfo;
