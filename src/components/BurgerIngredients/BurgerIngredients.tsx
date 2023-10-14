import { useRef, memo, useEffect } from "react";
import ingredientDetailstyles from "../IngredientDetails/infomodal.module.css";
import styles from "./burgerIngredients.module.css";

import {
  setTab,
  tabSelector,
  bunSelector,
  mainsSelector,
  saucesSelector,
} from "../../services/ingredientsSlice";
import { openPopupTypeSelector } from "../../services/modalSlice";
import { useSelector, useDispatch } from "react-redux";

import { Tab as TabType } from "../../utils/types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import CardsSection from "./components/CardsSection";
import Modal from "../Modal/Modal";

interface RefElementsCollection {
  refCurrent: HTMLDivElement | null;
  type: TabType;
}

const BurgerIngredients = () => {
  const dispatch = useDispatch();

  const selectedTab = useSelector(tabSelector);
  const openPopupType = useSelector(openPopupTypeSelector);
  const buns = useSelector(bunSelector);
  const mains = useSelector(mainsSelector);
  const sauces = useSelector(saucesSelector);

  const scrollSectionRef = useRef<HTMLElement>(null);
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

  useEffect(() => {
    const scrollRefCurrent = scrollSectionRef.current;
    const elements: RefElementsCollection[] = [
      {
        refCurrent: bunRef.current,
        type: "buns",
      },
      {
        refCurrent: mainRef.current,
        type: "mains",
      },
      {
        refCurrent: sauceRef.current,
        type: "sauces",
      },
    ];

    const handleScroll = (): void => {
      elements.forEach(({ refCurrent: element, type }) => {
        if (!scrollRefCurrent) return;
        const offset = scrollRefCurrent.getBoundingClientRect().top;
        const boundingClientRect = element?.getBoundingClientRect();
        const top = boundingClientRect?.top;
        if (!top) return;

        const distance = offset - top;
        if (top && distance >= -100 && distance < 100) {
          dispatch(setTab(type));
        }
      });
    };

    scrollRefCurrent?.addEventListener("scroll", handleScroll);

    return () => {
      scrollRefCurrent?.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      <section className={styles.overflow} ref={scrollSectionRef}>
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

export default memo(BurgerIngredients);
