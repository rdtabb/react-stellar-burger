import React from 'react'

import { useLocation } from 'react-router-dom'

import { Ingredient } from '../../utils'

interface Location {
    state: {
        item: Ingredient | null
    }
}

export const useSelectedItem = (): Ingredient | null => {
    const { state }: Location = useLocation()

    return state?.item
}
