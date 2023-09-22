import { createSlice } from "@reduxjs/toolkit";
import { Ingredient } from "../utils/types";

interface IInitialState {
  constructorIngredients: Ingredient[];
  totalPrice: number;
}
