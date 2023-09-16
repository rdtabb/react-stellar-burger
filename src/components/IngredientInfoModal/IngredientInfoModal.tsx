import styles from "./infomodal.module.css";
import useIngredientsContext from "../../hooks/useIngredientsContext";
import Modal from "../Modal/Modal";

const IngredientInfoModal = () => {
  const { isIngredientInfoOpen, setIsIngredientInfoOpen, state } =
    useIngredientsContext();

  return (
    <Modal modalContentClass={styles.modalContent} isOpen={isIngredientInfoOpen} setIsOpen={setIsIngredientInfoOpen}>
      <article className={styles.modalGrid}>
        <h2 className={styles.title}>Детали ингредиента</h2>
        <div className={styles.wrapper}>
          <img
            className={styles.image}
            src={state.selectedItem?.image_large}
            alt={state.selectedItem?.name}
          />
          <p className={styles.caption}>{state.selectedItem?.name}</p>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <p>Калории,ккал</p>
              <p className={styles.statNum}>{state.selectedItem?.calories}</p>
            </div>
            <div className={styles.stat}>
              <p>Белки, г</p>
              <p className={styles.statNum}>{state.selectedItem?.proteins}</p>
            </div>
            <div className={styles.stat}>
              <p>Жиры, г</p>
              <p className={styles.statNum}>{state.selectedItem?.fat}</p>
            </div>
            <div className={styles.stat}>
              <p>Углеводы, г</p>
              <p className={styles.statNum}>
                {state.selectedItem?.carbohydrates}
              </p>
            </div>
          </div>
        </div>
      </article>
    </Modal>
  );
};

export default IngredientInfoModal;
