import React, { useContext } from "react";
import classes from "./HeaderCartButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  // Context ထဲက value ကို လှမ်းယူလိုက်တာပါ
  const cartCtx = useContext(CartContext);

  // item amount ကို badge မှာ ပြချင်တာပါ
  const numberOfCartItem = cartCtx.items.reduce((curNum, item) => {
    return curNum + item.amount;
  }, 0);

  return (
    <button className={classes.button} onClick={props.showCartHandler}>
      <span>
        <FontAwesomeIcon className={classes.icon} icon={faCartShopping} />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{numberOfCartItem}</span>
    </button>
  );
};

export default HeaderCartButton;
