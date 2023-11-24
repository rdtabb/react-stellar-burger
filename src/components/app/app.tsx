import styles from "./app.module.css";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";

const App = () => {
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
