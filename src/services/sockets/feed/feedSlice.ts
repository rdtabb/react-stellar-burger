import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'

import { RootState } from '@store/store'
import { filterOrders } from '@utils/ordersUtils'

import { SocketResponse } from '../types'

const initialState: SocketResponse = {}

const feedSlice = createSlice({
    name: 'services/feedSlice',
    initialState,
    reducers: {
        updateFeed(state, { payload }: PayloadAction<SocketResponse>) {
            state.orders = payload.orders
            state.total = payload.total
            state.totalToday = payload.totalToday
        }
    }
})

export const feedOrdersSelector = createSelector(
    (state: RootState) => state.feed,
    (feed) => feed.orders
)

export const feedInfoSelector = createSelector(
    (state: RootState) => state.feed,
    (feed) => ({
        total: feed.total,
        totalToday: feed.totalToday,
        done: filterOrders(feed, true),
        inProgress: filterOrders(feed, false)
    })
)

export const { updateFeed } = feedSlice.actions

export default feedSlice.reducer
