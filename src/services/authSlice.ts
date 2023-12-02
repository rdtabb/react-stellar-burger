import {
  createSlice,
  createSelector,
  PayloadAction,
  // createAsyncThunk,
  // PayloadActionCreator,
} from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import {
  AuthRegResponse,
  IInitialAuthSliceState,
  UpdateTokenPayload,
  UpdateTokenResponse,
} from "../utils/types";
import { getTokens, destroyTokens } from "../utils/sessionStorage";
// import { BASE_AUTH_URL, URLS } from "../utils/api";

const initialState: IInitialAuthSliceState = {
  tokens: undefined,
  user: undefined,
};

// export const headers = {
//   "Content-Type": "application/json",
// };

// const checkResponse = (response: Response): void => {
//   if (!response.ok) {
//     throw new Error(
//       `Order fetch failed with response status: ${response.status}`,
//     );
//   }
// };

// export const request = async <T>(
//   url: string,
//   requestParams: RequestInit,
// ): Promise<T> => {
//   const response = await fetch(url, requestParams);
//   checkResponse(response);
//   const data = await response.json();

//   return data as T;
// };

// export const refetchToken = createAsyncThunk(
//   "auth/updateToken",
//   async (payload: UpdateTokenPayload): Promise<UpdateTokenResponse> => {
//     const response = await request<UpdateTokenResponse>(URLS.UPDATE_TOKEN_URL, {
//       method: "POST",
//       body: JSON.stringify(payload),
//       headers,
//     });

//     console.log(response);

//     return response;
//   },
// );

export const authSlice = createSlice({
  name: "services/authSlice",
  initialState,
  reducers: {
    initAuthCheck(state) {
      const tokens = getTokens();
      if (!tokens) {
        return state;
      }
      state.tokens = tokens;
    },
    setAuthInfo(state, { payload }: PayloadAction<AuthRegResponse>) {
      state.user = payload.user;
      state.tokens = {
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
      };
    },
    destroyAuthInfo(state) {
      destroyTokens();
      state.user = undefined;
      state.tokens = undefined;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(
  //     refetchToken.fulfilled,
  //     (state, { payload }: PayloadAction<UpdateTokenResponse>) => {
  //       state.tokens = {
  //         refreshToken: payload.refreshToken,
  //         accessToken: payload.accessToken,
  //       };
  //     },
  //   );
  // },
});

const selectTokens = (state: RootState) => state.auth.tokens;

export const authInfoSelector = createSelector(selectTokens, (tokens) => ({
  tokens: tokens,
  isAuth: !!tokens,
}));

export const { initAuthCheck, setAuthInfo, destroyAuthInfo } =
  authSlice.actions;

export default authSlice.reducer;
