import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { Tab, IInitialIngredientSliceState } from "../utils";

const initialState: IInitialIngredientSliceState = {
  selectedTab: "buns",
};

const ingredientsSlice = createSlice({
  name: "services/ingredientsSlice",
  initialState,
  reducers: {
    setTab(state, { payload }: PayloadAction<Tab>) {
      state.selectedTab = payload;
    },
  },
});

export const { setTab } = ingredientsSlice.actions;

export const tabSelector = createSelector(
  (state: RootState) => state.ingredients.selectedTab,
  (tab) => tab,
);

export default ingredientsSlice.reducer;
