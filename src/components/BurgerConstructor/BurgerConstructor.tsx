import { memo } from "react";
import orderDetailsStyles from "../OrderDetails/modal.module.css";
import styles from "./burgerConstructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import useConstructorContext from "../../hooks/useConstructorContext";
import { Ingredient } from "../../utils/types";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";

const BurgerConstructor = () => {
  const {
    state: { constructorIngredients },
    totalPrice,
    setIsAcceptedOrderOpen,
    isAcceptedOrderOpen,
  } = useConstructorContext();
  const bun = constructorIngredients.find((item) => item.type === "bun")!;
  const mappable = constructorIngredients.filter((item) => item.type !== "bun");

  return (
    <section>
      <div className={styles.elementsGrid}>
        <ConstructorElement
          thumbnail={bun.image_mobile}
          price={bun.price}
          text={`${bun.name} (верх)`}
          isLocked={true}
          type="top"
        />
        <div className={styles.draggableElements}>
          {mappable.map((item: Ingredient, index: number) => (
            <MemoizedDraggableContsructorElement key={index} item={item} />
          ))}
        </div>
        <ConstructorElement
          thumbnail={bun.image}
          price={bun.price}
          text={`${bun.name} (низ)`}
          isLocked={true}
          type="bottom"
        />
      </div>
      <div className={styles.order}>
        <div className={styles.priceContainer}>
          <p className={styles.totalPrice}>{totalPrice}</p>
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
