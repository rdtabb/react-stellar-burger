import { useCallback, memo } from "react";
import styles from "../burgerIngredients.module.css";
import { Ingredient } from "../../../utils/types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import useIngredientsContext from "../../../hooks/useIngredientsContext";
import { REDUCER_ACTION_TYPE } from "../../../context/IngredientsContext";

type IngredientCardProps = {
  item: Ingredient;
};

const IgredientCard = ({ item }: IngredientCardProps) => {
  const { dispatch, setIsIngredientInfoOpen } = useIngredientsContext();

  const openInfoPopup = useCallback(() => {
    setIsIngredientInfoOpen(true);
    dispatch({ type: REDUCER_ACTION_TYPE.SELECT_ITEM, payload: item });
  }, []);

  return (
    <article onClick={openInfoPopup} className={styles.card}>
      <img loading="lazy" src={item.image} alt={item.name} />
      <div className={styles.card__price}>
        <CurrencyIcon type="primary" />
        <p>{item.price}</p>
      </div>
      <p className={styles.card__name}>{item.name}</p>
    </article>
  );
};

export default memo(IgredientCard);