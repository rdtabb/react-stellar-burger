import React from 'react'

import type { Order } from '@services/index'

import { OrderItem } from './order-item'
import styles from './order-list.module.css'

interface OrderListProps {
    orders?: Order[]
}

export const OrderList = ({ orders }: OrderListProps) => (
    <section className={styles['order-list']}>
        {orders?.map((order) => <OrderItem order={order} key={order._id} />)}
    </section>
)
