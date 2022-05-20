import React, { useState, useContext } from "react";
import "../styles/App.css";
import Header from "../components/Header/Header";
import ExpensesDetails from "../components/ExpensesDetails/ExpensesDetails";
import "../styles/App.css";
import { useFetching } from "../components/hooks/useFetching";
import { useEffect } from "react";
import DateMode from "../components/DateMode";
import CategoryContext from "../context/CategoryContext";
import ExpensesContext from "../context/ExpensesContext";
import IncomeContext from "../context/IncomeContext";
import DateContext from "../context/DateContext";

const Main = () => {
  // const { byDayRef, currentDate } = useContext(ExpensesContext);
  const { getDayIncomes } = useContext(IncomeContext);

  useEffect(() => {
    getDayIncomes();
  }, []);

  useEffect(() => {
    if (window.performance.navigation.type === 1) {
      sessionStorage.removeItem("tC");
      sessionStorage.removeItem("income");
    }
  });

  return (
    <div className="wrapper">
      <Header />
      <DateMode />
      <section className="main">
        <ExpensesDetails />
      </section>
    </div>
  );
};

export default Main;
