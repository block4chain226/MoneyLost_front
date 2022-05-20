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
          Day
        </NeoButton>
      </div>
      <div className="header-btn-container">
        <NeoButton
          onClick={() => {
            setDateMode({ day: false, month: true, year: false });
          }}
        >
          Mon
        </NeoButton>
      </div>
      <div className="header-btn-container">
        <NeoButton
          onClick={() => {
            setDateMode({ day: false, month: false, year: true });
          }}
        >
          Year
        </NeoButton>
      </div>
    </div>
  );
};

export default DateMode;
