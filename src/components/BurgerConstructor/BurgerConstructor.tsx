import { useCallback, useMemo, memo } from "react";
import orderDetailsStyles from "../OrderDetails/modal.module.css";
import styles from "./burgerConstructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingredient, DRAGNDROP_TYPES } from "../../utils/types";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { useDrop, useDrag } from "react-dnd";

import {
  addConstructorBun,
  addConstructorIngredient,
  removeConstructorIngredient,
  bunSelector,
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

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const memoizedOpenPopupTypeSelector = useMemo(openPopupTypeSelector, []);
  const openPopupType = useSelector(memoizedOpenPopupTypeSelector);

  const constructorIngredients = useSelector((state: RootState) =>
    ingredientsSelector(state),
  );
  const bun = useSelector((state: RootState) => bunSelector(state));
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
    drop: (item: Ingredient, monitor) => {
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
        {!!bun ? (
          <ConstructorElement
            thumbnail={bun.image_mobile}
            price={bun.price}
            text={`${bun?.name} (верх)`}
            isLocked={true}
            type="top"
            extraClass={styles.constructorElementHover}
          />
        ) : (
          <section className={styles.emptyBunTop}>
            <p>Добавьте булку</p>
          </section>
        )}
        {constructorIngredients?.length ? (
          <div className={styles.draggableElements}>
            {constructorIngredients.map((item: Ingredient, index: number) => (
              <MemoizedDraggableContsructorElement key={index} item={item} />
            ))}
          </div>
        ) : (
          <div className={styles.draggableElementsEmpty}>
            <p>Добавьте ингредиенты</p>
          </div>
        )}
        {bun ? (
          <ConstructorElement
            thumbnail={bun.image}
            price={bun.price}
            text={`${bun?.name} (низ)`}
            isLocked={true}
            type="bottom"
            extraClass={styles.constructorElementHover}
          />
        ) : (
          <section className={styles.emptyBunBottom}>
            <p>Добавьте булку</p>
          </section>
        )}
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

type DraggableContsructorElementProps = {
  item: Ingredient;
};

const DraggableContsructorElement = ({
  item,
}: DraggableContsructorElementProps) => {
  const [, dragref] = useDrag(() => ({
    type: DRAGNDROP_TYPES.constructorElements,
    item,
  }));
  const dispatch = useDispatch();

  return (
    <article className={styles.draggable} ref={dragref}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        thumbnail={item.image}
        isLocked={false}
        price={item.price}
        extraClass={styles.constructorElementHover}
        handleClose={() => dispatch(removeConstructorIngredient(item._id))}
      />
    </article>
  );
};

const MemoizedDraggableContsructorElement = memo(DraggableContsructorElement);

const MemoizedBurgerConstructor = memo(BurgerConstructor);

export default MemoizedBurgerConstructor;
