import { configureStore } from '@reduxjs/toolkit'

import authReducer from '@services/auth-slice/authSlice'
import ingredientsReducer from '@services/constructor-ingredients/ingredientsSlice'
import orderReducer from '@services/create-order-slice/orderSlice'
import {
    feedWsConnectionSuccess,
    feedWsConnectionClose,
    feedWsConnectionInit,
    feedWsConnectionFail,
    profileWsConnectionSuccess,
    profileWsConnectionClose,
    profileWsConnectionFail,
    profileWsConnectionInit,
    unauthApiSlice,
    authApiSlice,
    socketMiddleware,
    SocketResponse
} from '@services/index'
import modalReducer from '@services/modal-slice/modalSlice'
import feedReducer from '@services/sockets/feed/feedSlice'
import profileOrdersReducer from '@services/sockets/profile-orders/profileOrdersSlice'
import { URLS } from '@utils/index'

export const store = configureStore({
    reducer: {
        ingredients: ingredientsReducer,
        modal: modalReducer,
        order: orderReducer,
        auth: authReducer,
        feed: feedReducer,
        profileOrders: profileOrdersReducer,
        [unauthApiSlice.reducerPath]: unauthApiSlice.reducer,
        [authApiSlice.reducerPath]: authApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            unauthApiSlice.middleware,
            authApiSlice.middleware,
            socketMiddleware<SocketResponse>({
                url: {
                    wsUrl: URLS.PROFILE_ORDERS,
                    provideAuthParams: true
                },
                actions: {
                    connectionInitType: profileWsConnectionInit.type,
                    connectionCloseType: profileWsConnectionClose.type,
                    connectionFail: profileWsConnectionFail,
                    connectionSuccess: profileWsConnectionSuccess
                }
            }),
            socketMiddleware<SocketResponse>({
                url: {
                    wsUrl: URLS.ORDERS
                },
                actions: {
                    connectionInitType: feedWsConnectionInit.type,
                    connectionCloseType: feedWsConnectionClose.type,
                    connectionFail: feedWsConnectionFail,
                    connectionSuccess: feedWsConnectionSuccess
                }
            })
        )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
