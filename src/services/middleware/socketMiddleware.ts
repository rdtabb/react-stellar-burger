import {
    PayloadAction,
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload
} from '@reduxjs/toolkit'
import { Middleware } from 'redux'

import { getTokens } from '@utils/sessionStorage'

interface SocketMiddlewareConfig<TResponse> {
    url: {
        wsUrl: string
        provideAuthParams?: boolean
    }
    actions: {
        connectionInitType: string
        connectionCloseType: string
        connectionSuccess: ActionCreatorWithPayload<TResponse, string>
        connectionFail: ActionCreatorWithoutPayload<string>
    }
}

export const socketMiddleware =
    <TResponse>({
        url: { wsUrl, provideAuthParams },
        actions: { connectionInitType, connectionCloseType, connectionSuccess, connectionFail }
    }: SocketMiddlewareConfig<TResponse>): Middleware =>
    (store) => {
        let socket: WebSocket | null = null
        let url: string

        return (next) => (action) => {
            const { dispatch } = store
            const { type } = action as PayloadAction<unknown>

            if (type === connectionInitType && !socket) {
                if (provideAuthParams) {
                    url = `${wsUrl}?token=${getTokens()?.accessTokenWithoutBearer}`
                } else {
                    url = wsUrl
                }
                socket = new WebSocket(url)
            }

            if (socket) {
                if (type === connectionCloseType) {
                    socket.close()
                }

                socket.addEventListener('message', (event: MessageEvent) => {
                    const data = JSON.parse(event.data)

                    if (!data.success) {
                        dispatch(connectionFail())
                    } else {
                        dispatch(connectionSuccess(data))
                    }
                })
            }

            next(action)
        }
    }
