import React, { useState, useRef, useEffect, useContext } from "react";
import cl from "./AddExpenses.module.css";
import NumPad from "../NumPad/NumPad";
import Category from "../Category/Category";
import SwitchButton from "../SwitchButton/SwitchButton";
import MyButton from "../MyButton/MyButton";
import useAuth from "../hooks/useAuth";
import ExpensesContext from "../../context/ExpensesContext";

//AddExpenses body
const AddExpenses = (props) => {
  const [isCategory, setIsCategory] = useState(false);
  const [menu, setMenu] = useState({ isOpen: false });
  const { auth } = useAuth();
  const firstDayOfLastMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );
  const lastDayOfLastMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  );

  const {
    switchMode,
    amount,
    dayIncome,
    allIncome,
    currentMonth,
    setDayIncome,
    currentDate,
    dateMode,
  } = useContext(ExpensesContext);

  function showCategory(callback) {
    setIsCategory(callback);
  }

  function toggleMenu() {
    setMenu({ isOpen: !menu.isOpen });
  }

  const postNewIncome = () => {
    AddNewIncome();

    displayNewIncome(amount);
  };

  const displayNewIncome = () => {
    if (JSON.parse(sessionStorage.getItem("income") !== null)) {
      if (dateMode == "Day") {
        // debugger;
        let totalDayIncome = 0;
        const curYear = new Date(
          currentMonth.toLocaleDateString("en-US")
        ).getFullYear();
        console.log("curyear", curYear);
        allIncome.map((element) => {
          if (
            new Date(element.date).getTime() ===
              new Date(currentDate.toLocaleDateString("en-US")).getTime() &&
            new Date(element.date).getFullYear() === curYear
          ) {
            totalDayIncome += +element.incomeAmount;
          }
        });
        setDayIncome(totalDayIncome);
        // JSON.parse(sessionStorage.getItem("income")).map((element) => {
        //   if (element.date === currentDate.toLocaleDateString("en-US")) {
        //     setDayIncome(element.incomeAmount);
        //   }
        // });
      }
      if (dateMode == "Month") {
        const curMonth =
          new Date(currentMonth.toLocaleDateString("en-US")).getMonth() + 1;
        const lastMonth =
          new Date(new Date().toLocaleDateString("en-US")).getMonth() + 1;
        const curYear = new Date(
          currentMonth.toLocaleDateString("en-US")
        ).getFullYear();
        const lastYear = new Date(
          new Date().toLocaleDateString("en-US")
        ).getFullYear();

        JSON.parse(sessionStorage.getItem("income")).map((element) => {
          // debugger;
          if (
            new Date(element.date).getTime() ===
              new Date(new Date().toLocaleDateString("en-US")).getTime() &&
            lastMonth === curMonth &&
            curYear === lastYear
          ) {
            setDayIncome(element.incomeAmount);
          }
        });
      }
    }
  };
  // sessionStorage.removeItem("income");
  const AddNewIncome = () => {
    const newIncome = {
      userId: sessionStorage.getItem("userId"),
      date:
        dateMode === "Day"
          ? currentDate.toLocaleDateString("en-US")
          : new Date().toLocaleDateString("en-US"),
      incomeAmount: amount,
    };
    const config = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newIncome),
    };
    try {
      const response = fetch("http://localhost:3000/income", config).then(
        (res) => res.json()
      );
    } catch (error) {}

    let totalLastMonthIncome = 0;
    // debugger;
    if (sessionStorage.getItem("income") !== null) {
      let income = JSON.parse(sessionStorage.getItem("income"));
      //// adding income in row
      let total = +dayIncome;
      income.map((item) => {
        if (dateMode === "Day") {
          if (item.date === currentDate.toLocaleDateString("en-US")) {
            const index = income.indexOf(item);
            total += +amount;
            income.splice(index, 1);
          }
        }

        if (dateMode === "Month") {
          allIncome.map((element) => {
            //////all current month!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

            if (
              new Date(element.date).getTime() >=
                new Date(firstDayOfLastMonth).getTime() &&
              new Date(element.date).getTime() <=
                new Date(lastDayOfLastMonth).getTime()
            ) {
              totalLastMonthIncome =
                totalLastMonthIncome + +element.incomeAmount;
            }
          });
          console.log("session", JSON.parse(sessionStorage.getItem("income")));
          console.log("totalLastMonthIncome", totalLastMonthIncome);
        }
      });

      if (+total === +dayIncome && dateMode == "Day") {
        total += +amount;
      } else if (dateMode == "Month") {
        // debugger;
        totalLastMonthIncome += +amount;
      }
      //?????????????????when we add income in monthMode its spreading on lastDay
      income.push({
        userId: sessionStorage.getItem("userId"),
        date:
          dateMode === "Day"
            ? currentDate.toLocaleDateString("en-US")
            : new Date().toLocaleDateString("en-US"),
        incomeAmount: dateMode === "Day" ? +total : +totalLastMonthIncome,
      });

      sessionStorage.setItem("income", JSON.stringify(income));
      // totalLastMonthIncome = 0;
      if (dateMode === "Month") {
        debugger;
        income.splice(income.length - 2, 1);
        sessionStorage.setItem("income", JSON.stringify(income));
        allIncome.push({
          userId: sessionStorage.getItem("userId"),
          date: new Date().toLocaleDateString("en-US"),
          incomeAmount: amount,
        });
        console.log("session", JSON.parse(sessionStorage.getItem("income")));
      }
    }

    ///!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    else {
      let income = [];
      let incomeAmount = 0;

      if (dateMode === "Day") {
        incomeAmount = +dayIncome + +amount;
      } else {
        console.log(new Date().toLocaleDateString("en-US"));
        allIncome.map((element) => {
          //////all current month!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

          if (
            new Date(element.date).getTime() >=
              new Date(firstDayOfLastMonth).getTime() &&
            new Date(element.date).getTime() <=
              new Date(lastDayOfLastMonth).getTime()
          ) {
            incomeAmount = incomeAmount + +element.incomeAmount;
          }
        });
        allIncome.push({
          userId: sessionStorage.getItem("userId"),
          date: new Date().toLocaleDateString("en-US"),
          incomeAmount: amount,
        });
        incomeAmount += +amount;
      }

      income.push({
        userId: sessionStorage.getItem("userId"),
        date:
          dateMode === "Day"
            ? currentDate.toLocaleDateString("en-US")
            : new Date().toLocaleDateString("en-US"),
        incomeAmount: incomeAmount,
      });
      sessionStorage.setItem("income", JSON.stringify(income));
    }

    toggleMenu();
  };

  useEffect(() => {
    displayNewIncome();
  });

  const bottom = props.position;
  return (
    <div className={`${cl.body}  ${menu.isOpen ? cl.open : ""}`}>
      <div className={cl.container}>
        <div className={cl.topmenu}>
          <span onClick={toggleMenu}>open</span>
        </div>
        {/* <button onClick={() => console.log(amount)}>showAmount</button> */}
        {/* show category or not */}
        {isCategory ? (
          <Category
            toggleMenu={toggleMenu}
            showCategory={showCategory}
            category={props.category}
          />
        ) : (
          <div className={cl.content}>
            <SwitchButton />
            <NumPad />
            <MyButton
              onClick={() =>
                switchMode.isExpense ? setIsCategory(true) : postNewIncome()
              }
            >
              submit
            </MyButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddExpenses;
