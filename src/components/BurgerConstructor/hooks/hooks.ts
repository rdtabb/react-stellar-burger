import React, { useCallback, useMemo } from "react";
import { useAppDispatch } from "../../../store/store";
import { useDrop } from "react-dnd";
import {
  addConstructorBun,
  addConstructorIngredient,
  removeConstructorIngredient,
} from "../../../services/orderSlice";
import { DRAGNDROP_TYPES, Ingredient } from "../../../utils/types";

export const useConstructorDnd = () => {
  const dispatch = useAppDispatch();

  const [{ isOver }, ingridientDropRef] = useDrop(() => ({
    accept: DRAGNDROP_TYPES.ingredients,
    drop: (item: Ingredient) => {
      handleDrop(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const [, sortRef] = useDrop(() => ({
    accept: DRAGNDROP_TYPES.constructorElements,
  }));

  const handleDrop = useCallback((item: Ingredient) => {
    if (item.type === "bun") {
      dispatch(addConstructorBun(item));
    } else {
      dispatch(addConstructorIngredient(item));
    }
  }, []);

  const handleRemoveConstructorIngredient = useCallback((id: string) => {
    dispatch(removeConstructorIngredient(id));
  }, []);

  const boxShadow = useMemo(
    () => (isOver ? "0 0 23px 15px var(--clr-accent)" : "none"),
    [isOver]
  );

  return useMemo(
    () => ({
      ingridientDropRef,
      sortRef,
      handleRemoveConstructorIngredient,
      boxShadow,
    }),
    [ingridientDropRef, sortRef, handleRemoveConstructorIngredient, boxShadow]
  );
};
