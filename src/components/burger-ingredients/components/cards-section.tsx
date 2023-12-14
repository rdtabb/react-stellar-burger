import { forwardRef, memo } from 'react'

import { Ingredient } from '@utils/types'

import { IngredientCard } from './ingredient-card'

import styles from '../burgerIngredients.module.css'
import { LoadingIngredients, ErrorIngredients } from '../states'

interface CardsSectionProps {
    title: string
    ingredients?: Ingredient[]
    isLoading: boolean
    isError: boolean
}

export const CardsSection = memo(
    forwardRef((props: CardsSectionProps, ref: any) => (
        <div ref={ref}>
            <h2 className={styles.card__header}>{props.title}</h2>
            <div className={styles.container}>
                {props.isLoading ? (
                    <LoadingIngredients />
                ) : props.isError ? (
                    <ErrorIngredients />
                ) : (
                    <>
                        {props.ingredients?.map((item) => (
                            <IngredientCard key={item._id} item={item} />
                        ))}
                    </>
                )}
            </div>
        </div>
    ))
)
