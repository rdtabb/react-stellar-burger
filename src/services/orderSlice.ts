import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { Ingredient } from "../utils/types";
import { RootState } from "../store/store";

interface IInitialState {
  constructorBun?: Ingredient;
  constructorIngredients: Ingredient[];
}

const initialState: IInitialState = {
  constructorBun: undefined,
  constructorIngredients: [],
};

const orderSlice = createSlice({
  name: "services/orderSlice",
  initialState,
  reducers: {
    addConstructorIngredient(state, { payload }: PayloadAction<Ingredient>) {
      state.constructorIngredients.push(payload);
    },
    addConstructorBun(state, { payload }: PayloadAction<Ingredient>) {
      state.constructorBun = payload;
    },
  },
});

const rawSelectOrderSlice = (state: RootState) => state.order;
const rawSelectBun = (state: RootState) => state.order.constructorBun;
const rawSelectIngredients = (state: RootState) =>
  state.order.constructorIngredients;

export const bunSelector = createSelector(
  rawSelectOrderSlice,
  (order) => order.constructorBun,
);

export const ingredientsSelector = createSelector(
  rawSelectOrderSlice,
  (order) => order.constructorIngredients,
);

export const priceSelector = createSelector(
  [rawSelectBun, rawSelectIngredients],
  (bun, ingredients) =>
    ingredients.reduce((acc, curr) => acc + curr.price, 0) +
    (bun ? bun.price : 0),
);

export const { addConstructorIngredient, addConstructorBun } =
  orderSlice.actions;

export default orderSlice.reducer;
