import React, { Dispatch, useEffect, useRef } from "react";
import styles from "./burgerConstructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import useConstructorContext from "../../hooks/useConstructorContext";
import { Ingredient } from "../../utils/types";
import {
  ReducerActionType,
  REDUCER_ACTION_TYPE,
} from "../../context/ConstructorContext";

const BurgerConstructor = () => {
  const {
    state: { constructorIngredients },
    dispatch,
    totalPrice,
    setIsAcceptedOrderOpen,
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
            <DraggableContsructorElement
              key={index}
              item={item}
              dispatch={dispatch}
            />
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
    </section>
  );
};

const DraggableContsructorElement = ({
  item,
  dispatch,
}: {
  item: Ingredient;
  dispatch: Dispatch<ReducerActionType>;
}) => {
  return (
    <article className={styles.draggable}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        thumbnail={item.image}
        isLocked={false}
        price={item.price}
        extraClass={styles.constElement}
        handleClose={() =>
          dispatch({
            type: REDUCER_ACTION_TYPE.DELETE_ELEMENT,
            payload: item._id,
          })
        }
      />
    </article>
  );
};

export default BurgerConstructor;
