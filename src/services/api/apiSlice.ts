import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  FetchUserResponse,
  Ingredient,
  Order,
  AuthRegResponse,
  AuthPayload,
  ResetPasswordEmailStageResponse,
} from "../../utils/types";
import { BASE_URL, URLS, headers } from "../../utils/api";
import { getTokens } from "../../utils/sessionStorage";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getIngredients: builder.query<{ data: Ingredient[] }, string>({
      query: () => URLS.FETCH_INGREDIENTS,
    }),
    createOrder: builder.mutation<Order, (string | undefined)[]>({
      query: (ids: (string | undefined)[]) => ({
        url: URLS.POST_ORDER_URL,
        method: "POST",
        body: { ingredients: ids },
      }),
    }),
    userInfo: builder.query<FetchUserResponse | undefined, string>({
      query: () => ({
        url: URLS.GET_USER_INFO_URL,
        headers: {
          ...headers,
          Authorization: getTokens()?.accessToken,
        },
        method: "GET",
      }),
    }),
    registerUser: builder.mutation<AuthRegResponse, AuthPayload>({
      query: (body) => ({
        url: URLS.REGISTER_URL,
        method: "POST",
        body: body,
        headers,
      }),
    }),
    authenticateUser: builder.mutation<AuthRegResponse, AuthPayload>({
      query: (body) => ({
        url: URLS.AUTH_URL,
        method: "POST",
        body,
        headers,
      }),
    }),
    resetPasswordEmailStage: builder.mutation<
      ResetPasswordEmailStageResponse,
      { email: string }
    >({
      query: (body) => ({
        url: URLS.RESET_PASSWORD_EMAIL_STAGE,
        method: "POST",
        body,
        headers,
      }),
    }),
    resetPasswordTokenStage: builder.mutation<
      ResetPasswordEmailStageResponse,
      { password: string; token: string }
    >({
      query: (body) => ({
        url: URLS.RESET_PASSWORD_TOKEN_STAGE,
        method: "POST",
        body,
        headers,
      }),
    }),
  }),
});

export const {
  useGetIngredientsQuery,
  useCreateOrderMutation,
  useUserInfoQuery,
  useRegisterUserMutation,
  useAuthenticateUserMutation,
  useResetPasswordEmailStageMutation,
  useResetPasswordTokenStageMutation,
} = apiSlice;
