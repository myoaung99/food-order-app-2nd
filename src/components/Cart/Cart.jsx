import React, { useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem.jsx";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const hasItem = cartCtx.items.length > 0;

  const addToCartHandler = (item) => {};

  const removeFromCartHandler = (id) => {};

  // cart state context ကလာတဲ့ items array ကို loop ပြီး cart item တွေကို ပြပေးတာပါ
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          onAdd={addToCartHandler.bind(null, item)}
          onRemove={removeFromCartHandler.bind(null, item.id)}
        >
          {item.name}
        </CartItem>
      ))}
    </ul>
  );
  return (
    <Modal onClose={props.onHideCart}>
      {cartItems}

      <div className={classes.total}>
        <span>Total</span>
        <span>{totalAmount}</span>
      </div>

      <div className={classes.actions}>
        <button onClick={props.onHideCart} className={classes["button--alt"]}>
          Cancel
        </button>
        {hasItem && <button>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
