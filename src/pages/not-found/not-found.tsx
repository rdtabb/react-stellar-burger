import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@utils/index'

import styles from './notFound.module.css'

export const NotFound = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate(ROUTES.CONSTRUCTOR)
        }, 1500)

        return () => clearTimeout(timeout)
    }, [navigate])

    return (
        <div className={styles['not-found']}>
            <p>404</p>
            <p>NOT FOUND</p>
            <p className={styles.redirect}>направляем на главную...</p>
        </div>
    )
}
