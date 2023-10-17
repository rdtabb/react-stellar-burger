import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  Order,
  Ingredient,
  FetchIngredientsResponse,
  AuthRegResponse,
  UserPayload,
} from "../utils/types";
import { request, headers, URLS } from "../utils/api";

export const createOrder = createAsyncThunk(
  "services/orderSlice/createOrder",
  async (ids: (string | undefined)[]): Promise<Order> => {
    const requestBody = {
      ingredients: ids,
    };
    const data: Order = await request<Order>(URLS.POST_ORDER_URL, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers,
    });

    return data;
  },
);

export const fetchIngredients = createAsyncThunk(
  "services/ingredientsSlice/fetchIngredients",
  async (): Promise<Ingredient[]> => {
    const { data } = await request<FetchIngredientsResponse>(
      URLS.FETCH_INGREDIENTS,
      {
        headers,
      },
    );
    return data;
  },
);

export const registerUser = createAsyncThunk(
  "services/authSlice/authorizeUser",
  async (payload: UserPayload): Promise<AuthRegResponse> => {
    const data = await request<AuthRegResponse>(URLS.REGISTER_URL, {
      headers,
      method: "POST",
      body: JSON.stringify(payload),
    });
    return data;
  },
);
