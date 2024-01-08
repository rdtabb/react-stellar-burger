import { useGetIngredientsQuery } from '@services/index'
import { CACHE_KEYS, type Ingredient } from '@utils/index'

export type IngredientsCounted = Record<string, Ingredient & { count: number }>

interface UseOrderIngredients {
    ingredients: Ingredient[]
    countedIngredients: IngredientsCounted
    price: number
}

export const useOrderIngredients = (ids?: string[]): UseOrderIngredients => {
    const { data } = useGetIngredientsQuery(CACHE_KEYS.INGREDIENTS)

    const countedIngredients = {} as IngredientsCounted
    const ingredients: Ingredient[] = []
    let price = 0

    ids?.forEach((id) => {
        data?.data.forEach((ingredient) => {
            if (ingredient._id === id) {
                ingredients.push(ingredient)
                price += ingredient.price
                if (countedIngredients[ingredient._id]) {
                    countedIngredients[ingredient._id].count += 1
                } else {
                    countedIngredients[ingredient._id] = {
                        ...ingredient,
                        count: 1
                    }
                }
            }
        })
    })

    return {
        ingredients,
        countedIngredients,
        price
    }
}
