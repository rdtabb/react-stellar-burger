import React, { forwardRef } from "react";
import styles from "./burgerIngredients.module.css";
import { Ingredient } from "../../utils/types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import useConstructorContext from "../../hooks/useConstructorContext";
import { REDUCER_ACTION_TYPE } from "../../context/ConstructorContext";

type CardsSectionProps = {
  title: string;
  ingredients: Ingredient[] | undefined;
};

const CardsSection = forwardRef((props: CardsSectionProps, ref: any) => {
  const { dispatch } = useConstructorContext();

  const handleAddIngredient = (item: Ingredient): void => {
    dispatch({ type: REDUCER_ACTION_TYPE.ADD_ELEMENT, payload: item });
  };

  return (
    <div ref={ref}>
      <h2 className={styles.card__header}>{props.title}</h2>
      <div className={styles.container}>
        {props.ingredients?.map((item, index) => (
          <article
            onClick={() => handleAddIngredient(item)}
            key={index}
            className={styles.card}
          >
            <img src={item.image} alt={item.name} />
            <div className={styles.card__price}>
              <CurrencyIcon type="primary" />
              <p>{item.price}</p>
            </div>
            <p className={styles.card__name}>{item.name}</p>
          </article>
        ))}
      </div>
    </div>
  );
});

export default CardsSection;
