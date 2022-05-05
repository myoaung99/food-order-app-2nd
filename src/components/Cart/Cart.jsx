import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem.jsx";
import CheckoutCart from "./CheckoutCart";

const Cart = (props) => {
  const [showCheckout, setShowCheckout] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmitted, setDidSubmitted] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const hasItem = cartCtx.items.length > 0;

  const addToCartHandler = (item) => {
    cartCtx.addItem({ ...item, quantity: 1 });
  };

  const removeFromCartHandler = (id) => {
    cartCtx.removeItem(id);
  };

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

  const orderHandler = () => {
    setShowCheckout((prev) => !prev);
  };

  const onConfirmHandler = (userData) => {
    setIsSubmitting(true);
    fetch("https://react-5826f-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({
        userData: userData,
        orderedItems: cartCtx.items,
      }),
    });

    setIsSubmitting(false);
    setDidSubmitted(true);
  };

  const CartActions = () => {
    return (
      <div className={classes.actions}>
        <button onClick={props.onHideCart} className={classes["button--alt"]}>
          Cancel
        </button>
        {hasItem && <button onClick={orderHandler}>Order</button>}
      </div>
    );
  };

  const checkoutCartContent = (
    <>
      {cartItems}

      <div className={classes.total}>
        <span>Total</span>
        <span>{totalAmount}</span>
      </div>

      {showCheckout && (
        <CheckoutCart onSubmit={onConfirmHandler} onCancel={props.onHideCart} />
      )}
      {!showCheckout && <CartActions />}
    </>
  );

  const submittingCartContent = <p>Submitting....</p>;

  const didSubmittedCartContent = (
    <>
      Successfully submitted....
      <div className={classes.actions}>
        <button onClick={props.onHideCart} className={classes["button--alt"]}>
          Cancel
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onHideCart}>
      {!isSubmitting && !didSubmitted && checkoutCartContent}
      {isSubmitting && submittingCartContent}
      {!isSubmitting && didSubmitted && didSubmittedCartContent}
    </Modal>
  );
};

export default Cart;
