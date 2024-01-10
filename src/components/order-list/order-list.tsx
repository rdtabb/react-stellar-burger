import React from 'react'

import type { Order } from '@services/index'

import { OrderItem } from './order-item/order-item'
import { OrderListLoading } from './order-list-loading'
import styles from './order-list.module.css'

interface OrderListProps {
    orders?: Order[] | null
    shouldDisplayStatus?: boolean
    isLoading?: boolean
}

export const OrderList = ({
    orders,
    shouldDisplayStatus,
    isLoading
}: OrderListProps): JSX.Element => (
    <section className={styles['order-list']}>
        {isLoading ? (
            <OrderListLoading />
        ) : (
            orders?.map((order) => (
                <OrderItem
                    order={order}
                    key={order._id}
                    shouldDisplayStatus={shouldDisplayStatus}
                />
            ))
        )}
    </section>
)
