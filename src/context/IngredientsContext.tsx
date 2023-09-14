import React, { createContext, useReducer, useState } from "react";
import { Children, Ingredient } from "../utils/types";

interface InitialState {
  state: InitialReducerState;
  dispatch: React.Dispatch<ReducerActionType>;
  isIngredientInfoOpen: boolean;
  setIsIngredientInfoOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialState: InitialState = {
  state: { currentTab: "buns" },
  dispatch: () => {},
  isIngredientInfoOpen: false,
  setIsIngredientInfoOpen: () => {},
};

export const IngredientsContext = createContext<InitialState>(initialState);

export const enum REDUCER_ACTION_TYPE {
  SET_BUNS,
  SET_SAUCES,
  SET_MAINS,
  SELECT_ITEM,
}

type ReducerActionType = {
  type: REDUCER_ACTION_TYPE;
  payload?: Ingredient;
};

type InitialReducerState = {
  currentTab: "buns" | "mains" | "sauces";
  selectedItem?: Ingredient;
};

const initialReducerState: InitialReducerState = {
  currentTab: "buns",
  selectedItem: undefined,
};

const reducer = (
  state: InitialReducerState,
  action: ReducerActionType
): InitialReducerState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.SET_BUNS:
      return { ...state, currentTab: "buns" };
    case REDUCER_ACTION_TYPE.SET_SAUCES:
      return { ...state, currentTab: "sauces" };
    case REDUCER_ACTION_TYPE.SET_MAINS:
      return { ...state, currentTab: "mains" };
    case REDUCER_ACTION_TYPE.SELECT_ITEM:
      // if (action.payload?._id === state.selectedItem?._id) {
      //   return state;
      // }

      return { ...state, selectedItem: action.payload };
    default:
      throw new Error();
  }
};

export const IngredientsProvider = ({ children }: Children) => {
  const [state, dispatch] = useReducer(reducer, initialReducerState);
  const [isIngredientInfoOpen, setIsIngredientInfoOpen] = useState<boolean>(false);

  return (
    <IngredientsContext.Provider
      value={{ state, dispatch, isIngredientInfoOpen, setIsIngredientInfoOpen }}
    >
      {children}
    </IngredientsContext.Provider>
  );
};
