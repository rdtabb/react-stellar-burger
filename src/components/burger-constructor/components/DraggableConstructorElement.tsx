import { memo, useRef, useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  DragItem,
  DRAGNDROP_TYPES,
  IngredientWithUniqueId,
} from "../../../utils/types";
import {
  moveConstructorIngredient,
  removeConstructorIngredient,
} from "../../../services";
import styles from "../burgerConstructor.module.css";

type DraggableContsructorElementProps = {
  item: IngredientWithUniqueId;
  index: number;
};

const DraggableContsructorElement = ({
  item,
  index,
}: DraggableContsructorElementProps) => {
  const dispatch = useDispatch();

  const id = item?.uniqueId;
  const ref = useRef<HTMLElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DRAGNDROP_TYPES.constructorElements,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => {
      return { id, index };
    },
  }));

  const [{ handlerId }, drop] = useDrop(() => ({
    accept: DRAGNDROP_TYPES.constructorElements,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex: number = item.index;
      const hoverIndex: number = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      item.index = hoverIndex;

      dispatch(moveConstructorIngredient({ dragIndex, hoverIndex }));
    },
  }));

  drag(drop(ref));

  const handleRemoveConstructorIngredient = useCallback(() => {
    dispatch(removeConstructorIngredient(id));
  }, [id]);

  return (
    <article
      style={{ opacity: isDragging ? "0" : "1" }}
      className={styles.draggable}
      ref={ref}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        thumbnail={item.image}
        isLocked={false}
        price={item?.price}
        extraClass={styles.constructorElementHover}
        handleClose={handleRemoveConstructorIngredient}
      />
    </article>
  );
};

export default memo(DraggableContsructorElement);
