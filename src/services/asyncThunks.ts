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
  ResetPasswordEmailStageResponse,
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
  async (): Promise<FetchUserResponse | undefined> => {
    const token = getTokens()?.accessToken;
    if (!token) return;
    const data = await request<FetchUserResponse>(URLS.GET_USER_INFO_URL, {
      headers: {
        ...headers,
        Authorization: token,
      },
      method: "GET",
    });
    return data;
  },
);

export const registerUser = createAsyncThunk(
  "services/authSlice/registerUser",
  async (payload: UserPayload, thunkAPI): Promise<AuthRegResponse> => {
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

export const resetWithEmail = createAsyncThunk(
  "services/authSlice/resetWithEmail",
  async (payload: {
    email: string;
  }): Promise<ResetPasswordEmailStageResponse> => {
    const data = await request<ResetPasswordEmailStageResponse>(
      URLS.RESET_PASSWORD_EMAIL_STAGE,
      {
        headers,
        method: "POST",
        body: JSON.stringify(payload),
      },
    );
    return data;
  },
);
