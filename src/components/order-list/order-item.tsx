import React from 'react'

import type { SocketOrder } from '@services/api/feedSlice'
import { calculateDateDiff } from '@utils/ordersUtils'

import styles from './order-list.module.css'

interface OrderItemProps {
    order?: SocketOrder
}

export const OrderItem = ({ order }: OrderItemProps) => {
    return (
        <article className={styles['order-item']}>
            <div className={styles['top-container']}>
                <p className={styles['order-item__number']}>#{order?.number}</p>
                <p className={styles['order-item__date']}>{calculateDateDiff(order?.createdAt)}</p>
            </div>
            <h3 className={styles['order-item__title']}>{order?.name}</h3>
        </article>
    )
}
