import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import CategoryContext from "../../context/CategoryContext";
import DateContext from "../../context/DateContext";
import ExpensesContext from "../../context/ExpensesContext";
import cl from "./MyDetails.module.css";

const MyDetails = ({ categoryName, money, items }) => {
  const { category } = useContext(CategoryContext);
  const [categoryImg, setCategoryImg] = useState();
  const [isShowTrash, setIsShowTrash] = useState(false);

  const {
    dayExpenses,
    setDayExpenses,
    monthExpenses,
    setMonthExpenses,
    yearExpenses,
    setYearExpenses,
    isUpdate,
    allExpenses,
    setAllExpenses,

    setDeleteExpenseId,

    setEditExpenseId,
  } = useContext(ExpensesContext);

  const { dateMode } = useContext(DateContext);

  const [totalAmount, setTotalAmount] = useState();

  const getCategoryImgPath = () => {
    category.filter((item) => {
      if (item.name === categoryName) {
        setCategoryImg(item.path);
      }
    });
  };

  const getTotal = () => {
    let total = items.reduce((acc, cut) => {
      return acc + cut.moneyAmount;
    }, 0);
    setTotalAmount(total);
    if (!isUpdate && dateMode.day) {
      let dayExp = dayExpenses;
      dayExp += total;

      setDayExpenses((total) => total + dayExp);
    } else if (!isUpdate && dateMode.month) {
      let monthExp = monthExpenses;
      monthExp += total;

      setMonthExpenses((total) => total + monthExp);
    } else if (!isUpdate && dateMode.year) {
      let yearExp = yearExpenses;
      yearExp += total;
      setYearExpenses((total) => total + yearExp);
    }
  };

  // const deleteExpense = (e) => {
  //   console.log(allExpenses);
  //   const newExp = allExpenses.filter((item) => {
  //     if (item.id !== e.currentTarget.id) {
  //       // allExpenses.splice(allExpenses.indexOf(item), 1);
  //       return item;
  //     }
  //   });
  //   setAllExpenses(newExp);
  // };

  useEffect(() => {
    getTotal();
  }, [items]);

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
        {items.map((item) => (
          <div key={item.id} className={cl.expenses__body}>
            <div className={cl.expenses__category}>
              <div className={cl.imgcontainer}>
                <img src={`http://${categoryImg}`}></img>
              </div>

              <span>{item.date}</span>
              <div
                id={item._id}
                onClick={(e) => setDeleteExpenseId(e.currentTarget.id)}
                // onClick={(e) => console.log(e.currentTarget.id)}
                className={cl.trash_container}
              >
                <img
                  className={cl.trash}
                  src={`https://i.ibb.co/7brVtzT/Trash.png`}
                ></img>
              </div>
            </div>
            <span>{item.moneyAmount}</span>
          </div>
        ))}
      </details>
    </div>
  );
};

export default MyDetails;
