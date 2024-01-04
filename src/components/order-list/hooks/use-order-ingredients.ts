import { useGetIngredientsQuery } from '@services/index'
import { CACHE_KEYS, type Ingredient } from '@utils/index'

interface UseOrderIngredients {
    ingredients: Ingredient[]
    price: number
}

export const useOrderIngredients = (ids?: string[]): UseOrderIngredients => {
    const { data } = useGetIngredientsQuery(CACHE_KEYS.INGREDIENTS)

    const ingredients: Ingredient[] = []
    let price = 0

    ids?.forEach((id) => {
        data?.data.forEach((ingredient) => {
            if (ingredient._id === id) {
                ingredients.push(ingredient)
                price += ingredient.price
            }
        })
    })

    return {
        ingredients,
        price
    }
}
