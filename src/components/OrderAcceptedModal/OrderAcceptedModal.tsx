import styles from "./modal.module.css";
import useConstructorContext from "../../hooks/useConstructorContext";
import Modal from "../Modal/Modal";

const OrderAcceptedModal = () => {
  const { setIsAcceptedOrderOpen, isAcceptedOrderOpen } =
    useConstructorContext();

  return (
    <Modal modalContentClass={styles.modalContent} isOpen={isAcceptedOrderOpen} setIsOpen={setIsAcceptedOrderOpen}>
      <article className={styles.modalGrid}>
        <h2 className={styles.title}>034536</h2>
        <p className={styles.subtitle}>идентификатор заказа</p>
        <div className={styles.accepted}></div>
        <p className={styles.caption}>Ваш заказ начали готовить</p>
        <p className={styles.subcaption}>
          Дождитесь заказа на орбитальной станции
        </p>
      </article>
    </Modal>
  );
};

export default OrderAcceptedModal;
