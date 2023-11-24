import { memo } from "react";
import styles from "../burgerConstructor.module.css";
import { IngredientWithUniqueId } from "../../../utils/types";
import BunConstructorElement from "./BunConstructorElement";
import DraggableConstructorElement from "./DraggableConstructorElement";

interface IngredientsProps {
  ingredients?: IngredientWithUniqueId[];
  handleRemoveConstructorIngredient: (id: string) => void;
}

const Ingredients = ({
  ingredients,
  handleRemoveConstructorIngredient,
}: IngredientsProps) => {
  return (
    <>
      <BunConstructorElement type="top" />
      {ingredients?.length ? (
        <div className={styles.draggableElements}>
          {ingredients.map((item: IngredientWithUniqueId, index: number) => (
            <DraggableConstructorElement
              key={item.uniqueId}
              handleRemoveConstructorIngredient={
                handleRemoveConstructorIngredient
              }
              item={item}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className={styles.draggableElementsEmpty}>
          <p>Добавьте ингредиенты</p>
        </div>
      )}
      <BunConstructorElement type="bottom" />
    </>
  );
};

export default memo(Ingredients);
