import { memo } from 'react'

import { IngredientWithUniqueId } from '@utils/types'

import { BunConstructorElement } from './BunConstructorElement'
import DraggableConstructorElement from './DraggableConstructorElement'

import styles from '../burgerConstructor.module.css'

interface IngredientsProps {
    ingredients?: IngredientWithUniqueId[]
}

export const Ingredients = memo(
    ({ ingredients }: IngredientsProps): JSX.Element => (
        <>
            <BunConstructorElement type="top" />
            {ingredients?.length ? (
                <div className={styles.draggableElements}>
                    {ingredients.map((item, index) => (
                        <DraggableConstructorElement
                            key={item.uniqueId}
                            item={item}
                            index={index}
                        />
                    ))}
                </div>
            ) : (
                <div className={styles.draggableElementsEmpty}>
                    <p>Добавьте ингредиенты</p>
                </div>
            )}
            <BunConstructorElement type="bottom" />
        </>
    )
)
