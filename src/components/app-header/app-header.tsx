import styles from "./appHeader.module.css";
import { NavLink } from "react-router-dom";
import {
  BurgerIcon,
  Logo,
  ProfileIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { ROUTES } from "../../utils/api";

export const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.tabs}>
          <NavLink
            to={ROUTES.CONSTRUCTOR}
            className={({ isActive }) =>
              isActive ? styles.tab_active : styles.tab
            }
          >
            {/* Стиль иконки меняется, т.к. она наследует opacity от стилей tab и tab_active */}
            <BurgerIcon type="primary" />
            Конструктор
          </NavLink>
          <NavLink
            to={ROUTES.LOGIN}
            className={({ isActive }) =>
              isActive ? styles.tab_active : styles.tab
            }
          >
            <ListIcon type="secondary" /> Лента заказов
          </NavLink>
        </div>
        <div>
          <Logo />
        </div>
        <NavLink
          to={ROUTES.PROFILE}
          className={({ isActive }) =>
            isActive ? styles.tab_active : styles.tab
          }
        >
          <ProfileIcon type="secondary" />
          Личный кабинет
        </NavLink>
      </nav>
    </header>
  );
};
