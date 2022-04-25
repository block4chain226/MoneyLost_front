import React, { useEffect, useState } from "react";
import { useContext } from "react";
import CategoryContext from "../../context/CategoryContext";
import ExpensesDetailsContext from "../../context/ExpenseDetailsContext";
import cl from "./MyDetails.module.css";

const MyDetails = ({ categoryName }) => {
  const { category, setCategory } = useContext(CategoryContext);
  const [categoryImg, setCategoryImg] = useState();
  const { allExpenses, expensesToShow } = useContext(ExpensesDetailsContext);
  const [totalAmount, setTotalAmount] = useState();

  const getCategoryImgPath = () => {
    category.filter((item) => {
      if (item.name === categoryName) {
        setCategoryImg(item.path);
      }
    });
  };

  const getTotal = () => {
    let total = allExpenses
      .filter((item) => {
        if (item.date === "4/25/2022" && item.category === categoryName) {
          return item;
        }
      })
      .reduce((acc, cut) => {
        return (acc += cut.moneyAmount);
      }, 0);
    setTotalAmount(total);
  };

  useEffect(() => {
    getTotal();
  }, []);

  //   total = total.reduce((acc, cur) => {
  //     return (acc += cur);
  //   });

  useEffect(() => {
    getCategoryImgPath();
  }, []);

  return (
    <div>
      <details className={cl.expenses}>
        <summary>
          <div className={cl.expenses__title}>
            <div className={cl.expenses__name}>
              <div className={cl.imgcontainer}>
                <img src={`http://${categoryImg}`}></img>
              </div>
              <h3>
                <strong>{categoryName}</strong>
              </h3>
            </div>

            <span>{totalAmount}</span>
          </div>
        </summary>
        {allExpenses.map((item) =>
          item.category === categoryName &&
          item.date === new Date().toLocaleDateString("en-US") ? (
            <div key={item.moneyAmount} className={cl.expenses__body}>
              <div className={cl.expenses__category}>
                <div className={cl.imgcontainer}>
                  <img src={`http://${categoryImg}`}></img>
                </div>
                <span>{categoryName}</span>
              </div>
              <span>{item.moneyAmount}</span>
            </div>
          ) : (
            ""
          )
        )}
      </details>
    </div>
  );
};

export default MyDetails;
