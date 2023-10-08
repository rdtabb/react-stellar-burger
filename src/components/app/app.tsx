import styles from "./app.module.css";
import { useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";

import {
  fetchIngredients,
  setIngredientsStatus,
  selectIngredientsFetchStatus,
} from "../../services/ingredientsSlice";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const ingredientsFetchState = useSelector(selectIngredientsFetchStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (ingredientsFetchState === "idle") {
      dispatch(fetchIngredients());
    }

    return () => {
      dispatch(setIngredientsStatus("idle"));
    };
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.container}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
};

export default App;
