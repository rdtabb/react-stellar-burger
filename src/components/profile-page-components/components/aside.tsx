import { memo } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import styles from "../profilePageComponents.module.css";
import { ROUTES } from "../../../utils/api";
import { destroyAuthInfo } from "../../../services/authSlice";

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
          to={""}
        >
          История заказов
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.route_active : styles.route
          }
          onClick={() => dispatch(destroyAuthInfo())}
          to={""}
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
