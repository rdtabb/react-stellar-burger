import { createAsyncThunk } from "@reduxjs/toolkit";
import { Order, Ingredient } from "../utils/types";
import {
  request,
  headers,
  POST_ORDER_URL,
  FETCH_INGREDIENTS,
} from "../utils/api";

export const createOrder = createAsyncThunk(
  "services/orderSlice/createOrder",
  async (ids: (string | undefined)[]): Promise<Order> => {
    const requestBody = {
      ingredients: ids,
    };
    //@ts-ignore
    const data: Order = await request<Order>(POST_ORDER_URL, {
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
    //@ts-ignore
    const data: Ingredient[] = await request<Ingredient>(FETCH_INGREDIENTS, {
      headers,
    });
    return data;
  },
);
