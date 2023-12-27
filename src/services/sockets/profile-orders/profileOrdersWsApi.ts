import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { URLS, getTokens } from '@utils/index'

import { updateProfileOrders } from './profileOrdersSlice'

export const profileOrdersWsApi = createApi({
    reducerPath: 'profileOrdersWsApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    endpoints: (builder) => ({
        profileOrders: builder.query({
            query: () => 'profileOrders',
            onQueryStarted(arg, api) {
                const tokens = getTokens()

                const ws = new WebSocket(
                    `${URLS.PROFILE_ORDERS}?token=${tokens?.accessTokenWithoutBearer}`
                )

                try {
                    ws.addEventListener('message', (event: MessageEvent) => {
                        const data = JSON.parse(event.data)

                        api.dispatch(updateProfileOrders(data))
                    })
                } catch (error) {
                    console.error(error)
                }
            }
        })
    })
})

export const { useProfileOrdersQuery } = profileOrdersWsApi
