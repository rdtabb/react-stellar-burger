import { memo } from "react";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingredient, DRAGNDROP_TYPES } from "../../../utils/types";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { removeConstructorIngredient } from "../../../services/orderSlice";
import styles from "../burgerConstructor.module.css";

type DraggableContsructorElementProps = {
  item: Ingredient;
  index: number;
};

const DraggableContsructorElement = ({
  item,
  index,
}: DraggableContsructorElementProps) => {
  const [{ handlerId }, dragref] = useDrag(() => ({
    type: DRAGNDROP_TYPES.constructorElements,
    item,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
  }));
  const dispatch = useDispatch();

  return (
    <article className={styles.draggable} ref={dragref}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        thumbnail={item.image}
        isLocked={false}
        price={item.price}
        extraClass={styles.constructorElementHover}
        handleClose={() => dispatch(removeConstructorIngredient(index))}
      />
    </article>
  );
};

export default memo(DraggableContsructorElement);
