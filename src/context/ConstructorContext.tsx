import React, { createContext, useMemo, useReducer } from "react";
import { Ingredient, Children } from "../utils/types";
import { initialIngredients } from "../utils/initialIngredients";

interface InitialState {
  dispatch: React.Dispatch<ReducerActionType>;
  state: InitialReducerState;
  totalPrice: number;
}

const initialState: InitialState = {
  dispatch: () => {},
  state: { constructorIngredients: [] },
  totalPrice: 0,
};

export const ConstructorContext = createContext<InitialState>(initialState);

export const enum REDUCER_ACTION_TYPE {
  ADD_ELEMENT,
  DELETE_ELEMENT,
}

export type ReducerActionType = {
  type: REDUCER_ACTION_TYPE;
  payload?: Ingredient | string;
};

type InitialReducerState = {
  constructorIngredients: Ingredient[];
};

const initialReducerState: InitialReducerState = {
  constructorIngredients: initialIngredients,
};

const reducer = (
  state: InitialReducerState,
  action: ReducerActionType,
): InitialReducerState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD_ELEMENT: {
      if (!action.payload)
        throw new Error("Provide correct payload to reducer");

      if (typeof action.payload === "string")
        throw new Error("Provide payload of type Ingredient");

      const updatedIngredients = [
        ...state.constructorIngredients,
        action.payload,
      ];

      return { ...state, constructorIngredients: updatedIngredients };
    }
    case REDUCER_ACTION_TYPE.DELETE_ELEMENT: {
      if (typeof action.payload !== "string")
        throw new Error("Provide payload of type string");

      const updatedIngredients = state.constructorIngredients.filter(
        (item) => item._id === action.payload,
      );

      return { ...state, constructorIngredients: updatedIngredients };
    }
    default:
      throw new Error();
  }
};

export const ConstructorProvider = ({ children }: Children) => {
  const [state, dispatch] = useReducer(reducer, initialReducerState);

  const totalPrice = useMemo(() => {
    return state.constructorIngredients.reduce(
      (acc, curr) => acc + curr.price,
      0,
    );
  }, [state.constructorIngredients]);

  return (
    <ConstructorContext.Provider
      value={{
        state,
        dispatch,
        totalPrice,
      }}
    >
      {children}
    </ConstructorContext.Provider>
  );
};
