import React, { useState } from "react";
import styles from "./appHeader.module.css";
import {
  BurgerIcon,
  Logo,
  ProfileIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.tabs}>
          <div className={styles.tab_active}>
            <BurgerIcon type="primary" />
            Конструктор
          </div>
          <div className={styles.tab}>
            <ListIcon type="secondary" /> Лента заказов
          </div>
        </div>
        <Logo />
        <div className={styles.tab}>
          <ProfileIcon type="secondary" />
          Личный кабинет
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
