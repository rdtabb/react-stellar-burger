/* eslint-disable prefer-spread */
import React, { memo, useMemo } from 'react'

import css from './order-item-info.module.css'

interface IngredientsListLoadingProps {
    howManyShouldRender?: number | null
}

export const IngredientsListLoading = memo(
    ({ howManyShouldRender }: IngredientsListLoadingProps): JSX.Element => {
        const loadingElements = useMemo((): number[] => {
            return Array.apply(null, Array(howManyShouldRender ?? 5)).map((x, i) => i)
        }, [howManyShouldRender])

        return (
            <>
                {loadingElements.map((_, index) => (
                    <li key={index} className={css['item--empty']}></li>
                ))}
            </>
        )
    }
)
