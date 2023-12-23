import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { URLS } from '@utils/index'

import { updateFeed } from './feedSlice'

export const ordersWsApi = createApi({
    reducerPath: 'ordersWsApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => 'getOrders',
            onQueryStarted(arg, api) {
                const ws = new WebSocket(URLS.ORDERS)

                try {
                    ws.addEventListener('message', (event: MessageEvent) => {
                        const data = JSON.parse(event.data)

                        api.dispatch(updateFeed(data))
                        console.log(data)
                        // ordersWsApi.util.updateQueryData('getOrders', undefined, (draft) => {
                        //     console.log('OH MY FUCKING GOD')
                        //     console.log(draft, data)
                        //     draft = data
                        // })
                    })
                } catch (error) {
                    console.log(error)
                }

                // ws.close()
            }
        })
    })
})

export const { useGetOrdersQuery } = ordersWsApi
