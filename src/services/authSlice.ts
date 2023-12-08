import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import {
  AuthRegResponse,
  IInitialAuthSliceState,
  getTokens,
  destroyTokens,
} from "../utils";

const initialState: IInitialAuthSliceState = {
  tokens: undefined,
  user: undefined,
};

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
});

const selectTokens = (state: RootState) => state.auth.tokens;

export const authInfoSelector = createSelector(selectTokens, (tokens) => ({
  tokens: tokens,
  isAuth: !!tokens,
}));

export const { initAuthCheck, setAuthInfo, destroyAuthInfo } =
  authSlice.actions;

export default authSlice.reducer;
