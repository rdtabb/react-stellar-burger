import React, { useMemo, useReducer, useRef } from "react";
import styles from "./burgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingredient } from "../../utils/types";
import CardsSection from "./CardsSection";

type BurgerIngredientsProps = {
  ingredients: Ingredient[] | undefined;
};

const enum REDUCER_ACTION_TYPE {
  SET_BUNS,
  SET_SAUCES,
  SET_MAINS,
}

type ReducerActionType = {
  type: REDUCER_ACTION_TYPE;
};

type InitialState = {
  currentTab: "buns" | "mains" | "sauces";
};

const initialState: InitialState = {
  currentTab: "buns",
};

const reducer = (
  state: InitialState,
  action: ReducerActionType,
): InitialState => {
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

export const BurgerIngredients = ({ ingredients }: BurgerIngredientsProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const bunRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);

  const buns = useMemo(
    () => ingredients?.filter((item) => item.type === "bun"),
    [ingredients],
  );
  const main = useMemo(
    () => ingredients?.filter((item) => item.type === "main"),
    [ingredients],
  );
  const sauces = useMemo(
    () => ingredients?.filter((item) => item.type === "sauce"),
    [ingredients],
  );

  const handleTab = (tab: "buns" | "mains" | "sauces"): void => {
    if (tab === "buns") {
      dispatch({ type: REDUCER_ACTION_TYPE.SET_BUNS });
      bunRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (tab === "sauces") {
      dispatch({ type: REDUCER_ACTION_TYPE.SET_SAUCES });
      sauceRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      dispatch({ type: REDUCER_ACTION_TYPE.SET_MAINS });
      mainRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section style={{ overflow: "hidden" }} className={styles.constructor}>
      <h2 className={styles.header}>Соберите бургер</h2>
      <div className={styles.tabs}>
        <Tab
          active={state.currentTab === "buns" ? true : false}
          value="Булки"
          onClick={() => handleTab("buns")}
        >
          Булки
        </Tab>
        <Tab
          active={state.currentTab === "sauces" ? true : false}
          value="Соусы"
          onClick={() => handleTab("sauces")}
        >
          Соусы
        </Tab>
        <Tab
          active={state.currentTab === "mains" ? true : false}
          value="Начинки"
          onClick={() => handleTab("mains")}
        >
          Начинки
        </Tab>
      </div>
      <section className={styles.overflow}>
        <CardsSection title="Булки" ingredients={buns} ref={bunRef} />
        <CardsSection title="Соусы" ingredients={sauces} ref={sauceRef} />
        <CardsSection title="Начинки" ingredients={main} ref={mainRef} />
      </section>
    </section>
  );
};
