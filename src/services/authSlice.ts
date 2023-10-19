import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import {
  AuthRegResponse,
  FetchUserResponse,
  IInitialAuthSliceState,
  User,
} from "../utils/types";
import { registerUser, authenticateUser, fetchUserInfo } from "./asyncThunks";
import { setTokens, getTokens } from "../utils/sessionStorage";

const initialState: IInitialAuthSliceState = {
  tokens: undefined,
  user: undefined,
  authFetchStatus: "idle",
  isCheckedAuth: false,
};

export const authSlice = createSlice({
  name: "services/authSlice",
  initialState,
  reducers: {
    saveCurrentUser(state, { payload }: PayloadAction<User>) {
      state.user = payload;
    },
    initAuthCheck(state) {
      const tokens = getTokens();
      if (!tokens) {
        return state;
      }
      state.tokens = tokens;
      state.isCheckedAuth = true;
    },
  },
  extraReducers: (builder) => {
    /* eslint-disable */
    builder.addCase(
      registerUser.fulfilled,
      (state, { payload }: PayloadAction<AuthRegResponse>) => {
        state.user = payload.user;
        state.tokens = {
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken,
        };
        setTokens(payload);
      },
    ),
      builder.addCase(
        authenticateUser.fulfilled,
        (state, { payload }: PayloadAction<AuthRegResponse>) => {
          state.user = payload.user;
          state.tokens = {
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
          };
          setTokens(payload);
        },
      ),
      builder.addCase(
        fetchUserInfo.fulfilled,
        (state, { payload }: PayloadAction<FetchUserResponse>) => {
          state.user = payload.user;
        },
      );
  },
});

const selectUser = (state: RootState) => state.auth.user;
const selectIsAuth = (state: RootState) => state.auth.isCheckedAuth;
export const userSelector = createSelector(selectUser, (user) => user);
export const authInfoSelector = createSelector(
  [selectUser, selectIsAuth],
  (user, status) => ({ user, status }),
);

export const { saveCurrentUser, initAuthCheck } = authSlice.actions;

export default authSlice.reducer;
