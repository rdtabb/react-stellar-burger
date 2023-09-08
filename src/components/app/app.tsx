import styles from "./app.module.css";
import React, { useEffect, useRef, useReducer } from "react";
import {
  Response,
  InitialReducerState,
  REDUCER_ACTION_TYPE,
  ReducerAction,
} from "../../utils/types";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients";

import { ConstructorProvider } from "../../context/ConstructorContext";

const initialState: InitialReducerState = {
  ingredients: undefined,
  isLoading: false,
  isError: false,
};

const reducer = (
  state: InitialReducerState,
  action: ReducerAction,
): InitialReducerState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.FETCHINGREDIENTS_INIT:
      return { ...state, isLoading: true };
    case REDUCER_ACTION_TYPE.FETCHINGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.payload,
        isLoading: false,
        isError: false,
      };
    case REDUCER_ACTION_TYPE.FETCHINGREDIENTS_FAIL:
      return { ...state, isError: true, isLoading: false };
    case REDUCER_ACTION_TYPE.FETCHINGREDIENTS_CLEAN:
      return { ...initialState };
    default:
      throw new Error("undefined reducer action type");
  }
};

const App = () => {
  const controllerRef = useRef<AbortController>(new AbortController());
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const controller = controllerRef.current;
    const signal = controller.signal;

    void (async (): Promise<void> => {
      try {
        dispatch({ type: REDUCER_ACTION_TYPE.FETCHINGREDIENTS_INIT });
        const response = await fetch(
          "https://norma.nomoreparties.space/api/ingredients",
          {
            signal,
          },
        );
        if (!response.ok) throw new Error("Error while fetching");
        const data: Response = await response.json();

        dispatch({
          type: REDUCER_ACTION_TYPE.FETCHINGREDIENTS_SUCCESS,
          payload: data.data,
        });
      } catch (err) {
        dispatch({ type: REDUCER_ACTION_TYPE.FETCHINGREDIENTS_FAIL });
        console.error("Error while fetching ingridients: ", err);
      }
    })();

    return () => {
      dispatch({ type: REDUCER_ACTION_TYPE.FETCHINGREDIENTS_CLEAN });
      controller.abort();
    };
  }, []);

  return (
    <main className={styles.app}>
      <AppHeader />
      <section className={styles.container}>
        <BurgerIngredients ingredients={state.ingredients} />
        <ConstructorProvider>
          <BurgerConstructor />
        </ConstructorProvider>
      </section>
    </main>
  );
};

export default App;
