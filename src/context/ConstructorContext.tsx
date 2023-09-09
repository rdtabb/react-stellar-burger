import React, { createContext, useMemo, useReducer } from "react";
import { Ingredient, Children } from "../utils/types";

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
      _id: "643d69a5c3f7b9001cfa094a",
      name: "Сыр с астероидной плесенью",
      type: "main",
      proteins: 84,
      fat: 48,
      carbohydrates: 420,
      calories: 3377,
      price: 4142,
      image: "https://code.s3.yandex.net/react/code/cheese.png",
      image_mobile: "https://code.s3.yandex.net/react/code/cheese-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/cheese-large.png",
      __v: 0,
    },
    {
      _id: "643d69a5c3f7b9001cfa0941",
      name: "Биокотлета из марсианской Магнолии",
      type: "main",
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: "https://code.s3.yandex.net/react/code/meat-01.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
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
    {
      _id: "643d69a5c3f7b9001cfa0946",
      name: "Хрустящие минеральные кольца",
      type: "main",
      proteins: 808,
      fat: 689,
      carbohydrates: 609,
      calories: 986,
      price: 300,
      image: "https://code.s3.yandex.net/react/code/mineral_rings.png",
      image_mobile:
        "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
      image_large:
        "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
      __v: 0,
    },
    {
      _id: "643d69a5c3f7b9001cfa0949",
      name: "Мини-салат Экзо-Плантаго",
      type: "main",
      proteins: 1,
      fat: 2,
      carbohydrates: 3,
      calories: 6,
      price: 4400,
      image: "https://code.s3.yandex.net/react/code/salad.png",
      image_mobile: "https://code.s3.yandex.net/react/code/salad-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/salad-large.png",
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
