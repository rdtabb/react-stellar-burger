import { PayloadAction, ActionCreatorWithoutPayload } from '@reduxjs/toolkit'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { Middleware } from 'redux'

import { SocketResponse } from '@services/index'
import { getTokens } from '@utils/sessionStorage'

interface SocketMiddlewareConfig {
    url: {
        wsUrl: string
        provideAuthParams?: boolean
    }
    actions: {
        connectionInitType: string
        connectionCloseType: string
        connectionSuccess: ActionCreatorWithPayload<SocketResponse, string>
        connectionFail: ActionCreatorWithoutPayload<string>
    }
}

export const socketMiddleware =
    ({
        url: { wsUrl, provideAuthParams },
        actions: { connectionInitType, connectionCloseType, connectionSuccess, connectionFail }
    }: SocketMiddlewareConfig): Middleware =>
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
