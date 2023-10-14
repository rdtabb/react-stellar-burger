import { forwardRef, memo } from "react";
import styles from "../burgerIngredients.module.css";
import { Ingredient } from "../../../utils/types";
import IgredientCard from "./IgredientCard";
import LoadingIngredients from "../states/LoadingIngredients";
import ErrorIngredients from "../states/ErrorIngredients";
import { ingredientsFetchStatusSelector } from "../../../services/ingredientsSlice";
import { useSelector } from "react-redux";

type CardsSectionProps = {
  title: string;
  ingredients?: Ingredient[];
};

const CardsSection = forwardRef((props: CardsSectionProps, ref: any) => {
  const status = useSelector(ingredientsFetchStatusSelector);

  return (
    <div ref={ref}>
      <h2 className={styles.card__header}>{props.title}</h2>
      <div className={styles.container}>
        {status === "loading" ? (
          <LoadingIngredients />
        ) : status === "failed" ? (
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

export default memo(CardsSection);
