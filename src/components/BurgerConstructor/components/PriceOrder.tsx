import { memo, useCallback } from "react";
import styles from "../burgerConstructor.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { setPopupState } from "../../../services/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import { useCreateOrderMutation } from "../../../services/api/apiSlice";
import { priceSelector, idsSelector } from "../../../services/orderSlice";
import { CACHE_KEYS } from "../../../utils/api";

const PriceOrder = () => {
  const dispatch = useDispatch();

  const price = useSelector(priceSelector);
  const ids = useSelector(idsSelector);

  const [createOrder, _] = useCreateOrderMutation({
    fixedCacheKey: CACHE_KEYS.ORDER_INFO,
  });

  const postOrder = useCallback(() => {
    dispatch(setPopupState("order"));
    createOrder(ids);
  }, [ids]);

  return (
    <div className={styles.order}>
      <div className={styles.priceContainer}>
        <p className={styles.totalPrice}>{price ? price : 0}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button
        onClick={postOrder}
        title="Оформить заказ"
        type="primary"
        htmlType="submit"
      >
        Оформить заказ
      </Button>
    </div>
  );
};

export default memo(PriceOrder);
