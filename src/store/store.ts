import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "../services/ingredientsSlice";
import modalReducer from "../services/modalSlice";
import orderReducer from "../services/orderSlice";
import authReducer from "../services/authSlice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    modal: modalReducer,
    order: orderReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
