import React from "react";
import mealImage from "../assets/meals.jpg";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <>
      <header className={classes.header}>
        <h1>React</h1>
        <button>Cart</button>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealImage} alt="A table full of meals." />
      </div>
    </>
  );
};

export default Header;
