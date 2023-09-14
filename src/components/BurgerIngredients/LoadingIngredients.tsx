import React from "react";
import styles from "./burgerIngredients.module.css";

const LoadingIngredients = () => {
  return (
    <>
      <article className={styles.cardEmpty}></article>
      <article className={styles.cardEmpty}></article>
      <article className={styles.cardEmpty}></article>
      <article className={styles.cardEmpty}></article>
    </>
  );
};

export default LoadingIngredients;
