import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import {
  Ingredient,
  FetchStatus,
  Tab,
  IInitialIngredientSliceState,
} from "../utils/types";
import { fetchIngredients } from "./asyncThunks";

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
  extraReducers: (builder) => {
    /* eslint-disable */
    builder.addCase(fetchIngredients.pending, (state) => {
      state.ingredientsFetchState = "loading";
    }),
      builder.addCase(
        fetchIngredients.fulfilled,
        (state, { payload }: PayloadAction<Ingredient[]>) => {
          state.ingredientsFetchState = "success";
          state.ingredients = payload;
        },
      ),
      builder.addCase(fetchIngredients.rejected, (state) => {
        state.ingredientsFetchState = "failed";
      });
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

export const bunSelector = createSelector(
  (state: RootState) => state.ingredients.ingredients,
  (ingredients) => ingredients?.filter((ingr) => ingr.type === "bun"),
);

export const mainsSelector = createSelector(
  (state: RootState) => state.ingredients.ingredients,
  (ingredients) => ingredients?.filter((ingr) => ingr.type === "main"),
);

export const saucesSelector = createSelector(
  (state: RootState) => state.ingredients.ingredients,
  (ingredients) => ingredients?.filter((ingr) => ingr.type === "sauce"),
);

export default ingredientsSlice.reducer;
