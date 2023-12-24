import React, { memo } from 'react'

import { Order } from '@services/index'
import { calculateDateDiff } from '@utils/ordersUtils'

import { ItemIngredients } from './item-ingredients'
import styles from './order-list.module.css'

interface OrderItemProps {
    order?: Order
}

export const OrderItem = memo(({ order }: OrderItemProps) => (
    <article className={styles['order-item']}>
        <div className={styles['top-container']}>
            <p className={styles['order-item__number']}>#{order?.number}</p>
            <p className={styles['order-item__date']}>{calculateDateDiff(order?.createdAt)}</p>
        </div>
        <h3 className={styles['order-item__title']}>{order?.name}</h3>
        <ItemIngredients ids={order?.ingredients} />
    </article>
))
