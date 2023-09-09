import React from "react";
import styles from "./burgerConstructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import useConstructorContext from "../../hooks/useConstructorContext";
import { Ingredient } from "../../utils/types";

const BurgerConstructor = () => {
  const {
    state: { constructorIngredients },
    totalPrice,
  } = useConstructorContext();
  const bun = constructorIngredients.find((item) => item.type === "bun")!;
  const mappable = constructorIngredients.filter((item) => item.type !== "bun");

  return (
    <section className={styles.constructor}>
      <div className={styles.elementsGrid}>
        <ConstructorElement
          thumbnail={bun.image_mobile}
          price={bun.price}
          text={`${bun.name} (верх)`}
          isLocked={true}
          type="top"
        />
        {mappable.map((item: Ingredient) => (
          <DraggableContsructorElement key={item._id} item={item} />
        ))}
        <ConstructorElement
          thumbnail={bun.image}
          price={bun.price}
          text={`${bun.name} (низ)`}
          isLocked={true}
          type="bottom"
        />
        <div className={styles.order}>
          <div className={styles.priceContainer}>
            <p className={styles.totalPrice}>{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button title="Оформить заказ" type="primary" htmlType="submit">
            Оформить заказ
          </Button>
        </div>
      </div>
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
      />
    </article>
  );
};

export default BurgerConstructor;
