import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "../services/ingredientsSlice";
import modalReducer from "../services/modalSlice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
