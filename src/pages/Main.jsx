import React from "react";
import "../styles/App.css";
import Header from "../components/Header/Header";
import ExpensesDetails from "../components/ExpensesDetails";
import AddExpenses from "../UI/AddExpenses/AddExpenses";
import NumPad from "../UI/AddExpenses/NumPad/NumPad";
import { useFetching } from "../components/hooks/useFetching";
import PostService from "../API/PostService";
import { useEffect } from "react";
import { ContextType } from "react";
import AddExpensesClass from "../UI/AddExpenses/AddExpensesClass";

const Main = () => {
  const [fetchPosts, postError] = useFetching(async () => {
    const response = await PostService.getAll();
    console.log(response);
    // setPosts(response.data);
    // const totalCount = response.headers["x-total-count"];
  });
  const Log = (p) => {
    console.log(p);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="wrapper">
      <Header />

      <section className="main">
        <div className="expenses">
          <div className="expenses__details">
            <div className="expenses__container">
              <ExpensesDetails />
            </div>
          </div>
          <AddExpenses position="toggle-bottom"></AddExpenses>
        </div>
      </section>
    </div>
  );
};

export default Main;
