import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  Order,
  Ingredient,
  FetchIngredientsResponse,
  FetchUserResponse,
  AuthRegResponse,
  UserPayload,
  User,
  AuthPayload,
} from "../utils/types";
import { request, headers, URLS } from "../utils/api";
import { getTokens } from "../utils/sessionStorage";

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

export const fetchUserInfo = createAsyncThunk(
  "services/authSlice/fetchUserInfo",
  async (): Promise<FetchUserResponse> => {
    const data = await request<FetchUserResponse>(URLS.GET_USER_INFO_URL, {
      headers,
      method: "GET",
      body: JSON.stringify(getTokens()?.accessToken),
    });
    return data;
  },
);

export const registerUser = createAsyncThunk(
  "services/authSlice/registerUser",
  async (payload: UserPayload): Promise<AuthRegResponse> => {
    const data = await request<AuthRegResponse>(URLS.REGISTER_URL, {
      headers,
      method: "POST",
      body: JSON.stringify(payload),
    });
    return data;
  },
);

export const authenticateUser = createAsyncThunk(
  "services/authSlice/authenticateUser",
  async (payload: AuthPayload): Promise<AuthRegResponse> => {
    const data = await request<AuthRegResponse>(URLS.AUTH_URL, {
      headers,
      method: "POST",
      body: JSON.stringify(payload),
    });
    return data;
  },
);
