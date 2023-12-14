import { Urls } from './types'

export const BASE_URL = 'https://norma.nomoreparties.space/api'
export const BASE_AUTH_URL = `${BASE_URL}/auth`

export const CACHE_KEYS = {
    INGREDIENTS: 'INGREDIENTS',
    ORDER_INFO: 'ORDER_INFO',
    USER_INFO: 'USER_INFO'
} as const

export const URLS: Urls = {
    POST_ORDER_URL: `${BASE_URL}/orders`,
    FETCH_INGREDIENTS: `${BASE_URL}/ingredients`,
    AUTH_URL: `${BASE_AUTH_URL}/login`,
    GET_USER_INFO_URL: `${BASE_AUTH_URL}/user`,
    REGISTER_URL: `${BASE_AUTH_URL}/register`,
    SIGNOUT_URL: `${BASE_AUTH_URL}/logout`,
    UPDATE_TOKEN_URL: `${BASE_AUTH_URL}/token`,
    RESET_PASSWORD_EMAIL_STAGE: `${BASE_URL}/password-reset`,
    RESET_PASSWORD_TOKEN_STAGE: `${BASE_URL}/password-reset/reset`
} as const

export const ROUTES = {
    CONSTRUCTOR: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    PROFILE: '/profile',
    RESET_PASSWORD: '/reset-password',
    INGREDIENT_DETAILS: '/ingredient',
    ORDERS_HISTORY: '/orders-history',
    EXIT: '/exit'
} as const

export const headers = {
    'Content-Type': 'application/json'
} as const
