import { useMemo } from 'react'

import { useGetIngredientsQuery } from '@services/index'
import { CACHE_KEYS } from '@utils/api'

interface UseOrderIngredients {
    images: string[]
    price: number
}

export const useOrderIngredients = (ids?: string[]): UseOrderIngredients => {
    const { data } = useGetIngredientsQuery(CACHE_KEYS.INGREDIENTS)

    return useMemo(() => {
        const images: string[] = []
        let price = 0

        ids?.forEach((id) => {
            data?.data.forEach((ingredient) => {
                if (ingredient._id === id) {
                    images.push(ingredient.image_mobile)
                    price += ingredient.price
                }
            })
        })

        return {
            images,
            price
        }
    }, [ids, data?.data])
}

export const useBaddie = (ids?: string[]): UseOrderIngredients => {
    const { data } = useGetIngredientsQuery(CACHE_KEYS.INGREDIENTS)

    const images: string[] = []
    let price = 0

    ids?.forEach((id) => {
        data?.data.forEach((ingredient) => {
            if (ingredient._id === id) {
                images.push(ingredient.image_mobile)
                price += ingredient.price
            }
        })
    })

    return {
        images,
        price
    }
}
