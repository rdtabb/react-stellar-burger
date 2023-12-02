import { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "../burgerConstructor.module.css";
import { setPopupState } from "../../../services/modalSlice";
import { useCreateOrderMutation } from "../../../services/api/apiSlice";
import {
  priceSelector,
  idsSelector,
  clearConstructorIngredients,
} from "../../../services/orderSlice";

import { CACHE_KEYS } from "../../../utils/api";

export const PriceOrder = memo(() => {
  const dispatch = useDispatch();

  const price = useSelector(priceSelector);
  const ids = useSelector(idsSelector);

  const [createOrder, _] = useCreateOrderMutation({
    fixedCacheKey: CACHE_KEYS.ORDER_INFO,
  });

  const postOrder = useCallback(async () => {
    dispatch(setPopupState("order"));
    const result = await createOrder(ids);
    //@ts-ignore
    if (result.data.success) {
      dispatch(clearConstructorIngredients());
    }
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
});
