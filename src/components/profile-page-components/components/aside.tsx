import { memo } from 'react'

import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { destroyAuthInfo } from '@services/index'
import { ROUTES } from '@utils/index'

import styles from '../profilePageComponents.module.css'

export const Aside = memo(() => {
    const dispatch = useDispatch()

    return (
        <aside className={styles.aside}>
            <nav className={styles.nav}>
                <NavLink
                    className={({ isActive }) => (isActive ? styles.route_active : styles.route)}
                    to={'/profile/details'}
                >
                    Профиль
                </NavLink>
                <NavLink
                    className={({ isActive }) => (isActive ? styles.route_active : styles.route)}
                    to={`/profile/orders`}
                >
                    История заказов
                </NavLink>
                <NavLink
                    className={({ isActive }) => (isActive ? styles.route_active : styles.route)}
                    onClick={() => dispatch(destroyAuthInfo())}
                    to={ROUTES.LOGIN}
                >
                    Выход
                </NavLink>
            </nav>
            <p className={styles.caption}>
                В этом разделе вы можете изменить свои персональные данные
            </p>
        </aside>
    )
})
