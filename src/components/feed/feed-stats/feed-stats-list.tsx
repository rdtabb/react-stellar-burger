import React from 'react'

import styles from './feed-stats.module.css'

interface FeedStatsListProps {
    orders?: number[]
}

export const FeedStatsList = ({ orders }: FeedStatsListProps) => (
    <ul className={styles['ready-progress-list']}>
        {typeof orders !== 'undefined' ? (
            orders.map((item, index) => (
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
