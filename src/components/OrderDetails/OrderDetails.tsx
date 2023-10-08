import { memo } from "react";
import styles from "./modal.module.css";
import { useSelector } from "react-redux";
import { orderSelector } from "../../services/orderSlice";
import { RootState } from "../../store/store";

const OrderAcceptedModal = () => {
  const { orderData, orderFetchStatus } = useSelector((state: RootState) =>
    orderSelector(state),
  );

  return (
    <article className={styles.modalGrid}>
      {orderFetchStatus === "success" && (
        <>
          <h2 className={styles.title}>{orderData?.order.number}</h2>
          <p className={styles.subtitle}>идентификатор заказа</p>
          <div className={styles.accepted}></div>
          <p className={styles.caption}>Ваш заказ начали готовить</p>
          <p className={styles.subcaption}>{orderData?.name}</p>
        </>
      )}
      {orderFetchStatus === "loading" && (
        <>
          <p className={styles.subtitle}>Обрабатываем ваш заказ, милорд...</p>
        </>
      )}
      {orderFetchStatus === "failed" && (
        <>
          <p className={styles.subtitle}>
            Милорд, наша суборбитальная станция подверглась нападению коварных
            ситхов. Силы джедаев уже в пути, повторите ваш заказ позже
          </p>
        </>
      )}
    </article>
  );
};

export default memo(OrderAcceptedModal);
