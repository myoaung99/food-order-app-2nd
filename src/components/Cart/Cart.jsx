import React from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const items = [{ id: "c1", name: "Sushi", description: "Delicious Sushi" }];
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {items.map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  );
  return (
    <Modal onClose={props.onHideCart}>
      {cartItems}

      <div className={classes.total}>
        <span>Total</span>
        <spane>35.99</spane>
      </div>

      <div className={classes.actions}>
        <button onClick={props.onHideCart} className={classes["button--alt"]}>
          Cancel
        </button>
        <button>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
