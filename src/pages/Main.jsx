import React from "react";
import "../styles/App.css";
import Header from "../components/Header/Header";
import ExpensesDetails from "../components/ExpensesDetails/ExpensesDetails";
import AddExpenses from "../components/AddExpenses/AddExpenses";

import { useFetching } from "../components/hooks/useFetching";
import PostService from "../API/PostService";
import { useEffect } from "react";
import { ContextType } from "react";

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
        <ExpensesDetails />
      </section>
    </div>
  );
};

export default Main;
