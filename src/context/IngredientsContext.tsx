import React, { ReactNode, createContext, useReducer } from "react";
import { Children } from "../utils/types";

interface InitialState {
  state: InitialReducerState;
  dispatch: React.Dispatch<ReducerActionType>;
}

const initialState: InitialState = {
  state: { currentTab: "buns" },
  dispatch: () => {},
};

export const IngredientsContext = createContext<InitialState>(initialState);

export const enum REDUCER_ACTION_TYPE {
  SET_BUNS,
  SET_SAUCES,
  SET_MAINS,
}

type ReducerActionType = {
  type: REDUCER_ACTION_TYPE;
};

type InitialReducerState = {
  currentTab: "buns" | "mains" | "sauces";
};

const initialReducerState: InitialReducerState = {
  currentTab: "buns",
};

const reducer = (
  state: InitialReducerState,
  action: ReducerActionType,
): InitialReducerState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.SET_BUNS:
      return { ...state, currentTab: "buns" };
    case REDUCER_ACTION_TYPE.SET_SAUCES:
      return { ...state, currentTab: "sauces" };
    case REDUCER_ACTION_TYPE.SET_MAINS:
      return { ...state, currentTab: "mains" };
    default:
      throw new Error();
  }
};

export const IngredientsProvider = ({ children }: Children) => {
  const [state, dispatch] = useReducer(reducer, initialReducerState);

  return (
    <IngredientsContext.Provider value={{ state, dispatch }}>
      {children}
    </IngredientsContext.Provider>
  );
};
