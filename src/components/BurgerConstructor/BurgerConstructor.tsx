import React from "react";
import styles from "./burgerConstructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import useConstructorContext from "../../hooks/useConstructorContext";

const BurgerConstructor = () => {
  const {
    state: { constructorIngredients },
    totalPrice,
  } = useConstructorContext();
  const top = constructorIngredients[0];
  const bottom = constructorIngredients[constructorIngredients.length - 1];
  const mappable = constructorIngredients.slice(
    1,
    constructorIngredients.length - 1,
  );

  return (
    <section className={styles.constructor}>
      <div className={styles.elementsGrid}>
        <ConstructorElement
          thumbnail={top.image_mobile}
          price={top.price}
          text={`${top.name} (верх)`}
          isLocked={true}
          type="top"
        />
        <ConstructorElement
          thumbnail={bottom.image}
          price={bottom.price}
          text={`${bottom.name} (низ)`}
          isLocked={true}
          type="bottom"
        />
      </div>
      <div
        style={{
          display: "flex",
          gap: "40px",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <p className={styles.totalPrice}>{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button title="Оформить заказ" type="primary" htmlType="submit">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
