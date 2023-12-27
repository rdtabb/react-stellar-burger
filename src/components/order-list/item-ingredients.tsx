import React, { memo } from 'react'

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { useOrderIngredients } from './hooks/use-order-ingredients'
import styles from './order-list.module.css'

interface ItemIngredientsProps {
    ids?: string[]
}

export const ItemIngredients = memo(({ ids }: ItemIngredientsProps) => {
    const { images, price } = useOrderIngredients(ids)

    return (
        <div className={styles['item-ingredients']}>
            <ul className={styles['image-list']}>
                {images.length <= 6
                    ? images?.map((image, index) => (
                          <li
                              key={index}
                              className={styles['image-list__item']}
                              style={{
                                  zIndex: 100 - index
                              }}
                          >
                              <img
                                  className={styles['image-list__image']}
                                  src={image}
                                  alt="ingredient"
                              />
                          </li>
                      ))
                    : images?.slice(0, 6).map((image, index) => (
                          <li
                              key={index}
                              className={styles['image-list__item']}
                              style={{
                                  zIndex: 100 - index
                              }}
                          >
                              <img
                                  className={styles['image-list__image']}
                                  src={image}
                                  alt="ingredient"
                              />
                              {index === 5 && (
                                  <p className={styles.remainder}>+{images.length - 6}</p>
                              )}
                          </li>
                      ))}
            </ul>
            <div className={styles['price']}>
                <CurrencyIcon type="primary" />
                <p>{price}</p>
            </div>
        </div>
    )
})
