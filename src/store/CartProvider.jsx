import React, { useReducer } from "react";
import CartContext from "./cart-context";

const cartItemDefaultValue = {
  items: [],
  totalAmout: 0,
};

const cartReducer = (state, action) => {
  if (action.payload === "ADD") {
    // latest item state ကို အသစ်ဝင်လာတဲ့ item နဲ့ပေါင်းပြီး updated array အသစ်တစ်ခုထုတ်တာပါ
    const updatedCartItems = state.items.concat(action.item);

    // စုစုပေါင်း ငွေကို ရချင်လို့ latest total amount နဲ့ အသစ်ဝင်လာတဲ့ item ရဲ့ price နဲ့ amount နဲ့ မြောက်တာပါ
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    return { items: updatedCartItems, totalAmount: updatedTotalAmount };
  }
  return cartItemDefaultValue;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    cartItemDefaultValue
  );

  const addItemToCartHandler = (item) => {
    // ဝင်လာတဲ့ item အသစ်ဟာ object ဖြစ်ပြီး
    // id, name, price, amount ဆိုတဲ့ properties တွေ ပါရမည်
    dispatchCartAction({ payload: "ADD", item });
  };

  const removeItemFromCartHandler = (id) => {
    // remove လုပ်မည့် item ရဲ့ id လက်ခံတာပါ
    dispatchCartAction({ payload: "REMOVE", id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmout,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
