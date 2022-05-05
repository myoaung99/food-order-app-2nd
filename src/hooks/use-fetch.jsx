import react, { useState, useCallback } from "react";

const useFetch = (fetchConfig) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(null);

  const fetchMeals = useCallback(async () => {
    try {
      const response = await fetch(fetchConfig.url, {
        method: fetchConfig.method ? fetchConfig.method : "GET",
        body: fetchConfig.body ? JSON.stringify(fetchConfig.body) : null,
        headers: fetchConfig.headers ? fetchConfig.headers : {},
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseData = await response.json();

      let loadedMeals = [];

      for (let key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
    } catch (error) {
      console.log(error);
      setHasError(error.message);
    }

    setIsLoading(false);
  }, [fetchConfig]);

  return {
    meals,
    isLoading,
    hasError,
    fetchMeals,
  };
};

export default useFetch;
