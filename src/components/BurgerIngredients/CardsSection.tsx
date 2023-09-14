import React, { forwardRef } from "react";
import styles from "./burgerIngredients.module.css";
import { Ingredient } from "../../utils/types";
import IgredientCard from "./IgredientCard";

type CardsSectionProps = {
  title: string;
  ingredients: Ingredient[] | undefined;
};

const CardsSection = forwardRef((props: CardsSectionProps, ref: any) => {
  return (
    <div ref={ref}>
      <h2 className={styles.card__header}>{props.title}</h2>
      <div className={styles.container}>
        {props.ingredients?.map((item) => (
          <IgredientCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
});

export default CardsSection;
