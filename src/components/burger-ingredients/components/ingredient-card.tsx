import { useCallback, memo } from "react";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";

import styles from "../burgerIngredients.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { ROUTES } from "../../../utils/api";
import { saveSelectedItem } from "../../../services/ingredientsSlice";
import { quantitySelector } from "../../../services/orderSlice";
import { RootState } from "../../../store/store";
import { Ingredient, DRAGNDROP_TYPES } from "../../../utils/types";
import { setPopupState } from "../../../services/modalSlice";

type IngredientCardProps = {
  item: Ingredient;
};

export const IngredientCard = memo(({ item }: IngredientCardProps) => {
  const dispatch = useDispatch();
  const location = useLocation();

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
    <Link
      to={`${ROUTES.INGREDIENT_DETAILS}/${item._id}`}
      state={{ previousLocation: location }}
      className={styles["card-link"]}
    >
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
    </Link>
  );
});

const CounterWithMemo = memo(({ item }: IngredientCardProps) => {
  const quantity = useSelector((state: RootState) =>
    quantitySelector(state, item._id),
  );

  return <Counter count={quantity} />;
});
