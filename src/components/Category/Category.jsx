import React, { useEffect, useState } from "react";
import cl from "./Category.module.css";
// import PostService from "../API/PostService";

const Category = (props) => {
  return (
    <div className={cl.category}>
      <button onClick={() => props.showCategory(false)}>Back</button>
      <div className={cl.category__container}>
        {props.category.map((item) => (
          <div key={item.name} className={cl.category__item}>
            <div className={cl.category__img}>
              <button>
                <img src={`http:${item.path}`}></img>
              </button>
            </div>
            <div className={cl.category__name}>
              <span>{item.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
