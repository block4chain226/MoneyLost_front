import React, { useState, useContext, useEffect, useMemo } from "react";
import AddExpenses from "../AddExpenses/AddExpenses";
import ExpensesDetailsContext from "../../context/ExpenseDetailsContext";
import MyDetails from "../MyDetails/MyDetails";
import cl from "./ExpensesDetails.module.css";

const ExpensesDetails = (props) => {
  const {
    allExpenses,
    setAllExpenses,
    setDateMode,
    dateMode,
    callBack,
    titleCategory,
    setTitleCategory,
    moneyAmount,
    newTitleCategory,
    setNewTitleCategory,
    isUpdate,
    setIsUpdate,
  } = useContext(ExpensesDetailsContext);
  // const [titleCategory, setTitleCategory] = useState([]);

  const userId = sessionStorage.getItem("userId");

  const getAllExpenses = async () => {
    await fetch(`http://localhost:3000/expenses/${userId}`)
      .then((res) => res.json())
      .then((data) => setAllExpenses(data.answer));
  };

  useEffect(() => {
    getAllExpenses();
  }, []);

  //if titleCategory array not includes titleCategoryegory give to new details, then details on own side find and draw all this titleCategoryegories

  function callback() {
    Object.values(allExpenses).map((element) => {
      if (
        !titleCategory.includes(element.category) &&
        element.date === new Date().toLocaleDateString("en-US")
      ) {
        setTitleCategory([...titleCategory, element.category]);
      }
    });
  }

  const getCategoryTitles = (callBack) => {
    callBack();
  };

  useEffect(() => {
    getCategoryTitles(callback);
  }, [titleCategory, dateMode]);
  // debugger;

  return (
    <div className={cl.expenses}>
      <div className={cl.expenses__details}>
        <div className={cl.expenses__container}>
          <div className={cl.expenses}>
            {/* <div>{moneyAmount}</div> */}
            <ul>
              {titleCategory.map((item) => (
                <MyDetails
                  key={item.category}
                  money={moneyAmount}
                  categoryName={item}
                  newCategoryName={newTitleCategory}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
      <AddExpenses position="bottom" category={props.category}></AddExpenses>
    </div>
  );
};

export default ExpensesDetails;
