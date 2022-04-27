import React from "react";
import classes from "./MealsItem.module.css";
import MealsItemForm from "./MealsItemForm";

const MealsItem = (props) => {
  return (
    <li className={classes.meal}>
      <div>
        <h4>{props.name}</h4>
        <p className={classes.description}>{props.description}</p>
        <p className={classes.price}>{props.price}</p>
      </div>
      <MealsItemForm />
    </li>
  );
};

export default MealsItem;
