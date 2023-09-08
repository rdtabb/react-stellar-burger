import React, { createContext, ReactNode, useMemo, useReducer } from "react";
import { Ingredient } from "../utils/types";

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

interface ConstructorContextProviderProps {
  children: ReactNode | ReactNode[];
}

const enum REDUCER_ACTION_TYPE {
  SET_INITIAL_ELEMENTS,
  ADD_ELEMENT,
  DELETE_ELEMENT,
}

type ReducerActionType = {
  type: REDUCER_ACTION_TYPE;
  payload?: Ingredient | Ingredient[];
};

type InitialReducerState = {
  constructorIngredients: Ingredient[];
};

const initialReducerState: InitialReducerState = {
  constructorIngredients: [
    {
      _id: "643d69a5c3f7b9001cfa093c",
      name: "Краторная булка N-200i",
      type: "bun",
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      __v: 0,
    },
    {
      _id: "643d69a5c3f7b9001cfa093d",
      name: "Флюоресцентная булка R2-D3",
      type: "bun",
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: "https://code.s3.yandex.net/react/code/bun-01.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
      __v: 0,
    },
  ],
};

const reducer = (
  state: InitialReducerState,
  action: ReducerActionType,
): InitialReducerState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.SET_INITIAL_ELEMENTS: {
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          constructorIngredients: [...action.payload],
        };
      } else {
        throw new Error(
          "Provide correct payload to SET_INITIAL_ELEMENTS reducer",
        );
      }
    }
    default:
      throw new Error();
  }
};

export const ConstructorProvider = ({
  children,
}: ConstructorContextProviderProps) => {
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
