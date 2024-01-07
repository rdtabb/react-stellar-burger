import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@store/store'

import { SocketResponse, HTTPStatus } from '../types'

interface InitialState extends SocketResponse {
    socketConnectionStatus: HTTPStatus
}

const initialState: InitialState = {
    socketConnectionStatus: HTTPStatus.STALE
}

export const profileOrdersSlice = createSlice({
    name: 'sockets/state/profileOrders',
    initialState,
    reducers: {
        profileWsConnectionInit(state) {
            state.socketConnectionStatus = HTTPStatus.PENDING
        },
        profileWsConnectionSuccess(state, { payload }: PayloadAction<SocketResponse>) {
            state.total = payload.total
            state.orders = payload.orders
            state.totalToday = payload.totalToday
            state.socketConnectionStatus = HTTPStatus.SUCCESS
        },
        profileWsConnectionFail(state) {
            state.socketConnectionStatus = HTTPStatus.ERROR
        },
        profileWsConnectionClose(state) {
            state.total = null
            state.totalToday = null
            state.orders = null
            state.socketConnectionStatus = HTTPStatus.STALE
        }
    }
})

export const profileOrdersSelector = createSelector(
    [
        (state: RootState) => state.profileOrders.orders,
        (state: RootState) => state.profileOrders.socketConnectionStatus
    ],
    (orders, status) => ({ orders, status })
)

export const {
    profileWsConnectionInit,
    profileWsConnectionFail,
    profileWsConnectionClose,
    profileWsConnectionSuccess
} = profileOrdersSlice.actions

export default profileOrdersSlice.reducer
