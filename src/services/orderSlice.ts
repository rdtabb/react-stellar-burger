import { createSlice, createSelector, PayloadAction, nanoid } from '@reduxjs/toolkit'

import { RootState } from '@store/store'
import {
    Ingredient,
    IngredientWithUniqueId,
    MoveIngredientsPayload,
    IInitialOrderSliceState
} from '@utils/types'

const initialState: IInitialOrderSliceState = {
    constructorBun: undefined,
    constructorIngredients: []
}

const orderSlice = createSlice({
    name: 'services/orderSlice',
    initialState,
    reducers: {
        addConstructorIngredient(state, { payload }: PayloadAction<Ingredient>) {
            const uniqueIdItem: IngredientWithUniqueId = {
                ...payload,
                uniqueId: nanoid()
            }
            state.constructorIngredients.push(uniqueIdItem)
        },
        removeConstructorIngredient(state, { payload }: PayloadAction<string | undefined>) {
            const filteredIngredients = state.constructorIngredients.filter(
                (item) => item.uniqueId !== payload
            )
            state.constructorIngredients = filteredIngredients
        },
        addConstructorBun(state, { payload }: PayloadAction<Ingredient>) {
            state.constructorBun = payload
        },
        moveConstructorIngredient(state, { payload }: PayloadAction<MoveIngredientsPayload>) {
            const newIngredients = [...state.constructorIngredients]
            newIngredients.splice(
                payload.hoverIndex,
                0,
                newIngredients.splice(payload.dragIndex, 1)[0]
            )
            state.constructorIngredients = newIngredients
        },
        clearConstructorIngredients() {
            return initialState
        }
    }
})

const rawSelectOrderSlice = (state: RootState) => state.order
const rawSelectBun = (state: RootState) => state.order.constructorBun
const rawSelectIngredients = (state: RootState) => state.order.constructorIngredients

export const bunSelector = createSelector(rawSelectOrderSlice, (order) => order.constructorBun)

export const ingredientsSelector = createSelector(
    rawSelectOrderSlice,
    (order) => order.constructorIngredients
)

export const priceSelector = createSelector(
    [rawSelectBun, rawSelectIngredients],
    (bun, ingredients) =>
        ingredients.reduce((acc, curr) => acc + curr.price, 0) + (bun ? bun.price * 2 : 0)
)

export const quantitySelector = createSelector(
    [rawSelectOrderSlice, (state: RootState, item_id: string) => item_id],
    (orderSliceState, item_id) =>
        [
            orderSliceState.constructorBun,
            ...orderSliceState.constructorIngredients,
            orderSliceState.constructorBun
        ].reduce((acc, curr) => (curr?._id === item_id ? acc + 1 : acc), 0)
)

export const idsSelector = createSelector(rawSelectOrderSlice, (orderSliceState) =>
    [
        orderSliceState.constructorBun,
        ...orderSliceState.constructorIngredients,
        orderSliceState.constructorBun
    ].map((item) => item?._id)
)

export const {
    addConstructorIngredient,
    addConstructorBun,
    removeConstructorIngredient,
    moveConstructorIngredient,
    clearConstructorIngredients
} = orderSlice.actions

export default orderSlice.reducer
