import {
  createApi,
  fetchBaseQuery,
  FetchArgs,
  BaseQueryFn,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import {
  FetchUserResponse,
  Ingredient,
  Order,
  AuthRegResponse,
  AuthPayload,
  ResetPasswordEmailStageResponse,
} from "../../utils/types";
import { BASE_URL, URLS, headers } from "../../utils/api";
import { getTokens, setTokens } from "../../utils/sessionStorage";
import { RootState } from "../../store/store";
import { initAuthCheck } from "../authSlice";

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await fetchBaseQuery({ baseUrl: BASE_URL })(
    args,
    api,
    extraOptions,
  );

  if (result.error && result.error.status === 403) {
    const state = api.getState() as RootState;

    const refreshToken = state.auth.tokens?.refreshToken;

    const refreshResult = (await fetchBaseQuery({ baseUrl: BASE_URL })(
      {
        method: "POST",
        url: URLS.UPDATE_TOKEN_URL,
        body: {
          token: refreshToken,
        },
      },
      api,
      extraOptions,
    )) as unknown as { data: AuthRegResponse };
    console.log(refreshResult);

    if (refreshResult.data.success) {
      setTokens(refreshResult.data);
      api.dispatch(initAuthCheck());

      result = await fetchBaseQuery({ baseUrl: BASE_URL })(
        // @ts-ignore
        {
          headers: {
            ...headers,
            Authorization: refreshResult.data.accessToken,
          },
        },
        api,
        {},
      );
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQueryWithReauth,
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
