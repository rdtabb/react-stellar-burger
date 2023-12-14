import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import styles from "./ingredient-details.module.css";
import { IngredientDetails } from "../../components/ingredient-details/ingredient-details";
import { ROUTES } from "../../utils";

interface IngredientDetailsPageProps {
  enableRedirect: boolean;
}

export const IngredientDetailsPage = ({
  enableRedirect,
}: IngredientDetailsPageProps) => {
  const location = useLocation();
  const item = location.state?.item;

  if (enableRedirect) {
    return (
      <Link
        className={styles.link}
        to={`${ROUTES.INGREDIENT_DETAILS}/${item?._id}`}
        state={{ item }}
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
