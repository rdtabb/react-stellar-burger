import { memo, useRef, useMemo } from "react";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  DragItem,
  DRAGNDROP_TYPES,
  IngredientWithUniqueId,
} from "../../../utils/types";
import { moveConstructorIngredient } from "../../../services/orderSlice";
import { useDrag, useDrop } from "react-dnd";
import styles from "../burgerConstructor.module.css";
import { useDispatch } from "react-redux";

type DraggableContsructorElementProps = {
  item: IngredientWithUniqueId;
  index: number;
  handleRemoveConstructorIngredient: (id: string) => void;
};

const DraggableContsructorElement = ({
  item,
  index,
  handleRemoveConstructorIngredient,
}: DraggableContsructorElementProps) => {
  const dispatch = useDispatch();
  const id = useMemo(() => item.uniqueId, [item]);
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

      console.log(dragIndex, hoverIndex);

      dispatch(moveConstructorIngredient({ dragIndex, hoverIndex }));
    },
  }));

  drag(drop(ref));

  return (
    <article
      style={{ opacity: isDragging ? "0.5" : "1" }}
      className={styles.draggable}
      ref={ref}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        thumbnail={item.image}
        isLocked={false}
        price={item.price}
        extraClass={styles.constructorElementHover}
        handleClose={() => handleRemoveConstructorIngredient(item.uniqueId)}
      />
    </article>
  );
};

export default memo(DraggableContsructorElement);