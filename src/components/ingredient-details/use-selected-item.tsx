import React from "react";
import { useLocation } from "react-router-dom";
import { useIngredients } from "../../hooks/useIngredients";

import { Ingredient } from "../../utils";

interface Location {
  state: {
    item: Ingredient | null;
  };
}

export const useSelectedItem = (): Ingredient | undefined => {
  const { defaultIngredient } = useIngredients();
  const { state }: Location = useLocation();

  return state.item ?? defaultIngredient;
};
