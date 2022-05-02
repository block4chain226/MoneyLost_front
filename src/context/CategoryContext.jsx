import React, { useState, useEffect } from "react";
import { createContext } from "react";

const CategoryContext = createContext();

export const CategoryContextProvider = ({ children }) => {
  const categoryUrl = "http://localhost:3000/category/";
  const [category, setCategory] = useState([
    {
      _id: "6255b591d94c8005630a5ccb",
      name: "clothes",
      path: "//fastpic.at.ua/_nw/35/69031221.png",
    },
    {
      _id: "6255b78dd94c8005630a5ccc",
      name: "drink",
      path: "//fastpic.at.ua/_nw/35/10066803.png",
    },
    {
      _id: "6255b7ecd94c8005630a5ccd",
      name: "food",
      path: "//fastpic.at.ua/_nw/35/10288472.png",
    },
    {
      _id: "6256bf46382c5b758da472ca",
      name: "health",
      path: "//fastpic.at.ua/_nw/35/92895886.png",
    },
    {
      _id: "6256bf63382c5b758da472cb",
      name: "apartment",
      path: "//fastpic.at.ua/_nw/35/02752048.png",
    },
    {
      _id: "6256bf9a382c5b758da472cc",
      name: "cafe",
      path: "//fastpic.at.ua/_nw/35/22691036.png",
    },
    {
      _id: "6256bfb6382c5b758da472cd",
      name: "intertainment",
      path: "//fastpic.at.ua/_nw/35/22684829.png",
    },
    {
      _id: "6256bfda382c5b758da472ce",
      name: "gift",
      path: "//fastpic.at.ua/_nw/35/61776852.png",
    },
  ]);

  // const fetchCategories = () => {
  //   fetch(categoryUrl)
  //     .then((res) => res.json())
  //     .then((json) => setCategory(json.answer));
  // };
  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;
