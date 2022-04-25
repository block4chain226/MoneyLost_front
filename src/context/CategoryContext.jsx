import React, { useState } from "react";
import { createContext } from "react";

const CategoryContext = createContext();

export const CategoryContextProvider = ({ children }) => {
  const [category, setCategory] = useState();
  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;
