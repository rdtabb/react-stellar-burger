import { memo } from "react";
import { useSelector } from "react-redux";

import orderDetailsStyles from "../OrderDetails/modal.module.css";
import styles from "./burgerConstructor.module.css";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import Ingredients from "./components/Ingredients";
import PriceOrder from "./components/PriceOrder";

import { ingredientsSelector } from "../../services/orderSlice";
import { openPopupTypeSelector } from "../../services/modalSlice";
import { useConstructorDnd } from "./hooks/hooks";

const BurgerConstructor = () => {
  const constructorIngredients = useSelector(ingredientsSelector);
  const openPopupType = useSelector(openPopupTypeSelector);

  const {
    ingridientDropRef,
    sortRef,
    handleRemoveConstructorIngredient,
    boxShadow,
  } = useConstructorDnd();

  return (
    <section ref={ingridientDropRef}>
      <div style={{ boxShadow }} className={styles.elementsGrid} ref={sortRef}>
        <Ingredients
          ingredients={constructorIngredients}
          handleRemoveConstructorIngredient={handleRemoveConstructorIngredient}
        />
      </div>
      <PriceOrder />
      {openPopupType === "order" && (
        <Modal modalContentClass={orderDetailsStyles.modalContent}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};

export default memo(BurgerConstructor);
