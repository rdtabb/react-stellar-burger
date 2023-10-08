import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { ModalType } from "../utils/types";

interface IInitialState {
  openPopupType: ModalType;
}

const initialState: IInitialState = {
  openPopupType: "closed",
};

const modalSlice = createSlice({
  name: "services/modalSlice",
  initialState,
  reducers: {
    setPopupState(state, { payload }: PayloadAction<ModalType>) {
      state.openPopupType = payload;
    },
  },
});

export const openPopupTypeSelector = () =>
  createSelector(
    (state: RootState) => state.modal,
    (modal) => modal.openPopupType,
  );

export const { setPopupState } = modalSlice.actions;

export default modalSlice.reducer;
