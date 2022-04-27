import React from "react";
import classes from "./HeaderCartButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const HeaderCartButton = (props) => {
  return (
    <button className={classes.button}>
      <span>
        <FontAwesomeIcon className={classes.icon} icon={faCartShopping} />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>3</span>
    </button>
  );
};

export default HeaderCartButton;
