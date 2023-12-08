import { memo } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import styles from "../profilePageComponents.module.css";
import { ROUTES } from "../../../utils";
import { destroyAuthInfo } from "../../../services";

export const Aside = memo(() => {
  const dispatch = useDispatch();

  return (
    <aside className={styles.aside}>
      <nav className={styles.nav}>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.route_active : styles.route
          }
          to={ROUTES.PROFILE}
        >
          Профиль
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.route_active : styles.route
          }
          to={ROUTES.ORDERS_HISTORY}
        >
          История заказов
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.route_active : styles.route
          }
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
  );
});
