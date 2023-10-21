import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import {
  AuthRegResponse,
  FetchStatus,
  FetchUserResponse,
  IInitialAuthSliceState,
} from "../utils/types";
import { authenticateUser, fetchUserInfo, registerUser } from "./asyncThunks";
import { setTokens, getTokens } from "../utils/sessionStorage";

const initialState: IInitialAuthSliceState = {
  tokens: undefined,
  user: undefined,
  asyncLoginStatus: "idle",
  asyncRegisterStatus: "idle",
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
    setRegisterStatus(state, { payload }: PayloadAction<FetchStatus>) {
      state.asyncRegisterStatus = payload;
    },
    setLoginStatus(state, { payload }: PayloadAction<FetchStatus>) {
      state.asyncLoginStatus = payload;
    },
  },
  extraReducers: (builder) => {
    /* eslint-disable */
    builder.addCase(authenticateUser.pending, (state) => {
      state.asyncLoginStatus = "loading";
    });
    builder.addCase(authenticateUser.rejected, (state) => {
      state.asyncLoginStatus = "failed";
    });
    builder.addCase(
      authenticateUser.fulfilled,
      (state, { payload }: PayloadAction<AuthRegResponse>) => {
        state.user = payload.user;
        state.tokens = {
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken,
        };
        state.asyncRegisterStatus = "success";
        setTokens(payload);
      },
    );
    builder.addCase(registerUser.pending, (state) => {
      state.asyncRegisterStatus = "loading";
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.asyncRegisterStatus = "failed";
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.asyncRegisterStatus = "success";
    });
    builder.addCase(
      fetchUserInfo.fulfilled,
      (state, { payload }: PayloadAction<FetchUserResponse | undefined>) => {
        state.user = payload?.user;
      },
    );
  },
});

const selectUser = (state: RootState) => state.auth.user;
const selectTokens = (state: RootState) => state.auth.tokens;
export const userSelector = createSelector(selectUser, (user) => user);
export const authInfoSelector = createSelector(selectTokens, (tokens) => ({
  tokens: tokens,
  isAuth: !!tokens,
}));
export const loginStatusSelector = createSelector(
  (state: RootState) => state.auth.asyncLoginStatus,
  (status) => status,
);

export const registerStatusSelector = createSelector(
  (state: RootState) => state.auth.asyncRegisterStatus,
  (status) => status,
);

export const { initAuthCheck, setLoginStatus, setRegisterStatus } =
  authSlice.actions;

export default authSlice.reducer;
