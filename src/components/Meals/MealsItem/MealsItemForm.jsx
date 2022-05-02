import React, { useRef, useState } from "react";
import classes from "./MealsItemForm.module.css";
import Input from "../../UI/Input";

const MealsItemForm = (props) => {
  const [quantityIsValid, setQuantityIsValid] = useState(true);

  const quantityRef = useRef(null);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredQuantity = quantityRef.current.value;
    const enteredQuantityNumber = +enteredQuantity;

    if (
      enteredQuantity.trim().length === "0" ||
      enteredQuantityNumber < 1 ||
      enteredQuantityNumber > 5
    ) {
      setQuantityIsValid(false);
    }

    props.onAddToCart(enteredQuantityNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={quantityRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          // min: "1",
          // max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!quantityIsValid && <p>Amount must be between 1-5.</p>}
    </form>
  );
};

export default MealsItemForm;
