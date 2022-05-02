import React, { useContext } from "react";
import classes from "./MealsItem.module.css";
import MealsItemForm from "./MealsItemForm";
import CartContext from "../../../store/cart-context";

const MealsItem = (props) => {
  const cartCtx = useContext(CartContext);
  const addToCartHandler = (quantity) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      quantity,
      price: props.price,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h4>{props.name}</h4>
        <p className={classes.description}>{props.description}</p>
        <p className={classes.price}>{props.price}</p>
      </div>
      <MealsItemForm id={props.id} onAddToCart={addToCartHandler} />
    </li>
  );
};

export default MealsItem;
