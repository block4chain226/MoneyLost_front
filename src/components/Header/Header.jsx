import React, { useState } from "react";
import cl from "./Header.module.css";
import SwitchButton from "../SwitchButton/SwitchButton";
import { useNavigate } from "react-router-dom";
import RequireAuth from "../RequireAuth";
import { Link } from "react-router-dom";
const Header = () => {
  const [date, setDate] = useState("Day");

  function fff(event) {
    setDate(event.target.textContent);
  }
  const navigate = useNavigate();
  return (
    <section className={cl.header}>
      <div className={cl.header__container}>
        <div className={cl.header__date}>
          <button onClick={fff}>Day</button>
          <button onClick={fff}>Month</button>
          <button>Year</button>
        </div>

        <div className={cl.header__money}>
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
      </div>
    </section>
  );
};

export default Header;
