import { memo } from "react";
import { useSelector } from "react-redux";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "../burgerConstructor.module.css";
import { bunSelector } from "../../../services";

type BunConstructorElementProps = {
  type: string;
};

export const BunConstructorElement = memo(
  ({ type }: BunConstructorElementProps) => {
    const bun = useSelector(bunSelector);

    return (
      <>
        {!!bun && (type === "top" || type === "bottom") ? (
          <ConstructorElement
            thumbnail={bun.image_mobile}
            price={bun.price}
            text={type === "top" ? `${bun?.name} (верх)` : `${bun?.name} (низ)`}
            isLocked={true}
            type={type}
            extraClass={styles.constructorElementHover}
          />
        ) : (
          <section
            className={
              type === "top" ? styles.emptyBunTop : styles.emptyBunBottom
            }
          >
            <p>Добавьте булку</p>
          </section>
        )}
      </>
    );
  }
);
