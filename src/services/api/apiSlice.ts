import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { store } from '@store/store'
import {
    BASE_URL,
    URLS,
    headers,
    Ingredient,
    AuthRegResponse,
    AuthPayload,
    ResetPasswordEmailStageResponse
} from '@utils/index'

import { setIsAuthChecked } from '../authSlice'

export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getIngredients: builder.query<{ data: Ingredient[] }, string>({
            query: () => URLS.FETCH_INGREDIENTS
        }),
        registerUser: builder.mutation<AuthRegResponse, AuthPayload>({
            query: (body) => ({
                url: URLS.REGISTER_URL,
                method: 'POST',
                body: body,
                headers
            })
        }),
        authenticateUser: builder.mutation<AuthRegResponse, AuthPayload>({
            query: (body) => ({
                url: URLS.AUTH_URL,
                method: 'POST',
                body,
                headers
            })
            // onQueryStarted: () => {
            //     store.dispatch(setIsAuthChecked(true))
            // }
        }),
        resetPasswordEmailStage: builder.mutation<
            ResetPasswordEmailStageResponse,
            { email: string }
        >({
            query: (body) => ({
                url: URLS.RESET_PASSWORD_EMAIL_STAGE,
                method: 'POST',
                body,
                headers
            })
        }),
        resetPasswordTokenStage: builder.mutation<
            ResetPasswordEmailStageResponse,
            { password: string; token: string }
        >({
            query: (body) => ({
                url: URLS.RESET_PASSWORD_TOKEN_STAGE,
                method: 'POST',
                body,
                headers
            })
        })
    })
})

export const {
    useGetIngredientsQuery,
    useRegisterUserMutation,
    useAuthenticateUserMutation,
    useResetPasswordEmailStageMutation,
    useResetPasswordTokenStageMutation,
    usePrefetch: useIngredientsPrefetch
} = apiSlice
