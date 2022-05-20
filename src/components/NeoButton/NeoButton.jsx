import React from "react";
import cl from "./NeoButton.module.css";
const NeoButton = ({ children, ...props }) => {
  return (
    <button {...props} className={cl.neoBtn}>
      {children}
    </button>
  );
};

export default NeoButton;
