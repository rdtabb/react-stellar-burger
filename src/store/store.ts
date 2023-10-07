import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "../services/ingredientsSlice";
import modalReducer from "../services/modalSlice";
import orderReducer from "../services/orderSlice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    modal: modalReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
