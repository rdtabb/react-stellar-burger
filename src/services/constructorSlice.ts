import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { Ingredient } from "../utils/types";

interface IInitialState {
  constructorIngredients: Ingredient[];
  constructorBun?: Ingredient;
  totalPrice: number;
}

const initialState: IInitialState = {
  constructorIngredients: [],
  constructorBun: undefined,
  totalPrice: 0,
};

const constructorSlice = createSlice({
  name: "services/constructorSlice",
  initialState: initialState,
  reducers: {
    addConstructorBun(state, { payload }: PayloadAction<Ingredient>) {
      state.constructorBun = payload;
      state.totalPrice += payload.price;
    },
    addConstructorIngredient(state, { payload }: PayloadAction<Ingredient>) {
      const newIngredients = [...state.constructorIngredients, payload];
      state.constructorIngredients = newIngredients;
      state.totalPrice += payload.price;
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
    (constructor) => constructor.totalPrice,
  );

export const selectConstructorIngredients = () =>
  createSelector(
    (state: RootState) => state.constructor,
    (constructor) => constructor.constructorIngredients,
  );

export const { addConstructorIngredient, deleteConstructorIngredient } =
  constructorSlice.actions;

export default constructorSlice.reducer;
