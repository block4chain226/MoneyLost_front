import React, { useState } from "react";
import { createContext } from "react";
const NewExpenseContext = createContext({});

export const NewExpenseProvider = ({ children }) => {
  const [switchMode, setSwitchMode] = useState({
    isExpense: true,
    isIncome: false,
  });
  let [amount, setAmount] = useState("");
  const [categoryName, setCategoryName] = useState("");

  return (
    <NewExpenseContext.Provider
      value={{
        switchMode,
        setSwitchMode,
        amount,
        setAmount,
        categoryName,
        setCategoryName,
      }}
    >
      {children}
    </NewExpenseContext.Provider>
  );
};

export default NewExpenseContext;
