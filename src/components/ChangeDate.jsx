import React from "react";
import DateContext from "../context/DateContext";
import ExpensesContext from "../context/ExpensesContext";

const ChangeDate = () => {
  // const {
  //   month,
  //   setMonth,
  //   monthExpenses,
  //   dayExpenses,
  //   days,
  //   setDays,
  //   dayIncome,
  // } = useContext(ExpensesContext);

  // const {
  //   currentMonth,
  //   setCurrentMonth,
  //   dateMode,
  //   setDateMode,
  //   currentDate,
  //   setCurrentDate,
  // } = useContext(DateContext);

  // const incrementDate = (e) => {
  //   e.preventDefault();
  //   const today = new Date(new Date().getTime()).setUTCHours(0, 0, 0, 0);
  //   const currentMonthTime = new Date(currentMonth.getTime()).setUTCHours(
  //     0,
  //     0,
  //     0,
  //     0
  //   );
  //   console.log("type = ", typeof currentMonthTime);

  //   if (
  //     dateMode.month &&
  //     currentMonthTime < today &&
  //     currentMonthTime !== today
  //   ) {
  //     setMonth(30);
  //     setDays((prevState) => prevState + 1);
  //   }

  //   if (
  //     dateMode.day &&
  //     new Date(currentDate.getTime()).setUTCHours(0, 0, 0, 0) < today
  //   ) {
  //     setDays((prevState) => prevState + 1);
  //   }
  // };

  // const decrementDate = (e) => {
  //   e.preventDefault();
  //   if (dateMode.month) {
  //     setMonth(-30);
  //   }

  //   setDays((prevState) => prevState - 1);
  // };

  // useEffect(() => {
  //   if (dateMode.day) {
  //     setCurrentDate(
  //       (prevState) => new Date(Date.now() + days * 24 * 60 * 60 * 1000)
  //     );
  //   }
  //   if (dateMode.month) {
  //     setCurrentMonth(
  //       // (prevState) => new Date(currentMonth.getTime() - 30 * 1000 * 3600 * 24)
  //       (prevState) =>
  //         new Date(currentMonth.getTime() + month * 1000 * 3600 * 24)
  //     );
  //   }
  // }, [days]);

  // useEffect(() => {
  //   setDays(0);
  // }, [dateMode.day]);

  return <div></div>;
};

export default ChangeDate;
