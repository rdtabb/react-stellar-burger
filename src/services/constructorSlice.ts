import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { Ingredient } from "../utils/types";

interface IInitialState {
  constructorIngredients: Ingredient[];
  constructorBun?: Ingredient;
}

const initialState: IInitialState = {
  constructorIngredients: [],
  constructorBun: undefined,
};

const constructorSlice = createSlice({
  name: "services/constructorSlice",
  initialState: initialState,
  reducers: {
    addConstructorBun(state, { payload }: PayloadAction<Ingredient>) {
      state.constructorBun = payload;
    },
    addConstructorIngredient(state, { payload }: PayloadAction<Ingredient>) {
      const constructorIngredients = state.constructorIngredients
        ? state.constructorIngredients
        : [];
      const newIngredients = [...constructorIngredients, payload];
      state.constructorIngredients = newIngredients;
    },
    deleteConstructorIngredient(state, { payload }: PayloadAction<string>) {
      const filteredConstructorItems = state.constructorIngredients.filter(
        (item) => item._id === payload,
      );
      state.constructorIngredients = filteredConstructorItems;
    },
  },
});

export const selectBun = () =>
  createSelector(
    (state: RootState) => state.constructor,
    (constructor) => constructor.constructorBun,
  );

export const selectTotalPrice = () =>
  createSelector(
    (state: RootState) => state.constructor,
    (constructor) =>
      constructor.constructorIngredients?.reduce(
        (acc, curr) => acc + curr.price,
        0,
      ),
  );

export const selectConstructorIngredients = () =>
  createSelector(
    (state: RootState) => state.constructor,
    (constructor) => constructor.constructorIngredients,
  );

export const {
  addConstructorIngredient,
  deleteConstructorIngredient,
  addConstructorBun,
} = constructorSlice.actions;

export default constructorSlice.reducer;
