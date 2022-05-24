import React from "react";
import { useContext } from "react";
import "../styles/App.css";
import DateContext from "../context/DateContext";
import NeoButton from "./NeoButton/NeoButton";

const DateMode = () => {
  const { setDateMode } = useContext(DateContext);

  return (
    <div className="date-mod__date">
      <div className="header-btn-container">
        <NeoButton
          onClick={() => {
            setDateMode({ day: true, month: false, year: false });
          }}
        >
          <span>Day</span>
        </NeoButton>
      </div>
      <div className="header-btn-container">
        <NeoButton
          onClick={() => {
            setDateMode({ day: false, month: true, year: false });
          }}
        >
          <span>Mon</span>
        </NeoButton>
      </div>
      <div className="header-btn-container">
        <NeoButton
          onClick={() => {
            setDateMode({ day: false, month: false, year: true });
          }}
        >
          <span>Year</span>
        </NeoButton>
      </div>
    </div>
  );
};

export default DateMode;
