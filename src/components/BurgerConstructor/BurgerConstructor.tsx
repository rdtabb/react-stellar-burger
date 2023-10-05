import { memo, useMemo } from "react";
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
import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import {
  selectConstructorIngredients,
  selectTotalPrice,
  selectBun,
} from "../../services/constructorSlice";

const BurgerConstructor = () => {
  const { setIsAcceptedOrderOpen, isAcceptedOrderOpen } =
    useConstructorContext();

  const memoizedIngredients = useMemo(selectConstructorIngredients, []);
  const memoizedPrice = useMemo(selectTotalPrice, []);
  const memoizedBun = useMemo(selectBun, []);

  const ingredients = useSelector(memoizedIngredients);
  const price = useSelector(memoizedPrice);
  const bun = useSelector(memoizedBun);

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: DRAGNDROP_TYPES.ingredients,
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
        {bun ? (
          <ConstructorElement
            thumbnail={bun.image_mobile}
            price={bun.price}
            text={`${bun?.name} (верх)`}
            isLocked={true}
            type="top"
          />
        ) : (
          <section className={styles.emptyBunTop}>
            <p>Добавьте булку</p>
          </section>
        )}
        {ingredients?.length ? (
          <div className={styles.draggableElements}>
            {ingredients.map((item: Ingredient, index: number) => (
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
          />
        ) : (
          <section className={styles.emptyBunBottom}>
            <p>Добавьте булку</p>
          </section>
        )}
      </div>
      <div className={styles.order}>
        <div className={styles.priceContainer}>
          <p className={styles.totalPrice}>{price ? price : "0"}</p>
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

const DraggableContsructorElement = ({ item }: { item: Ingredient }) => {
  return (
    <article className={styles.draggable}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        thumbnail={item.image}
        isLocked={false}
        price={item.price}
        extraClass={styles.constElement}
      />
    </article>
  );
};

const MemoizedDraggableContsructorElement = memo(DraggableContsructorElement);

const MemoizedBurgerConstructor = memo(BurgerConstructor);

export default MemoizedBurgerConstructor;
