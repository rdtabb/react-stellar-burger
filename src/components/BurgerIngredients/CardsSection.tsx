import React, { forwardRef } from "react";
import styles from "./burgerIngredients.module.css";
import { Ingredient } from "../../utils/types";
import IgredientCard from "./IgredientCard";
import LoadingIngredients from "./LoadingIngredients";
import ErrorIngredients from "./intrinsics/ErrorIngredients";

type CardsSectionProps = {
  title: string;
  ingredients: Ingredient[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

const CardsSection = forwardRef((props: CardsSectionProps, ref: any) => {
  return (
    <div ref={ref}>
      <h2 className={styles.card__header}>{props.title}</h2>
      <div className={styles.container}>
        {props.isLoading ? (
          <LoadingIngredients />
        ) : props.isError ? (
          <ErrorIngredients />
        ) : (
          <>
            {props.ingredients?.map((item) => (
              <IgredientCard key={item._id} item={item} />
            ))}
          </>
        )}
      </div>
    </div>
  );
});

export default CardsSection;
