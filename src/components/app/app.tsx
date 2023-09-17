import styles from "./app.module.css";
import { useEffect, useRef, useReducer } from "react";
import {
  Response,
  InitialReducerState,
  REDUCER_ACTION_TYPE,
  ReducerAction,
} from "../../utils/types";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { IngredientsProvider } from "../../context/IngredientsContext";

const initialState: InitialReducerState = {
  ingredients: undefined,
  isLoading: true,
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
        if (!response.ok) {
          dispatch({ type: REDUCER_ACTION_TYPE.FETCHINGREDIENTS_FAIL });
          throw new Error(
            `Fetch failed with response status: ${response.status}`,
          );
        }
        const data: Response = await response.json();

        dispatch({
          type: REDUCER_ACTION_TYPE.FETCHINGREDIENTS_SUCCESS,
          payload: data.data,
        });
      } catch (err) {
        dispatch({ type: REDUCER_ACTION_TYPE.FETCHINGREDIENTS_FAIL });
        console.error("Fetch failed with the error: ", err);
      }
    })();

    return () => {
      dispatch({ type: REDUCER_ACTION_TYPE.FETCHINGREDIENTS_CLEAN });
      controller.abort();
    };
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.container}>
        <IngredientsProvider>
          <BurgerIngredients
            isLoading={state.isLoading}
            ingredients={state.ingredients}
            isError={state.isError}
          />
        </IngredientsProvider>
        <BurgerConstructor />
      </main>
    </div>
  );
};

export default App;
