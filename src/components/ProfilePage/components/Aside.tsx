import { memo } from "react";
import { NavLink } from "react-router-dom";
import styles from "../profilePage.module.css";
import { ROUTES } from "../../../utils/api";

const Aside = () => {
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
};

export default memo(Aside);
