import { AuthRegResponse, Tokens } from './types'

export const SESSSION_STORAGE_KEYS = {
    ACCESS_TOKEN: 'ACCESS_TOKEN',
    REFRESH_TOKEN: 'REFRESH_TOKEN'
} as const

export const setSessionItem = (key: keyof typeof SESSSION_STORAGE_KEYS, value: string): void => {
    sessionStorage.setItem(key, value)
}

export const destroySessionItem = (key: keyof typeof SESSSION_STORAGE_KEYS): void => {
    sessionStorage.removeItem(key)
}

export const setTokens = (payload: AuthRegResponse): void => {
    setSessionItem('ACCESS_TOKEN', payload.accessToken)
    setSessionItem('REFRESH_TOKEN', payload.refreshToken)
}

export const destroyTokens = (): void => {
    destroySessionItem('REFRESH_TOKEN')
    destroySessionItem('ACCESS_TOKEN')
}

export const getTokens = (): Tokens | undefined => {
    const refreshToken = sessionStorage.getItem(SESSSION_STORAGE_KEYS.REFRESH_TOKEN)
    const accessToken = sessionStorage.getItem(SESSSION_STORAGE_KEYS.ACCESS_TOKEN)
    const accessTokenWithoutBearer = accessToken?.split(' ')[1]

    if (!refreshToken || !accessToken) {
        return undefined
    }

    return {
        refreshToken,
        accessToken,
        accessTokenWithoutBearer
    }
}
