import styles from "./app.module.css";
import { useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { Link } from "react-router-dom";

import {
  setIngredientsStatus,
  ingredientsFetchStatusSelector,
} from "../../services/ingredientsSlice";
import { fetchIngredients } from "../../services/asyncThunks";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const ingredientsFetchState = useSelector(ingredientsFetchStatusSelector);
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
      <Link to={"/login"}>LoginPage</Link>
      <main className={styles.container}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
};

export default App;
