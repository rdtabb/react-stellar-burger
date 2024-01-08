import React, { memo } from 'react'

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useParams } from 'react-router-dom'

import { useGetOrderInfoQuery } from '@services/index'
import { calculateDateDiff, getOrderStatus } from '@utils/index'

import css from './order-item-info.module.css'

import { useOrderIngredients } from '../hooks/use-order-ingredients'

export const OrderItemInfo = memo(() => {
    const { id: number } = useParams() as { id: string }

    const { data: order, isLoading } = useGetOrderInfoQuery({
        number: parseInt(number)
    })

    const { countedIngredients, price } = useOrderIngredients(order?.ingredients)

    return (
        <section className={css.page}>
            <article className={css.container}>
                <p className={css.number}>{isLoading ? 'Загрузка...' : `#${order?.number}`}</p>
                <h2 className={css.title}>{isLoading ? 'Загрузка...' : order?.name}</h2>
                <p
                    style={{
                        color: order?.status === 'done' ? '#0CC' : 'white'
                    }}
                >
                    {isLoading ? 'Загрузка...' : getOrderStatus(order?.status)}
                </p>
                <div className={css.ingredients}>
                    <h3 className={css.ingredients__subtitle}>Состав: </h3>
                    <ul className={css.ingredients__list}>
                        {Object.entries(countedIngredients ?? {})?.map(([id, ingredient]) => (
                            <li className={css.item} key={id}>
                                <img
                                    className={css.item__image}
                                    src={ingredient.image_mobile}
                                    alt={ingredient.name}
                                    width="64px"
                                    height="64px"
                                />
                                <h4 className={css.item__title}>{ingredient.name}</h4>
                                <div className={css['item__price-container']}>
                                    <p>{ingredient.count + ' x ' + ingredient.price}</p>
                                    <CurrencyIcon type="primary" />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={css['item__info-container']}>
                    <p className={css.date}>
                        {isLoading ? 'Загрузка...' : calculateDateDiff(order?.createdAt)}
                    </p>
                    <div className={css['item__price-container']}>
                        <p className={css.item__price}>{isLoading ? 'Загрузка...' : price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </article>
        </section>
    )
})
