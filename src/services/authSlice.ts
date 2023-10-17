import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { AuthRegResponse, IInitialAuthSliceState, User } from "../utils/types";
import { registerUser } from "./asyncThunks";

const initialState: IInitialAuthSliceState = {
  user: {} as User,
  tokens: {} as Pick<AuthRegResponse, "accessToken" | "refreshToken">,
  authFetchStatus: "idle",
};

export const authSlice = createSlice({
  name: "services/authSlice",
  initialState,
  reducers: {
    saveCurrentUser(state, { payload }: PayloadAction<User>) {
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      registerUser.fulfilled,
      (state, { payload }: PayloadAction<AuthRegResponse>) => {
        state.user = payload.user;
        state.tokens = {
          refreshToken: payload.refreshToken,
          accessToken: payload.accessToken,
        };
      },
    );
  },
});

export const userSelector = createSelector(
  (state: RootState) => state.auth.user,
  (user) => user,
);

export const { saveCurrentUser } = authSlice.actions;

export default authSlice.reducer;
