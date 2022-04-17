import React, { useState } from "react";
import "../styles/App.css";
import Header from "../components/Header/Header";
import ExpensesDetails from "../components/ExpensesDetails/ExpensesDetails";
import AddExpenses from "../components/AddExpenses/AddExpenses";

import { useFetching } from "../components/hooks/useFetching";
import PostService from "../components/API/PostService";
import { useEffect } from "react";
// import { ContextType } from "react";
import SwitchButton from "../components/SwitchButton/SwitchButton";

const Main = () => {
  const [category, setCategory] = useState([]);
  const categoryUrl = "http://localhost:3000/category/";

  const [fetchCategories] = useFetching(async () => {
    await fetch(categoryUrl)
      .then((res) => res.json())
      .then((json) => setCategory(json.answer));
  });

  useEffect(() => {
    console.log("fetch category");
    fetchCategories();
  }, []);

  return (
    <div className="wrapper">
      <Header />

      <section className="main">
        <ExpensesDetails category={category} />
      </section>
    </div>
  );
};

export default Main;
