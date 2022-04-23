import React, { useState, useContext } from "react";
import "../styles/App.css";
import Header from "../components/Header/Header";
import ExpensesDetails from "../components/ExpensesDetails/ExpensesDetails";
import NewExpenseContext, {
  NewExpenseProvider,
} from "../context/NewExpenseContext";
import { useFetching } from "../components/hooks/useFetching";
import { useEffect } from "react";
import useAuth from "../components/hooks/useAuth";

const Main = () => {
  const [category, setCategory] = useState([]);
  const { auth } = useAuth();
  console.log("token", sessionStorage.getItem("token"));
  console.log("auth", auth.token);
  const {
    categoryName,
    setCategoryName,
    switchMode,
    setSwitchMode,
    amount,
    setAmount,
  } = useContext(NewExpenseContext);

  const categoryUrl = "http://localhost:3000/category/";

  const [fetchCategories] = useFetching(async () => {
    await fetch(categoryUrl)
      .then((res) => res.json())
      .then((json) => setCategory(json.answer))
      .then((data) => console.log(data));
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  // const addNewExpense = (callback) => {
  //   const config = {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       userId: auth.userId,
  //       category: categoryName,
  //       date: new Date().toLocaleDateString("en-US"),
  //       moneyAmount: amount,
  //     }),
  //   };
  //   try {
  //     const response = fetch("http://localhost:3000/user/login", config).then(
  //       (res) => res.json()
  //     );
  //   } catch (error) {}
  // };

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
