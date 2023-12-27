import { configureStore } from '@reduxjs/toolkit'

import authReducer from '@services/auth-slice/authSlice'
import ingredientsReducer from '@services/constructor-ingredients/ingredientsSlice'
import orderReducer from '@services/create-order-slice/orderSlice'
import { unauthApiSlice, authApiSlice, feedWsApi, profileOrdersWsApi } from '@services/index'
import modalReducer from '@services/modal-slice/modalSlice'
import feedReducer from '@services/sockets/feed/feedSlice'
import profileOrdersReducer from '@services/sockets/profile-orders/profileOrdersSlice'

export const store = configureStore({
    reducer: {
        ingredients: ingredientsReducer,
        modal: modalReducer,
        order: orderReducer,
        auth: authReducer,
        feed: feedReducer,
        profileOrders: profileOrdersReducer,
        [unauthApiSlice.reducerPath]: unauthApiSlice.reducer,
        [authApiSlice.reducerPath]: authApiSlice.reducer,
        [feedWsApi.reducerPath]: feedWsApi.reducer,
        [profileOrdersWsApi.reducerPath]: profileOrdersWsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            unauthApiSlice.middleware,
            authApiSlice.middleware,
            feedWsApi.middleware,
            profileOrdersWsApi.middleware
        )
})

export type RootState = ReturnType<typeof store.getState>
