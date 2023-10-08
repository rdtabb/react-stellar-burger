import { memo } from "react";
import styles from "./modal.module.css";

const OrderAcceptedModal = () => {
  return (
    <article className={styles.modalGrid}>
      <h2 className={styles.title}>034536</h2>
      <p className={styles.subtitle}>идентификатор заказа</p>
      <div className={styles.accepted}></div>
      <p className={styles.caption}>Ваш заказ начали готовить</p>
      <p className={styles.subcaption}>
        Дождитесь заказа на орбитальной станции
      </p>
    </article>
  );
};

export default memo(OrderAcceptedModal);
