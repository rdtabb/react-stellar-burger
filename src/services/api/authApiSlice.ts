import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    createApi,
    fetchBaseQuery
} from '@reduxjs/toolkit/query/react'

import { RootState } from '@store/store'
import {
    URLS,
    BASE_URL,
    headers,
    getTokens,
    setTokens,
    type AuthRegResponse,
    type FetchUserResponse,
    type Order,
    type UserPayload,
    CACHE_KEYS
} from '@utils/index'

import { initAuthCheck } from '../authSlice'

const baseQueryWithReauth: BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    let result = await fetchBaseQuery({ baseUrl: BASE_URL })(args, api, extraOptions)

    if (result.error && result.error.status === 403) {
        const state = api.getState() as RootState

        const refreshToken = state.auth.tokens?.refreshToken

        const refreshResult = (await fetchBaseQuery({ baseUrl: BASE_URL })(
            {
                method: 'POST',
                url: URLS.UPDATE_TOKEN_URL,
                body: {
                    token: refreshToken
                }
            },
            api,
            extraOptions
        )) as unknown as { data: AuthRegResponse }

        if (refreshResult.data.success) {
            setTokens(refreshResult.data)
            api.dispatch(initAuthCheck())

            result = await fetchBaseQuery({ baseUrl: BASE_URL })(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                {
                    ...args,
                    headers: {
                        ...headers,
                        Authorization: refreshResult.data.accessToken
                    }
                },
                api,
                extraOptions
            )
        }
    }
    return result
}

export const authApiSlice = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: [CACHE_KEYS.USER_INFO],
    keepUnusedDataFor: 30,
    refetchOnFocus: false,
    endpoints: (builder) => ({
        createOrder: builder.mutation<Order, (string | undefined)[]>({
            query: (ids: (string | undefined)[]) => ({
                url: URLS.POST_ORDER_URL,
                headers: {
                    ...headers,
                    Authorization: getTokens()?.accessToken
                },
                method: 'POST',
                body: { ingredients: ids }
            })
        }),
        userInfo: builder.query<FetchUserResponse | undefined, string>({
            query: () => ({
                url: URLS.GET_USER_INFO_URL,
                headers: {
                    ...headers,
                    Authorization: getTokens()?.accessToken
                },
                method: 'GET'
            }),
            onQueryStarted() {
                // до установки плагинов eslint это работало как надо, теперь крашится сборка
                // so what the fuck?
                // store.dispatch(setIsAuthChecked(true))
            },
            providesTags: () => [CACHE_KEYS.USER_INFO]
        }),
        changeUserInfo: builder.mutation<FetchUserResponse | undefined, UserPayload>({
            query: (body) => ({
                url: URLS.GET_USER_INFO_URL,
                headers: {
                    ...headers,
                    Authorization: getTokens()?.accessToken
                },
                body,
                method: 'PATCH'
            }),
            invalidatesTags: () => [CACHE_KEYS.USER_INFO]
        })
    })
})

export const { useUserInfoQuery, useCreateOrderMutation, useChangeUserInfoMutation } = authApiSlice
