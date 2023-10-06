import { useCallback, memo } from "react";
import styles from "../burgerIngredients.module.css";
import { Ingredient, DRAGNDROP_TYPES } from "../../../utils/types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import useIngredientsContext from "../../../hooks/useIngredientsContext";

import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { saveSelectedItem } from "../../../services/ingredientsSlice";
import { RootState } from "../../../store/store";

type IngredientCardProps = {
  item: Ingredient;
};

const IgredientCard = ({ item }: IngredientCardProps) => {
  const selectedItem = useSelector(
    (state: RootState) => state.ingredients.selectedIngredient,
  );
  const dispatch = useDispatch();

  const { setIsIngredientInfoOpen } = useIngredientsContext();

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: DRAGNDROP_TYPES.ingredients,
    item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const openInfoPopup = useCallback(() => {
    setIsIngredientInfoOpen(true);

    selectedItem?._id !== item._id && dispatch(saveSelectedItem(item));
  }, []);

  return (
    <article
      style={{ opacity: isDragging ? "0.5" : "1" }}
      ref={dragRef}
      onClick={openInfoPopup}
      className={styles.card}
    >
      <img src={item.image} alt={item.name} />
      <div className={styles.card__price}>
        <CurrencyIcon type="primary" />
        <p>{item.price}</p>
      </div>
      <p className={styles.card__name}>{item.name}</p>
    </article>
  );
};

export default memo(IgredientCard);
