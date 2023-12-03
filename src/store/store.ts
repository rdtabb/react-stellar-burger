import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../services/api/apiSlice";
import { authApiSlice } from "../services/api/authApiSlice";
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
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, authApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
