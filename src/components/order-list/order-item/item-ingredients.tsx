import React, { memo } from 'react'

import { Ingredient } from '@utils/types'

import styles from '../order-list.module.css'

interface ItemIngredientsProps {
    ingredients: Ingredient[]
}

export const ItemIngredients = memo(({ ingredients }: ItemIngredientsProps) => (
    <ul className={styles['image-list']}>
        {ingredients.length <= 6
            ? ingredients?.map((ingredient, index) => (
                  <li
                      key={index}
                      className={styles['image-list__item']}
                      style={{
                          zIndex: 100 - index
                      }}
                  >
                      <img
                          className={styles['image-list__image']}
                          src={ingredient.image_mobile}
                          alt="ingredient"
                          height="64px"
                          width="64px"
                      />
                  </li>
              ))
            : ingredients?.slice(0, 6).map((ingredient, index) => (
                  <li
                      key={index}
                      className={styles['image-list__item']}
                      style={{
                          zIndex: 100 - index
                      }}
                  >
                      <img
                          className={styles['image-list__image']}
                          src={ingredient.image_mobile}
                          alt="ingredient"
                          height="64px"
                          width="64px"
                      />
                      {index === 5 && <p className={styles.remainder}>+{ingredients.length - 6}</p>}
                  </li>
              ))}
    </ul>
))
