import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "../services/ingredientsSlice";
import modalReducer from "../services/modalSlice";
import constructorReducer from "../services/constructorSlice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    modal: modalReducer,
    constructor: constructorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
