import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'

import { RootState } from '@store/store'

export interface SocketOrder {
    createdAt: string
    ingredients: string[]
    number: number
    status: string
    updatedAt: string
    _id: string
}

export interface SocketResponse {
    success?: boolean
    total?: number
    totalToday?: number
    orders?: SocketOrder[]
}

const initialState: SocketResponse = {}

const feedSlice = createSlice({
    name: 'services/feedSlice',
    initialState,
    reducers: {
        updateFeed(state, { payload }: PayloadAction<SocketResponse>) {
            state.orders = payload.orders
        }
    }
})

export const socketSelector = createSelector(
    (state: RootState) => state.feed,
    (feed) => feed
)

export const { updateFeed } = feedSlice.actions

export default feedSlice.reducer
