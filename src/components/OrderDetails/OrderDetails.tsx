import { memo } from "react";
import styles from "./modal.module.css";
import { useCreateOrderMutation } from "../../services/api/apiSlice";
import { CACHE_KEYS } from "../../utils/api";

const OrderAcceptedModal = () => {
  const [_, { isLoading, isError, data }] = useCreateOrderMutation({
    fixedCacheKey: CACHE_KEYS.ORDER_INFO
  });

  console.log("isLoading: ", isLoading)
  console.log("isError: ", isError)
  console.log("data: ", data)

  return (
    <article className={styles.modalGrid}>
      {data && (
        <>
          <h2 className={styles.title}>{data?.order.number}</h2>
          <p className={styles.subtitle}>идентификатор заказа</p>
          <div className={styles.accepted}></div>
          <p className={styles.caption}>Ваш заказ начали готовить</p>
          <p className={styles.subcaption}>{data?.name}</p>
        </>
      )}
      {isLoading && (
        <p className={styles.subtitle}>Обрабатываем ваш заказ, милорд...</p>
      )}
      {isError && (
        <p className={styles.subtitle}>
          Милорд, наша суборбитальная станция подверглась нападению коварных
          ситхов. Силы джедаев уже в пути, повторите ваш заказ позже. Да
          прибудет с вами сила
        </p>
      )}
    </article>
  );
};

export default memo(OrderAcceptedModal);
