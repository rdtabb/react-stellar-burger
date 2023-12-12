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
  isAuthChecked: false,
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
    setIsAuthChecked(state, { payload }: PayloadAction<boolean>) {
      state.isAuthChecked = payload;
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

const selectTokens = (state: RootState) => ({
  tokens: state.auth.tokens,
  isAuthChecked: state.auth.isAuthChecked,
});

export const authInfoSelector = createSelector(selectTokens, (info) => ({
  tokens: info.tokens,
  isAuth: !!info.tokens,
  isAuthChecked: info.isAuthChecked,
}));

export const { initAuthCheck, setAuthInfo, destroyAuthInfo, setIsAuthChecked } =
  authSlice.actions;

export default authSlice.reducer;
