import { useMemo } from 'react'

import { useLocation, useParams } from 'react-router-dom'

import { useGetIngredientsQuery } from '@services/index'
import { CACHE_KEYS, Ingredient } from '@utils/index'

interface Location {
    state: {
        item: Ingredient | null
    }
}

interface Params extends Record<string, string | undefined> {
    id: string
}

export const useSelectedItem = (): Ingredient | undefined => {
    const { data } = useGetIngredientsQuery(CACHE_KEYS.INGREDIENTS)

    const { state }: Location = useLocation()
    const { id } = useParams<Params>()

    const searchedItem = useMemo(
        (): Ingredient | undefined => data?.data.find((ingredient) => ingredient._id === id),
        [data?.data]
    )

    return state?.item ?? searchedItem
}
