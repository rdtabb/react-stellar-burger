import { ReactNode } from "react";
import modalStyles from "../components/Modal/modal.module.css";

//----------------------------------------
// Initial states of slices
//----------------------------------------

export interface IInitialAuthSliceState {
  user?: User;
  tokens?: Tokens;
  authFetchStatus: FetchStatus;
  isCheckedAuth: boolean;
}

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

//----------------------------------------
// Core types
//----------------------------------------

export interface User {
  email: string;
  name: string;
}

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

export interface Order {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
}

export interface Children {
  children: ReactNode | ReactNode[];
}

export type ModalType = "order" | "info" | "closed";

export type FetchStatus = "idle" | "success" | "loading" | "failed";

export type Tab = "buns" | "mains" | "sauces";
// @ts-ignore
export type ModalClass = modalStyles.modal | modalStyles.modalActive;

//----------------------------------------
// Api types
//----------------------------------------

export interface Urls {
  POST_ORDER_URL: string;
  FETCH_INGREDIENTS: string;
  AUTH_URL: string;
  GET_USER_INFO_URL: string;
  REGISTER_URL: string;
  SIGNOUT_URL: string;
  UPDATE_TOKEN_URL: string;
}

export interface Tokens {
  refreshToken: string;
  accessToken: string;
}

export interface FetchIngredientsResponse {
  success: boolean;
  data: Ingredient[];
}

export interface AuthRegResponse {
  success: boolean;
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface FetchUserResponse {
  success: boolean;
  user: User;
}

export interface UserPayload extends User {
  password: string;
}

export type AuthPayload = Pick<UserPayload, "password" | "email">;

//----------------------------------------
// Drag and drop types
//----------------------------------------

export interface MoveIngredientsPayload {
  hoverIndex: number;
  dragIndex: number;
}

export interface DragItem {
  id: string;
  index: number;
}

export const DRAGNDROP_TYPES = {
  ingredients: "INGREDIENTS",
  constructorElements: "CONSTRUCTOR_ELEMENTS",
};

export {};
