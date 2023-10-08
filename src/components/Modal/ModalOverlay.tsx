import { memo, useEffect, useState } from "react";
import { Children } from "../../utils/types";
import styles from "./modal.module.css";

type ModalOverlayProps = Children & {
  closePopupOnOverlay: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
};

const ModalOverlay = ({ children, closePopupOnOverlay }: ModalOverlayProps) => {
  const [popupClass, setPopupClass] = useState<string>(styles.modal);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPopupClass(styles.modalActive);
    }, 200);

    return () => {
      setPopupClass(styles.modal);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div onClick={closePopupOnOverlay} className={popupClass}>
      {children}
    </div>
  );
};

export default memo(ModalOverlay);
