import { ReactNode } from "react";
import modalStyles from "../components/Modal/modal.module.css";

export interface IInitialOrderSliceState {
  constructorBun?: Ingredient;
  constructorIngredients: IngredientWithUniqueId[];
  constructorIngredientsIds: string[];
  orderData?: Order;
  orderFetchStatus: FetchStatus;
  error?: string;
}

export interface IInitialModalSliceState {
  openPopupType: ModalType;
  popupClass: ModalClass;
}

export interface IInitialIngredientSliceState {
  ingredients?: Ingredient[];
  selectedIngredient?: Ingredient;
  ingredientsFetchState: FetchStatus;
  selectedTab: Tab;
}

// @ts-ignore
export type ModalClass = modalStyles.modal | modalStyles.modalActive;

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

export interface IngredientWithUniqueId extends Ingredient {
  uniqueId: string;
}

export interface MoveIngredientsPayload {
  hoverIndex: number;
  dragIndex: number;
}

export interface DragItem {
  id: string;
  index: number;
}

export interface FetchIngredientsResponse<T> {
  success: boolean;
  data: T[];
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

export type FetchStatus = "idle" | "success" | "loading" | "failed";

export type Tab = "buns" | "mains" | "sauces";

export {};
