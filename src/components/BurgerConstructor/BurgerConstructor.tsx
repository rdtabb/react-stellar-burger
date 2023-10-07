import { memo, useCallback, useMemo } from "react";
import orderDetailsStyles from "../OrderDetails/modal.module.css";
import styles from "./burgerConstructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import useConstructorContext from "../../hooks/useConstructorContext";
import { Ingredient, DRAGNDROP_TYPES } from "../../utils/types";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { useDrop, useDrag } from "react-dnd";

import {
  addConstructorBun,
  addConstructorIngredient,
  bunSelector,
  ingredientsSelector,
  priceSelector,
} from "../../services/orderSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";

const BurgerConstructor = () => {
  const { setIsAcceptedOrderOpen, isAcceptedOrderOpen } =
    useConstructorContext();

  const dispatch = useDispatch();
  const constructorIngredients = useSelector((state: RootState) =>
    ingredientsSelector(state),
  );
  const bun = useSelector((state: RootState) => bunSelector(state));
  const price = useSelector((state: RootState) => priceSelector(state));

  const handleDrop = useCallback((item: Ingredient) => {
    if (item.type === "bun") {
      dispatch(addConstructorBun(item));
    } else {
      dispatch(addConstructorIngredient(item));
    }
  }, []);

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: DRAGNDROP_TYPES.ingredients,
    drop: (item: Ingredient, monitor) => {
      handleDrop(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const boxShadow = useMemo(
    () => (isOver ? "0 0 23px 15px var(--clr-accent)" : "none"),
    [isOver],
  );

  return (
    <section>
      <div style={{ boxShadow }} className={styles.elementsGrid} ref={dropRef}>
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
          onClick={() => setIsAcceptedOrderOpen(true)}
          title="Оформить заказ"
          type="primary"
          htmlType="submit"
        >
          Оформить заказ
        </Button>
      </div>
      <Modal
        modalContentClass={orderDetailsStyles.modalContent}
        isOpen={isAcceptedOrderOpen}
        setIsOpen={setIsAcceptedOrderOpen}
      >
        <OrderDetails />
      </Modal>
    </section>
  );
};

type DraggableContsructorElementProps = {
  item: Ingredient;
};

const DraggableContsructorElement = ({
  item,
}: DraggableContsructorElementProps) => {
  const [{ isDragging }, dragref] = useDrag(() => ({
    type: DRAGNDROP_TYPES.constructorElements,
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging,
    }),
  }));

  return (
    <article className={styles.draggable} ref={dragref}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        thumbnail={item.image}
        isLocked={false}
        price={item.price}
        extraClass={styles.constructorElementHover}
      />
    </article>
  );
};

const MemoizedDraggableContsructorElement = memo(DraggableContsructorElement);

const MemoizedBurgerConstructor = memo(BurgerConstructor);

export default MemoizedBurgerConstructor;
