import React from 'react'

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useLocation } from 'react-router-dom'

import { Order } from '@services/index'
import { Ingredient, calculateDateDiff, getOrderStatus } from '@utils/index'

import css from './order-item-info.module.css'

import { type IngredientsCounted } from '../hooks/use-order-ingredients'

interface Location {
    state: {
        selected_order?: {
            order: Order
            price: number
            ingredients: Ingredient[]
            countedIngredients: IngredientsCounted
        } | null
    }
}

export const OrderItemInfo = () => {
    const { state } = useLocation() as Location
    const selected_order = state?.selected_order

    return (
        <section className={css.page}>
            <article className={css.container}>
                <p className={css.number}>#{selected_order?.order.number}</p>
                <h2 className={css.title}>{selected_order?.order.name}</h2>
                <p
                    style={{
                        color: selected_order?.order.status === 'done' ? '#0CC' : 'white'
                    }}
                >
                    {getOrderStatus(selected_order?.order.status)}
                </p>
                <div className={css.ingredients}>
                    <h3 className={css.ingredients__subtitle}>Состав: </h3>
                    <ul className={css.ingredients__list}>
                        {Object.entries(selected_order?.countedIngredients ?? {})?.map(
                            ([id, ingredient]) => (
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
                            )
                        )}
                    </ul>
                </div>
                <div className={css['item__info-container']}>
                    <p className={css.date}>{calculateDateDiff(selected_order?.order.createdAt)}</p>
                    <div className={css['item__price-container']}>
                        <p className={css.item__price}>{selected_order?.price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </article>
        </section>
    )
}
