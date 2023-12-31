import {
    BurgerIcon,
    Logo,
    ProfileIcon,
    ListIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from 'react-router-dom'

import { useIngredientsPrefetch } from '@services/index'
import { ROUTES, CACHE_KEYS } from '@utils/api'

import styles from './appHeader.module.css'

export const AppHeader = () => {
    const prefetchIngredients = useIngredientsPrefetch('getIngredients')

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.tabs}>
                    <NavLink
                        to={ROUTES.CONSTRUCTOR}
                        className={({ isActive }) => (isActive ? styles.tab_active : styles.tab)}
                        onMouseOver={() => prefetchIngredients(CACHE_KEYS.INGREDIENTS)}
                    >
                        <BurgerIcon type="primary" />
                        <p>Конструктор</p>
                    </NavLink>
                    <NavLink
                        to={ROUTES.LOGIN}
                        className={({ isActive }) => (isActive ? styles.tab_active : styles.tab)}
                    >
                        <ListIcon type="primary" />
                        <p>Лента заказов</p>
                    </NavLink>
                </div>
                <div>
                    <Logo />
                </div>
                <NavLink
                    to={ROUTES.PROFILE}
                    className={({ isActive }) => (isActive ? styles.tab_active : styles.tab)}
                >
                    <ProfileIcon type="primary" />
                    <p>Личный кабинет</p>
                </NavLink>
            </nav>
        </header>
    )
}
