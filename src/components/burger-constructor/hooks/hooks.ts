import { useCallback, useMemo } from 'react'

import { useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'

import {
    addConstructorBun,
    addConstructorIngredient
} from '@services/create-order-slice/orderSlice'
import { DRAGNDROP_TYPES, Ingredient } from '@utils/types'

export const useConstructorDnd = () => {
    const dispatch = useDispatch()

    const [{ isOver }, ingridientDropRef] = useDrop(() => ({
        accept: DRAGNDROP_TYPES.ingredients,
        drop: (item: Ingredient) => {
            handleDrop(item)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    }))

    const [, sortRef] = useDrop(() => ({
        accept: DRAGNDROP_TYPES.constructorElements
    }))

    const handleDrop = useCallback((item: Ingredient) => {
        if (item.type === 'bun') {
            dispatch(addConstructorBun(item))
        } else {
            dispatch(addConstructorIngredient(item))
        }
    }, [])

    const boxShadow = useMemo(() => (isOver ? '0 0 23px 15px var(--clr-accent)' : 'none'), [isOver])

    return useMemo(
        () => ({
            ingridientDropRef,
            sortRef,
            boxShadow
        }),
        [ingridientDropRef, sortRef, boxShadow]
    )
}
