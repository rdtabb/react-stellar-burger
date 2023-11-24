import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import {
  Ingredient,
  FetchStatus,
  Tab,
  IInitialIngredientSliceState,
} from "../utils/types";

const initialState: IInitialIngredientSliceState = {
  selectedIngredient: undefined,
  ingredientsFetchState: "idle",
  ingredients: [],
  selectedTab: "buns",
};

const ingredientsSlice = createSlice({
  name: "services/ingredientsSlice",
  initialState,
  reducers: {
    saveSelectedItem(state, { payload }: PayloadAction<Ingredient>) {
      state.selectedIngredient = payload;
    },
    setIngredientsStatus(state, { payload }: PayloadAction<FetchStatus>) {
      state.ingredientsFetchState = payload;
    },
    setTab(state, { payload }: PayloadAction<Tab>) {
      state.selectedTab = payload;
    },
  },
});

export const { saveSelectedItem, setIngredientsStatus, setTab } =
  ingredientsSlice.actions;

export const tabSelector = createSelector(
  (state: RootState) => state.ingredients.selectedTab,
  (tab) => tab,
);

export const ingredientsFetchStatusSelector = createSelector(
  (state: RootState) => state.ingredients.ingredientsFetchState,
  (fetchState) => fetchState,
);

export const selectedItemSelector = createSelector(
  (state: RootState) => state.ingredients.selectedIngredient,
  (selectedIngredient) => selectedIngredient,
);

export default ingredientsSlice.reducer;
