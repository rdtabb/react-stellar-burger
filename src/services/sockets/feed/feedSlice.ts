import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'

import { RootState } from '@store/store'
import { filterOrders } from '@utils/ordersUtils'

import { SocketResponse, HTTPStatus } from '../types'

interface InitialState extends SocketResponse {
    socketConnectionStatus: HTTPStatus
}

const initialState: InitialState = {
    socketConnectionStatus: HTTPStatus.STALE
}

const feedSlice = createSlice({
    name: 'services/feedSlice',
    initialState,
    reducers: {
        feedWsConnectionInit(state) {
            state.socketConnectionStatus = HTTPStatus.PENDING
        },
        feedWsConnectionSuccess(state, { payload }: PayloadAction<SocketResponse>) {
            state.total = payload.total
            state.orders = payload.orders
            state.totalToday = payload.totalToday
            state.socketConnectionStatus = HTTPStatus.SUCCESS
        },
        feedWsConnectionFail(state) {
            state.socketConnectionStatus = HTTPStatus.ERROR
        },
        feedWsConnectionClose(state) {
            state.socketConnectionStatus = HTTPStatus.STALE
        }
    }
})

export const feedOrdersSelector = createSelector(
    [
        (state: RootState) => state.feed.orders,
        (state: RootState) => state.feed.socketConnectionStatus
    ],
    (orders, status) => ({
        orders: orders,
        status: status
    })
)

export const feedStatusSelector = createSelector(
    (state: RootState) => state.feed.socketConnectionStatus,
    (status) => status
)

export const feedInfoSelector = createSelector(
    (state: RootState) => state.feed,
    (feed) => ({
        total: feed.total,
        totalToday: feed.totalToday,
        done: filterOrders(feed, true),
        inProgress: filterOrders(feed, false),
        isLoading: feed.socketConnectionStatus === HTTPStatus.PENDING
    })
)

export const {
    feedWsConnectionFail,
    feedWsConnectionInit,
    feedWsConnectionClose,
    feedWsConnectionSuccess
} = feedSlice.actions

export default feedSlice.reducer
