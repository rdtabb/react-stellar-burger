import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  isIngredientInfoOpen: boolean;
  isAcceptedOrderOpen: boolean;
}

const initialState: IInitialState = {
  isIngredientInfoOpen: false,
  isAcceptedOrderOpen: false,
};

const modalSlice = createSlice({
  name: "services/modalSlice",
  initialState,
  reducers: {
    setIsIngredientInfoOpen(state, { payload }: PayloadAction<boolean>) {
      state.isIngredientInfoOpen = payload;
    },
    setIsAccceptedOrderOpen(state, { payload }: PayloadAction<boolean>) {
      state.isAcceptedOrderOpen = payload;
    },
  },
});

export const { setIsIngredientInfoOpen, setIsAccceptedOrderOpen } =
  modalSlice.actions;

export default modalSlice.reducer;
