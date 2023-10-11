import { useCallback, memo } from "react";
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
  // const quantity = useSelector((state: RootState) =>
  //   quantitySelector(state, item._id),
  // );
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
    dispatch(saveSelectedItem(item));
  }, []);

  return (
    <article
      style={{ opacity: isDragging ? "0.5" : "1", position: "relative" }}
      ref={dragRef}
      onClick={openInfoPopup}
      className={styles.card}
    >
      <CounterWithMemo item={item} />
      <img src={item.image} alt={item.name} />
      <div className={styles.card__price}>
        <CurrencyIcon type="primary" />
        <p>{item.price}</p>
      </div>
      <p className={styles.card__name}>{item.name}</p>
    </article>
  );
};

const CounterWithMemo = memo(({ item }: IngredientCardProps) => {
  const quantity = useSelector((state: RootState) =>
    quantitySelector(state, item._id),
  );

  return <Counter count={quantity} />;
});

export default memo(IgredientCard);
