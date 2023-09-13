import React from "react";
import styles from "./modal.module.css";
import {
  CheckMarkIcon,
  CloseIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import useConstructorContext from "../../hooks/useConstructorContext";

const OrderAcceptedModal = () => {
  const { setIsAcceptedOrderOpen, isAcceptedOrderOpen } =
    useConstructorContext();

  return (
    <div className={isAcceptedOrderOpen ? styles.modalActive : styles.modal}>
      <div className={styles.modalContent}>
        <article className={styles.modalGrid}>
          <h2 className={styles.title}>034536</h2>
          <p className={styles.subtitle}>идентификатор заказа</p>
          <CheckMarkIcon type="primary" />
          <p className={styles.caption}>Ваш заказ начали готовить</p>
          <p className={styles.subcaption}>
            Дождитесь заказа на орбитальной станции
          </p>
        </article>
        <div className={styles.closeWrapper}>
          <CloseIcon
            onClick={() => setIsAcceptedOrderOpen(false)}
            type="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default OrderAcceptedModal;
