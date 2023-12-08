import React from "react";
import { useLocation } from "react-router-dom";

import { Ingredient } from "../../utils";

const defaultIngredient: Ingredient = {
  _id: "643d69a5c3f7b9001cfa0941",
  name: "Биокотлета из марсианской Магнолии",
  type: "main",
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: "https://code.s3.yandex.net/react/code/meat-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
  __v: 0,
};

interface Location {
  state: {
    item: Ingredient | null;
  };
}

export const useSelectedItem = (): Ingredient => {
  const { state }: Location = useLocation();

  return state?.item ?? defaultIngredient;
};
