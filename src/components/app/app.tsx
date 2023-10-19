import styles from "./app.module.css";
import { useEffect } from "react";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";

import { ingredientsFetchStatusSelector } from "../../services/ingredientsSlice";
import { fetchIngredients } from "../../services/asyncThunks";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const ingredientsFetchState = useSelector(ingredientsFetchStatusSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (ingredientsFetchState === "idle") {
      dispatch(fetchIngredients());
    }
  }, []);

  return (
    <div className={styles.app}>
      <main className={styles.container}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
};

export default App;
