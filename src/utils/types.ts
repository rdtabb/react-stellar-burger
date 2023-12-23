import { ReactNode } from 'react'

import modalStyles from '../components/Modal/modal.module.css'

//----------------------------------------
// Initial states of slices
//----------------------------------------

export interface IInitialAuthSliceState {
    user?: User
    tokens?: Tokens
    isAuthChecked?: boolean
}

export interface IInitialOrderSliceState {
    constructorBun?: Ingredient
    constructorIngredients: IngredientWithUniqueId[]
}

export interface IInitialModalSliceState {
    openPopupType: ModalType
    popupClass: ModalClass
}

export interface IInitialIngredientSliceState {
    selectedTab: Tab
}

//----------------------------------------
// Core types
//----------------------------------------

export interface User {
    email: string
    name: string
}

export interface Ingredient {
    calories: number
    carbohydrates: number
    fat: number
    image: string
    image_large: string
    image_mobile: string
    name: string
    price: number
    proteins: number
    type: 'bun' | 'main' | 'sauce'
    __v: number
    _id: string
}

export interface IngredientWithUniqueId extends Ingredient {
    uniqueId: string
}

export interface Order {
    name: string
    order: {
        number: number
    }
    success: boolean
}

export interface Children {
    children: ReactNode | ReactNode[]
}

export type ModalType = 'order' | 'info' | 'closed'

export type FetchStatus = 'idle' | 'success' | 'loading' | 'failed'

export type Tab = 'buns' | 'mains' | 'sauces'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type ModalClass = modalStyles.modal | modalStyles.modalActive

//----------------------------------------
// Api types
//----------------------------------------

export interface Urls {
    POST_ORDER_URL: string
    FETCH_INGREDIENTS: string
    AUTH_URL: string
    GET_USER_INFO_URL: string
    REGISTER_URL: string
    SIGNOUT_URL: string
    UPDATE_TOKEN_URL: string
    RESET_PASSWORD_EMAIL_STAGE: string
    RESET_PASSWORD_TOKEN_STAGE: string
    ORDERS: string
}

export interface Tokens {
    refreshToken: string
    accessToken: string
}

export interface FetchIngredientsResponse {
    success: boolean
    data: Ingredient[]
}

export interface AuthRegResponse {
    success: boolean
    user: User
    accessToken: string
    refreshToken: string
}

export interface RefreshResponse {
    success: boolean
    accessToken: string
    refreshToken: string
}

export interface FetchUserResponse {
    success: boolean
    user: User
}

export interface UserPayload extends User {
    password: string
}

export interface ResetPasswordEmailStageResponse {
    success: boolean
    message: string
}

export type AuthPayload = Pick<UserPayload, 'password' | 'email'>

export interface UpdateTokenPayload {
    token: string
}

export interface UpdateTokenResponse {
    success: boolean
    refreshToken: string
    accessToken: string
}

//----------------------------------------
// Drag and drop types
//----------------------------------------

export interface MoveIngredientsPayload {
    hoverIndex: number
    dragIndex: number
}

export interface DragItem {
    id: string
    index: number
}

export const DRAGNDROP_TYPES = {
    ingredients: 'INGREDIENTS',
    constructorElements: 'CONSTRUCTOR_ELEMENTS'
}

export {}
