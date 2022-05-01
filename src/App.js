import { useState } from "react";
import Cart from "./components/Cart/Cart.jsx";
import Header from "./components/Layout/Header.jsx";
import Meals from "./components/Meals/Meals.jsx";
import CartProvider from "./store/CartProvider.jsx";

function App() {
  // Cart Item ဘယ်ချိန်ပြပေးရမလဲ ဆုံးဖြတ်တဲ့ state ပါ
  const [cartIsShow, setCartIsShow] = useState(false);

  const cartShowHandler = () => {
    setCartIsShow(true);
  };

  const cartHideHandler = () => {
    setCartIsShow(false);
  };
  return (
    <CartProvider>
      {cartIsShow && <Cart onHideCart={cartHideHandler} />}
      <Header onShowCart={cartShowHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
