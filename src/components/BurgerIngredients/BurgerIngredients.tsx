import { useMemo, useRef, memo } from "react";
import ingredientDetailstyles from "../IngredientDetails/infomodal.module.css";
import styles from "./burgerIngredients.module.css";

import {
  setTab,
  selectSauces,
  selectMains,
  selectBuns,
  selectTab,
} from "../../services/ingredientsSlice";
import { openPopupTypeSelector } from "../../services/modalSlice";
import { useSelector, useDispatch } from "react-redux";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import CardsSection from "./components/CardsSection";
import Modal from "../Modal/Modal";

const BurgerIngredients = () => {
  const selectedTab = useSelector(selectTab);
  const dispatch = useDispatch();

  const memoizedOpenPopupType = useMemo(openPopupTypeSelector, []);
  const openPopupType = useSelector(memoizedOpenPopupType);

  const selectFilteredBuns = useMemo(selectBuns, []);
  const selectFilteredMains = useMemo(selectMains, []);
  const selectFilteredSauces = useMemo(selectSauces, []);
  const buns = useSelector(selectFilteredBuns);
  const mains = useSelector(selectFilteredMains);
  const sauces = useSelector(selectFilteredSauces);

  const bunRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);

  const handleTab = (tab: "buns" | "mains" | "sauces"): void => {
    if (tab === "buns") {
      dispatch(setTab("buns"));
      bunRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (tab === "sauces") {
      dispatch(setTab("sauces"));
      sauceRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      dispatch(setTab("mains"));
      mainRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.constructor}>
      <h2 className={styles.header}>Соберите бургер</h2>
      <div className={`${styles.tabs} tabs-global`}>
        <Tab
          active={selectedTab === "buns" ? true : false}
          value="Булки"
          onClick={() => handleTab("buns")}
        >
          Булки
        </Tab>
        <Tab
          active={selectedTab === "sauces" ? true : false}
          value="Соусы"
          onClick={() => handleTab("sauces")}
        >
          Соусы
        </Tab>
        <Tab
          active={selectedTab === "mains" ? true : false}
          value="Начинки"
          onClick={() => handleTab("mains")}
        >
          Начинки
        </Tab>
      </div>
      <section className={styles.overflow}>
        <CardsSection title="Булки" ingredients={buns} ref={bunRef} />
        <CardsSection title="Соусы" ingredients={sauces} ref={sauceRef} />
        <CardsSection title="Начинки" ingredients={mains} ref={mainRef} />
      </section>
      {openPopupType === "info" && (
        <Modal modalContentClass={ingredientDetailstyles.modalContent}>
          <IngredientDetails />
        </Modal>
      )}
    </section>
  );
};

const MemoizedIngredients = memo(BurgerIngredients);

export default MemoizedIngredients;
