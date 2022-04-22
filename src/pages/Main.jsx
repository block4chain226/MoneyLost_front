import React, { useState, useContext } from "react";
import "../styles/App.css";
import Header from "../components/Header/Header";
import ExpensesDetails from "../components/ExpensesDetails/ExpensesDetails";
import NewExpenseContext, {
  NewExpenseProvider,
} from "../context/NewExpenseContext";
import { useFetching } from "../components/hooks/useFetching";
import { useEffect } from "react";

const Main = () => {
  const [category, setCategory] = useState([]);

  const categoryUrl = "http://localhost:3000/category/";

  const [fetchCategories] = useFetching(async () => {
    console.log("category fetch");
    await fetch(categoryUrl)
      .then((res) => res.json())
      .then((json) => setCategory(json.answer));
  });

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="wrapper">
      <Header />

      <section className="main">
        <NewExpenseProvider>
          <ExpensesDetails category={category} />
        </NewExpenseProvider>
      </section>
    </div>
  );
};

export default Main;
