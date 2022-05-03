import React, { useReducer } from "react";
import CartContext from "./cart-context";

const cartItemDefaultValue = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.payload === "ADD") {
    // စုစုပေါင်း ငွေကို ရချင်လို့ latest total amount နဲ့ အသစ်ဝင်လာတဲ့ item ရဲ့ တန်ဖိုး နဲ့ အရေအတွက်ကို မြောက်တာပါ
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.quantity;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedCartItems;

    if (existingCartItem) {
      const updatedCartItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + action.item.quantity,
      };

      updatedCartItems = [...state.items];
      updatedCartItems[existingCartItemIndex] = updatedCartItem;
    } else {
      updatedCartItems = state.items.concat(action.item);
    }
    return { items: updatedCartItems, totalAmount: updatedTotalAmount };
  }

  if (action.payload === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    const updatedTotalAmount = state.totalAmount - existingCartItem.price;

    let updatedCartItems;

    if (existingCartItem.quantity === 1) {
      updatedCartItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedCartItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };

      updatedCartItems = [...state.items];
      updatedCartItems[existingCartItemIndex] = updatedCartItem;
    }

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

  // context value
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
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
