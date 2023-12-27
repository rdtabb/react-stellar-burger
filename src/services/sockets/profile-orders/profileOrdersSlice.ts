import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@store/store'

import { SocketResponse } from '../types'

const initialState: SocketResponse = {}

export const profileOrdersSlice = createSlice({
    name: 'sockets/state/profileOrders',
    initialState,
    reducers: {
        updateProfileOrders(state, { payload }: PayloadAction<SocketResponse>) {
            state.orders = payload.orders
            state.total = payload.total
            state.totalToday = payload.totalToday
        }
    }
})

export const profileOrdersSelector = createSelector(
    (state: RootState) => state.profileOrders.orders,
    (orders) => orders
)

export const { updateProfileOrders } = profileOrdersSlice.actions

export default profileOrdersSlice.reducer
