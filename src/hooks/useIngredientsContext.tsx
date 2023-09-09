import React, { useContext } from "react";
import { IngredientsContext } from "../context/IngredientsContext";

const useIngredientsContext = () => {
  return useContext(IngredientsContext);
};

export default useIngredientsContext;
