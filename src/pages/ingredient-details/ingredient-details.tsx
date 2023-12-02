import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./ingredient-details.module.css";
import { IngredientDetails } from "../../components/ingredient-details/ingredient-details";
import { ROUTES } from "../../utils/api";
import { selectedItemSelector } from "../../services/ingredientsSlice";

interface IngredientDetailsPageProps {
  enableRedirect: boolean;
}

export const IngredientDetailsPage = ({
  enableRedirect,
}: IngredientDetailsPageProps) => {
  const item = useSelector(selectedItemSelector);

  if (enableRedirect) {
    return (
      <Link
        className={styles.link}
        to={`${ROUTES.INGREDIENT_DETAILS}/${item?._id}`}
      >
        <div className={styles["ingredient-details"]}>
          <IngredientDetails />
        </div>
      </Link>
    );
  }

  return (
    <div className={styles["ingredient-details"]}>
      <IngredientDetails />
    </div>
  );
};
