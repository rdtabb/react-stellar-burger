import { Urls } from './types'

export const BASE_URL = 'https://norma.nomoreparties.space/api'
export const BASE_AUTH_URL = `${BASE_URL}/auth`
export const BASE_SOCKET_URL = 'wss://norma.nomoreparties.space'

export const CACHE_KEYS = {
    INGREDIENTS: 'INGREDIENTS',
    ORDER_INFO: 'ORDER_INFO',
    USER_INFO: 'USER_INFO',
    ORDERS: 'ORDERS',
    PROFILE_ORDERS: 'PROFILE_ORDERS'
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
    RESET_PASSWORD_TOKEN_STAGE: `${BASE_URL}/password-reset/reset`,
    ORDERS: `${BASE_SOCKET_URL}/orders/all`,
    PROFILE_ORDERS: `${BASE_SOCKET_URL}/orders`
} as const

export const ROUTES = {
    CONSTRUCTOR: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    PROFILE: '/profile/*',
    PROFILE_DETAILS: '/details',
    PROFILE_ORDERS: '/orders',
    RESET_PASSWORD: '/reset-password',
    INGREDIENT_DETAILS: '/ingredient',
    EXIT: '/exit',
    FEED: '/feed'
} as const

export const headers = {
    'Content-Type': 'application/json'
} as const
