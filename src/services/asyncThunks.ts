import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  Order,
  CreateOrderResponse,
  Ingredient,
  FetchIngredientsResponse,
} from "../utils/types";

const POST_ORDER_URL = "https://norma.nomoreparties.space/api/orders";

export const createOrder = createAsyncThunk(
  "services/orderSlice/createOrder",
  async (ids: (string | undefined)[]): Promise<Order> => {
    const requestBody = {
      ingredients: ids,
    };
    const response = await fetch(POST_ORDER_URL, {
      body: JSON.stringify(requestBody),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(
        `Order fetch failed with response status: ${response.status}`,
      );
    }
    const data: CreateOrderResponse = await response.json();
    return data;
  },
);

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
