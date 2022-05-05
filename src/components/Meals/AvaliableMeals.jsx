import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/use-fetch";
import Card from "../UI/Card";
import MealsItem from "./MealsItem/MealsItem";

const fetchConfig = {
  url: "https://react-5826f-default-rtdb.firebaseio.com/meals.json",
};

const AvaliableMeals = () => {
  // custom hooks
  const { meals, isLoading, hasError, fetchMeals } = useFetch(fetchConfig);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  if (isLoading) {
    return (
      <Card>
        <p>Loading....</p>
      </Card>
    );
  } else if (hasError) {
    return (
      <Card>
        <p>{hasError}</p>
      </Card>
    );
  }

  const mealList = meals.map((meal) => (
    <MealsItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </>
  );
};

export default AvaliableMeals;
