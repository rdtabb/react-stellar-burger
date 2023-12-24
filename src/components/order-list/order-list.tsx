import React from 'react'

import { useSelector } from 'react-redux'

import { feedOrdersSelector } from '@services/api/feedSlice'

import { OrderItem } from './order-item'
import styles from './order-list.module.css'

export const OrderList = () => {
    const orders = useSelector(feedOrdersSelector)

    return (
        <section className={styles['order-list']}>
            {orders?.map((order) => <OrderItem order={order} key={order._id} />)}
        </section>
    )
}
