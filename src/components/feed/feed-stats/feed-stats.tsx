import React from 'react'

import { useSelector } from 'react-redux'

import { feedInfoSelector } from '@services/index'

import { FeedStatsList } from './feed-stats-list'
import styles from './feed-stats.module.css'

export const FeedStats = () => {
    const { done, inProgress, total, totalToday, isLoading } = useSelector(feedInfoSelector)

    return (
        <section className={styles['stats-container']}>
            <div className={styles['ready-progress-container']}>
                <div className={styles['ready-progress']}>
                    <h3 className={styles.title}>Готовы</h3>
                    <FeedStatsList orders={done} isLoading={isLoading} />
                </div>

                <div className={styles['ready-progress']}>
                    <h3 className={styles.title}>В работе</h3>
                    <FeedStatsList orders={inProgress} isLoading={isLoading} />
                </div>
            </div>
            <article>
                <h3 className={styles.title}>Выполнено за все время:</h3>
                <p className={styles['stat-large']}>{isLoading ? 'loading...' : total}</p>
            </article>

            <article>
                <h3 className={styles.title}>Выполнено за сегодня: </h3>
                <p className={styles['stat-large']}>{isLoading ? 'loading...' : totalToday}</p>
            </article>
        </section>
    )
}
