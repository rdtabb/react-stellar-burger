import { useCallback, memo, useMemo } from "react";
import styles from "../burgerIngredients.module.css";
import { Ingredient, DRAGNDROP_TYPES } from "../../../utils/types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { saveSelectedItem } from "../../../services/ingredientsSlice";
import { setPopupState } from "../../../services/modalSlice";
import { quantitySelector } from "../../../services/orderSlice";
import { RootState } from "../../../store/store";

type IngredientCardProps = {
  item: Ingredient;
};

const IgredientCard = ({ item }: IngredientCardProps) => {
  const selectedItem = useSelector(
    (state: RootState) => state.ingredients.selectedIngredient,
  );
  const quantity = useSelector((state: RootState) =>
    quantitySelector(state, item._id),
  );
  const dispatch = useDispatch();

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: DRAGNDROP_TYPES.ingredients,
    item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const openInfoPopup = useCallback(() => {
    dispatch(setPopupState("info"));

    selectedItem?._id !== item._id && dispatch(saveSelectedItem(item));
  }, []);

  return (
    <article
      style={{ opacity: isDragging ? "0.5" : "1", position: "relative" }}
      ref={dragRef}
      onClick={openInfoPopup}
      className={styles.card}
    >
      <Counter count={quantity} />
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
