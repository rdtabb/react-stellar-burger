import {
    BurgerIcon,
    Logo,
    ProfileIcon,
    ListIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from 'react-router-dom'

import { ROUTES } from '@utils/api'

import styles from './appHeader.module.css'

export const AppHeader = () => (
    <header className={styles.header}>
        <nav className={styles.nav}>
            <div className={styles.tabs}>
                <NavLink
                    to={ROUTES.CONSTRUCTOR}
                    className={({ isActive }) => (isActive ? styles.tab_active : styles.tab)}
                >
                    <BurgerIcon type="primary" />
                    <p>Конструктор</p>
                </NavLink>
                <NavLink
                    to={ROUTES.FEED}
                    className={({ isActive }) => (isActive ? styles.tab_active : styles.tab)}
                >
                    <ListIcon type="primary" />
                    <p>Лента заказов</p>
                </NavLink>
            </div>
            <div>
                <Logo />
            </div>
            <NavLink to={'/profile/details'} className={styles.tab}>
                <ProfileIcon type="primary" />
                <p>Личный кабинет</p>
            </NavLink>
        </nav>
    </header>
)
