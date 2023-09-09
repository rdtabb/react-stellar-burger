import { ReactNode } from "react";

export interface Ingredient {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: "bun" | "main" | "sauce";
  __v: number;
  _id: string;
}

export interface Response {
  success: boolean;
  data: Ingredient[];
}

export interface InitialReducerState {
  ingredients?: Ingredient[];
  isLoading: boolean;
  isError: boolean;
}

export const enum REDUCER_ACTION_TYPE {
  FETCHINGREDIENTS_INIT,
  FETCHINGREDIENTS_SUCCESS,
  FETCHINGREDIENTS_FAIL,
  FETCHINGREDIENTS_CLEAN,
}

export interface Children {
  children: ReactNode | ReactNode[];
}

export interface ReducerAction {
  type: REDUCER_ACTION_TYPE;
  payload?: Ingredient[];
}

export {};
