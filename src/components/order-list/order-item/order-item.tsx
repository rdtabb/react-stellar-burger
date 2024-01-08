import React, { memo } from 'react'

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useNavigate } from 'react-router-dom'

import { Order } from '@services/index'
import { calculateDateDiff, getOrderStatus, ROUTES } from '@utils/index'

import { ItemIngredients } from './item-ingredients'

import { useOrderIngredients } from '../hooks/use-order-ingredients'
import styles from '../order-list.module.css'

interface OrderItemProps {
    order?: Order
    shouldDisplayStatus?: boolean
}

export const OrderItem = memo(({ order, shouldDisplayStatus }: OrderItemProps) => {
    const navigate = useNavigate()

    const { ingredients, price } = useOrderIngredients(order?.ingredients)

    const openOrderCard = (): void => {
        if (shouldDisplayStatus) {
            return navigate(`${ROUTES.PROFILE_ORDERS}/${order?.number}`)
        } else {
            return navigate(`${ROUTES.FEED}/${order?.number}`)
        }
    }

    return (
        <article className={styles['order-item']} onClick={openOrderCard}>
            <div className={styles['top-container']}>
                <p className={styles['order-item__number']}>#{order?.number}</p>
                <p className={styles['order-item__date']}>{calculateDateDiff(order?.createdAt)}</p>
            </div>
            <h3
                className={styles['order-item__title']}
                style={{ paddingBottom: shouldDisplayStatus ? '0px' : '24px' }}
            >
                {order?.name}
            </h3>
            {shouldDisplayStatus && (
                <p
                    className={
                        order?.status === 'done'
                            ? styles['order-item__status--done']
                            : styles['order-item__status']
                    }
                >
                    {getOrderStatus(order?.status)}
                </p>
            )}
            <div className={styles['item-ingredients']}>
                <ItemIngredients ingredients={ingredients} />
                <div className={styles['price']}>
                    <CurrencyIcon type="primary" />
                    <p>{price}</p>
                </div>
            </div>
        </article>
    )
})
