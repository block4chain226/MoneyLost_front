import React from "react";
import cl from "./Category.module.css";

const Category = (props) => {
  return (
    <div className={cl.category}>
      <div className={cl.category__container}>
        <div className={cl.category__row}>
          <div className={cl.category__column}>
            <div className={cl.category__item}>
              <div className={cl.category__img}>
                <button>
                  <img src={"//fastpic.at.ua/_nw/35/69031221.png"}></img>
                </button>
              </div>
              <div className={cl.category__name}>
                <span>accessory</span>
              </div>
            </div>
          </div>
          <div className={cl.category__column}>
            <div className={cl.category__item}>
              <div className={cl.category__img}>
                <img
                  src={"https://imageup.ru/img250/3916909/ic_accessory.png"}
                ></img>
              </div>
              <div className={cl.category__name}>
                <span>accessory</span>
              </div>
            </div>
          </div>
          <div className={cl.category__column}>
            <div className={cl.category__item}>
              <div className={cl.category__img}>
                <img
                  src={"https://imageup.ru/img250/3916909/ic_accessory.png"}
                ></img>
              </div>
              <div className={cl.category__name}>
                <span>accessory</span>
              </div>
            </div>
          </div>
          <div className={cl.category__column}>
            <div className={cl.category__item}>
              <div className={cl.category__img}>
                <img
                  src={"https://imageup.ru/img250/3916909/ic_accessory.png"}
                ></img>
              </div>
              <div className={cl.category__name}>
                <span>accessory</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
