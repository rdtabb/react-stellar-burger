import { memo } from "react";
import styles from "./infomodal.module.css";
import { useSelector } from "react-redux";
import { selectedItemSelector } from "../../services/ingredientsSlice";

const IngredientDetails = () => {
  const selectedItem = useSelector(selectedItemSelector);

  return (
    <article className={styles.modalGrid}>
      <h2 className={styles.title}>Детали ингредиента</h2>
      <div className={styles.wrapper}>
        <img
          className={styles.image}
          src={selectedItem?.image_large}
          alt={selectedItem?.name}
        />
        <p className={styles.caption}>{selectedItem?.name}</p>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <p>Калории,ккал</p>
            <p className={styles.statNum}>{selectedItem?.calories}</p>
          </div>
          <div className={styles.stat}>
            <p>Белки, г</p>
            <p className={styles.statNum}>{selectedItem?.proteins}</p>
          </div>
          <div className={styles.stat}>
            <p>Жиры, г</p>
            <p className={styles.statNum}>{selectedItem?.fat}</p>
          </div>
          <div className={styles.stat}>
            <p>Углеводы, г</p>
            <p className={styles.statNum}>{selectedItem?.carbohydrates}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default memo(IngredientDetails);
