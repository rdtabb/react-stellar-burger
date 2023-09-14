import React, { useCallback, useEffect } from "react";
import styles from "./infomodal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import useIngredientsContext from "../../hooks/useIngredientsContext";

const IngredientInfoModal = () => {
  const { isIngredientInfoOpen, setIsIngredientInfoOpen, state } =
    useIngredientsContext();

  const closePopup = useCallback(() => {
    setIsIngredientInfoOpen(false);
  }, []);

  useEffect(() => {
    const handleEscClose = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        closePopup();
      }
    };

    isIngredientInfoOpen
      ? document.addEventListener("keydown", handleEscClose)
      : document.removeEventListener("keydown", handleEscClose);
  }, [isIngredientInfoOpen]);

  return (
    <div
      onClick={closePopup}
      className={isIngredientInfoOpen ? styles.modalActive : styles.modal}
    >
      <div className={styles.modalContent}>
        <article className={styles.modalGrid}>
          <h2 className={styles.title}>Детали ингредиента</h2>
          <div className={styles.wrapper}>
            <img
              style={{ minHeight: "240px" }}
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
        <div className={styles.closeWrapper}>
          <CloseIcon onClick={closePopup} type="primary" />
        </div>
      </div>
    </div>
  );
};

export default IngredientInfoModal;
