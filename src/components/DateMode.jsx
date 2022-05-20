import React from "react";
import { useContext } from "react";
import "../styles/App.css";
import DateContext from "../context/DateContext";
import NeoButton from "./NeoButton/NeoButton";

const DateMode = () => {
  const { setDateMode } = useContext(DateContext);

  return (
    <div className="date-mod__date">
      <NeoButton
        onClick={() => {
          setDateMode({ day: true, month: false, year: false });
        }}
      >
        Day
      </NeoButton>
      <NeoButton
        onClick={() => {
          setDateMode({ day: false, month: true, year: false });
        }}
      >
        Mon
      </NeoButton>
      <NeoButton
        onClick={() => {
          setDateMode({ day: false, month: false, year: true });
        }}
      >
        Year
      </NeoButton>
    </div>
  );
};

export default DateMode;
