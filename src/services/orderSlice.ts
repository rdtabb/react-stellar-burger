import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import {
  Ingredient,
  IngrdientWithUniqueId,
  Order,
  MoveIngredientsPayload,
  IInitialOrderSliceState,
} from "../utils/types";
import { createOrder } from "./asyncThunks";
import { RootState } from "../store/store";

const initialState: IInitialOrderSliceState = {
  constructorBun: undefined,
  constructorIngredients: [],
  constructorIngredientsIds: [],
  orderData: undefined,
  orderFetchStatus: "idle",
};

const orderSlice = createSlice({
  name: "services/orderSlice",
  initialState,
  reducers: {
    addConstructorIngredient(
      state,
      { payload }: PayloadAction<IngrdientWithUniqueId>,
    ) {
      state.constructorIngredients.push(payload);
    },
    removeConstructorIngredient(state, { payload }: PayloadAction<string>) {
      const filteredIngredients = state.constructorIngredients.filter(
        (item) => item.uniqueId !== payload,
      );
      state.constructorIngredients = filteredIngredients;
    },
    addConstructorBun(state, { payload }: PayloadAction<Ingredient>) {
      state.constructorBun = payload;
    },
    moveConstructorIngredient(
      state,
      { payload }: PayloadAction<MoveIngredientsPayload>,
    ) {
      const newIngredients = [...state.constructorIngredients];
      newIngredients.splice(
        payload.hoverIndex,
        0,
        newIngredients.splice(payload.dragIndex, 1)[0],
      );
      state.constructorIngredients = newIngredients;
    },
  },
  extraReducers: (builder) => {
    /* eslint-disable */
    builder.addCase(createOrder.pending, (state) => {
      state.orderFetchStatus = "loading";
    }),
      builder.addCase(createOrder.rejected, (state) => {
        state.orderFetchStatus = "failed";
      }),
      builder.addCase(
        createOrder.fulfilled,
        (state, { payload }: PayloadAction<Order>) => {
          state.orderData = payload;
          state.orderFetchStatus = "success";
          state.constructorBun = undefined;
          state.constructorIngredients = [];
        },
      );
  },
});

const rawSelectOrderSlice = (state: RootState) => state.order;
const rawSelectBun = (state: RootState) => state.order.constructorBun;
const rawSelectIngredients = (state: RootState) =>
  state.order.constructorIngredients;

export const bunSelector = createSelector(
  rawSelectOrderSlice,
  (order) => order.constructorBun,
);

export const ingredientsSelector = createSelector(
  rawSelectOrderSlice,
  (order) => order.constructorIngredients,
);

export const priceSelector = createSelector(
  [rawSelectBun, rawSelectIngredients],
  (bun, ingredients) =>
    ingredients.reduce((acc, curr) => acc + curr.price, 0) +
    (bun ? bun.price * 2 : 0),
);

export const quantitySelector = createSelector(
  [rawSelectOrderSlice, (state: RootState, item_id: string) => item_id],
  (orderSliceState, item_id) =>
    [
      orderSliceState.constructorBun,
      ...orderSliceState.constructorIngredients,
      orderSliceState.constructorBun,
    ].reduce((acc, curr) => (curr?._id === item_id ? acc + 1 : acc), 0),
);

export const idsSelector = createSelector(
  rawSelectOrderSlice,
  (orderSliceState) =>
    [
      ...orderSliceState.constructorIngredients,
      orderSliceState.constructorBun,
    ].map((item) => item?._id),
);

export const orderSelector = createSelector(
  rawSelectOrderSlice,
  (orderSliceState) => orderSliceState,
);

export const {
  addConstructorIngredient,
  addConstructorBun,
  removeConstructorIngredient,
  moveConstructorIngredient,
} = orderSlice.actions;

export default orderSlice.reducer;
