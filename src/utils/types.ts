import { ReactNode } from "react";

export type ModalType = "order" | "info" | "closed";

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

export interface FetchIngredientsResponse {
  success: boolean;
  data: Ingredient[];
}

export interface CreateOrderResponse {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
}

export interface Order extends CreateOrderResponse {}

export const DRAGNDROP_TYPES = {
  ingredients: "INGREDIENTS",
  constructorElements: "CONSTRUCTOR_ELEMENTS",
} as const;

export interface Children {
  children: ReactNode | ReactNode[];
}

export type IngredientsFetchStatus = "idle" | "success" | "loading" | "failed";
export type CreateOrderFetchStatus = "idle" | "success" | "loading" | "failed";

export type Tab = "buns" | "mains" | "sauces";

export {};
