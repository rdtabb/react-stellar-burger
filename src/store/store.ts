import { configureStore } from '@reduxjs/toolkit'

import feedReducer from '@services/api/feedSlice'
import authReducer from '@services/authSlice'
import { apiSlice, authApiSlice, ordersWsApi } from '@services/index'
import ingredientsReducer from '@services/ingredientsSlice'
import modalReducer from '@services/modalSlice'
import orderReducer from '@services/orderSlice'

export const store = configureStore({
    reducer: {
        ingredients: ingredientsReducer,
        modal: modalReducer,
        order: orderReducer,
        auth: authReducer,
        feed: feedReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [authApiSlice.reducerPath]: authApiSlice.reducer,
        [ordersWsApi.reducerPath]: ordersWsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            apiSlice.middleware,
            authApiSlice.middleware,
            ordersWsApi.middleware
        )
})

export type RootState = ReturnType<typeof store.getState>
