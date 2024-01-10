import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit'

import { AuthRegResponse, IInitialAuthSliceState, getTokens, destroyTokens } from '@utils/index'

import { RootState } from '../../store/store'

const initialState: IInitialAuthSliceState = {
    tokens: undefined,
    user: undefined
}

export const authSlice = createSlice({
    name: 'services/authSlice',
    initialState,
    reducers: {
        initAuthCheck(state) {
            const tokens = getTokens()
            if (!tokens) {
                return state
            }
            state.tokens = tokens
        },
        setAuthInfo(state, { payload }: PayloadAction<AuthRegResponse>) {
            state.user = payload.user
            state.tokens = {
                accessToken: payload.accessToken,
                refreshToken: payload.refreshToken
            }
        },
        destroyAuthInfo(state) {
            destroyTokens()
            state.user = undefined
            state.tokens = undefined
        }
    }
})

export const authInfoSelector = createSelector(
    [(state: RootState) => state.auth.tokens],
    (tokens) => ({
        tokens,
        isAuth: !!tokens
    })
)

export const { initAuthCheck, setAuthInfo, destroyAuthInfo } = authSlice.actions

export default authSlice.reducer
