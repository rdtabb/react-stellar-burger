import { PropsWithChildren } from 'react'

import { useGetOrdersQuery } from '@services/index'
import { CACHE_KEYS } from '@utils/api'

import styles from '../feed.module.css'

export const FeedContainer = ({ children }: PropsWithChildren) => {
    useGetOrdersQuery(CACHE_KEYS.ORDERS)

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Лента заказов</h2>
            <div className={styles['content-wrapper']}>{children}</div>
        </section>
    )
}
