import React, { useContext, useState, useEffect } from "react";
import classes from "./HeaderCartButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighLighted] = useState(false);

  // Context ထဲက value ကို လှမ်းယူလိုက်တာပါ
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;

  // item amount ကို badge မှာ ပြချင်တာပါ
  const numberOfCartItem = cartCtx.items.reduce((curNum, item) => {
    return curNum + item.quantity;
  }, 0);

  const btnClasses = `${classes.button} ${btnIsHighlighted && classes.bump}`;

  useEffect(() => {
    if (items.length <= 0) {
      return;
    }
    setBtnIsHighLighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighLighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.showCartHandler}>
      <span>
        <FontAwesomeIcon className={classes.icon} icon={faCartShopping} />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{numberOfCartItem}</span>
    </button>
  );
};

export default HeaderCartButton;
