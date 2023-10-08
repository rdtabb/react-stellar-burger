import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import {
  Ingredient,
  FetchIngredientsResponse,
  IngredientsFetchStatus,
  Tab,
} from "../utils/types";

const FETCH_INGREDIENTS = "https://norma.nomoreparties.space/api/ingredients";

export const fetchIngredients = createAsyncThunk(
  "services/ingredientsSlice/fetchIngredients",
  async (): Promise<Ingredient[]> => {
    const response = await fetch(FETCH_INGREDIENTS);
    if (!response.ok) {
      throw new Error(
        `Ingredient fetch failed with response status: ${response.status}`,
      );
    }
    const data: FetchIngredientsResponse = await response.json();
    return data.data;
  },
);

interface IInitialState {
  ingredients?: Ingredient[];
  selectedIngredient?: Ingredient;
  ingredientsFetchState: IngredientsFetchStatus;
  selectedTab: Tab;
}

const initialState: IInitialState = {
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
    setIngredientsStatus(
      state,
      { payload }: PayloadAction<IngredientsFetchStatus>,
    ) {
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

export const selectTab = (state: RootState) => state.ingredients.selectedTab;

export const selectIngredientsFetchStatus = (state: RootState) =>
  state.ingredients.ingredientsFetchState;

export const selectSelectedItem = () =>
  createSelector(
    (state: RootState) => state.ingredients,
    (ingredients) => ingredients.selectedIngredient,
  );

export const selectBuns = () =>
  createSelector(
    (state: RootState) => state.ingredients.ingredients,
    (ingredients) => ingredients?.filter((ingr) => ingr.type === "bun"),
  );

export const selectMains = () =>
  createSelector(
    (state: RootState) => state.ingredients.ingredients,
    (ingredients) => ingredients?.filter((ingr) => ingr.type === "main"),
  );

export const selectSauces = () =>
  createSelector(
    (state: RootState) => state.ingredients.ingredients,
    (ingredients) => ingredients?.filter((ingr) => ingr.type === "sauce"),
  );

export default ingredientsSlice.reducer;
