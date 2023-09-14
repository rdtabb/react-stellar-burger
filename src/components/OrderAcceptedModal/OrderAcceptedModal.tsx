import React, { useCallback, useEffect } from "react";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import useConstructorContext from "../../hooks/useConstructorContext";

const OrderAcceptedModal = () => {
  const { setIsAcceptedOrderOpen, isAcceptedOrderOpen } =
    useConstructorContext();

  const closePopup = useCallback((): void => {
    setIsAcceptedOrderOpen(false);
  }, []);

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        closePopup();
      }
    };

    isAcceptedOrderOpen
      ? document.addEventListener("keydown", handleEscKey)
      : document.removeEventListener("keydown", handleEscKey);
  }, [isAcceptedOrderOpen]);

  return (
    <div
      onClick={closePopup}
      className={isAcceptedOrderOpen ? styles.modalActive : styles.modal}
    >
      <div className={styles.modalContent}>
        <article className={styles.modalGrid}>
          <h2 className={styles.title}>034536</h2>
          <p className={styles.subtitle}>идентификатор заказа</p>
          <div className={styles.accepted}></div>
          <p className={styles.caption}>Ваш заказ начали готовить</p>
          <p className={styles.subcaption}>
            Дождитесь заказа на орбитальной станции
          </p>
        </article>
        <div className={styles.closeWrapper}>
          <CloseIcon onClick={closePopup} type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderAcceptedModal;
