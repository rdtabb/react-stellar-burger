import React from 'react'

import styles from './feed-stats.module.css'

interface FeedStatsListProps {
    orders?: number[]
    isLoading: boolean
}

export const FeedStatsList = ({ orders, isLoading }: FeedStatsListProps) => (
    <ul className={styles['ready-progress-list']}>
        {!isLoading ? (
            orders?.map((item, index) => (
                <li
                    className={`${styles['ready-progress-list__item']} ${styles['item-colored']}`}
                    key={index}
                >
                    {item}
                </li>
            ))
        ) : (
            <>
                <li className={`${styles['ready-progress-list__item']} ${styles['item-colored']}`}>
                    loading...
                </li>
                <li className={`${styles['ready-progress-list__item']} ${styles['item-colored']}`}>
                    loading...
                </li>
                <li className={`${styles['ready-progress-list__item']} ${styles['item-colored']}`}>
                    loading...
                </li>
                <li className={`${styles['ready-progress-list__item']} ${styles['item-colored']}`}>
                    loading...
                </li>
                <li className={`${styles['ready-progress-list__item']} ${styles['item-colored']}`}>
                    loading...
                </li>
            </>
        )}
    </ul>
)
