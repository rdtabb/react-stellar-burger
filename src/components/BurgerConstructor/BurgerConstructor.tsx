import { useCallback, useMemo, memo } from "react";
import orderDetailsStyles from "../OrderDetails/modal.module.css";
import styles from "./burgerConstructor.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingredient, DRAGNDROP_TYPES } from "../../utils/types";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import DraggableConstructorElement from "./components/DraggableConstructorElement";
import BunConstructorElement from "./components/BunConstructorElement";
import { nanoid } from "@reduxjs/toolkit";

import {
  addConstructorBun,
  addConstructorIngredient,
  ingredientsSelector,
  priceSelector,
  createOrder,
  idsSelector,
} from "../../services/orderSlice";
import {
  openPopupTypeSelector,
  setPopupState,
} from "../../services/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { useDrop } from "react-dnd";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const memoizedOpenPopupTypeSelector = useMemo(openPopupTypeSelector, []);
  const openPopupType = useSelector(memoizedOpenPopupTypeSelector);

  const constructorIngredients = useSelector((state: RootState) =>
    ingredientsSelector(state),
  );
  const price = useSelector((state: RootState) => priceSelector(state));
  const ids = useSelector((state: RootState) => idsSelector(state));

  const handleDrop = useCallback((item: Ingredient) => {
    if (item.type === "bun") {
      dispatch(addConstructorBun(item));
    } else {
      dispatch(addConstructorIngredient(item));
    }
  }, []);

  const [{ isOver }, ingridientDropRef] = useDrop(() => ({
    accept: DRAGNDROP_TYPES.ingredients,
    drop: (item: Ingredient) => {
      handleDrop(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const [, sortRef] = useDrop(() => ({
    accept: DRAGNDROP_TYPES.constructorElements,
  }));

  const boxShadow = useMemo(
    () => (isOver ? "0 0 23px 15px var(--clr-accent)" : "none"),
    [isOver],
  );

  return (
    <section ref={ingridientDropRef}>
      <div style={{ boxShadow }} className={styles.elementsGrid} ref={sortRef}>
        <BunConstructorElement type="top" key={nanoid()} />
        {constructorIngredients?.length ? (
          <div className={styles.draggableElements}>
            {constructorIngredients.map((item: Ingredient, index: number) => (
              <DraggableConstructorElement
                key={nanoid()}
                item={item}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className={styles.draggableElementsEmpty}>
            <p>Добавьте ингредиенты</p>
          </div>
        )}
        <BunConstructorElement type="bottom" key={nanoid()} />
      </div>
      <div className={styles.order}>
        <div className={styles.priceContainer}>
          <p className={styles.totalPrice}>{price ? price : 0}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={() => {
            dispatch(setPopupState("order"));
            dispatch(createOrder(ids));
          }}
          title="Оформить заказ"
          type="primary"
          htmlType="submit"
        >
          Оформить заказ
        </Button>
      </div>
      {openPopupType === "order" && (
        <Modal modalContentClass={orderDetailsStyles.modalContent}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};

const MemoizedBurgerConstructor = memo(BurgerConstructor);

export default MemoizedBurgerConstructor;
