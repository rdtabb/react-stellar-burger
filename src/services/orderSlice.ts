import {
  createSlice,
  createSelector,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import {
  Ingredient,
  CreateOrderResponse,
  Order,
  CreateOrderFetchStatus,
} from "../utils/types";
import { RootState } from "../store/store";

const POST_ORDER_URL = "https://norma.nomoreparties.space/api/orders";

export const createOrder = createAsyncThunk(
  "services/orderSlice/createOrder",
  async (ids: (string | undefined)[]): Promise<Order> => {
    const requestBody = {
      ingredients: ids,
    };
    console.log(JSON.stringify(requestBody));
    const response = await fetch(POST_ORDER_URL, {
      body: JSON.stringify(requestBody),
      method: "POST",
    });
    if (!response.ok) {
      throw new Error(
        `Order fetch failed with response status: ${response.status}`,
      );
    }
    const data: CreateOrderResponse = await response.json();
    console.log(data);
    return data;
  },
);

interface IInitialState {
  constructorBun?: Ingredient;
  constructorIngredients: Ingredient[];
  constructorIngredientsIds: string[];
  orderData?: Order;
  orderFetchStatus: CreateOrderFetchStatus;
}

const initialState: IInitialState = {
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
    addConstructorIngredient(state, { payload }: PayloadAction<Ingredient>) {
      state.constructorIngredients.push(payload);
    },
    removeConstructorIngredient(state, { payload }: PayloadAction<string>) {
      const filteredIngredients = state.constructorIngredients.filter(
        (item) => item._id !== payload,
      );
      state.constructorIngredients = filteredIngredients;
    },
    addConstructorBun(state, { payload }: PayloadAction<Ingredient>) {
      state.constructorBun = payload;
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
      builder.addCase(createOrder.fulfilled, (state) => {
        state.orderFetchStatus = "success";
      });
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

export const {
  addConstructorIngredient,
  addConstructorBun,
  removeConstructorIngredient,
} = orderSlice.actions;

export default orderSlice.reducer;
