import react, { useState } from "react";
import Cart from "./components/Cart/Cart.jsx";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

function App() {
  const [cartIsShow, setCartIsShow] = useState(false);

  const cartShowHandler = () => {
    setCartIsShow(true);
  };

  const cartHideHandler = () => {
    setCartIsShow(false);
  };
  return (
    <>
      {cartIsShow && <Cart onHideCart={cartHideHandler} />}
      <Header onShowCart={cartShowHandler} />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
