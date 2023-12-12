import styles from "./constructor.module.css";
import { BurgerConstructor } from "../../components/burger-constructor/burger-constructor";
import { BurgerIngredients } from "../../components/burger-ingredients/burger-ingredients";

export const Constructor = () => (
  <div className={styles.app}>
    <main className={styles.container}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  </div>
);
