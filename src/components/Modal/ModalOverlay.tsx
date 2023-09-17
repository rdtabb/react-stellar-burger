import { memo } from "react";
import { Children } from "../../utils/types";
import styles from "./modal.module.css";

type ModalOverlayProps = Children & {
  isOpen: boolean;
  closePopupOnOverlay: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
};

const ModalOverlay = ({
  children,
  isOpen,
  closePopupOnOverlay,
}: ModalOverlayProps) => {
  return (
    <div
      onClick={closePopupOnOverlay}
      className={isOpen ? styles.modalActive : styles.modal}
    >
      {children}
    </div>
  );
};

export default memo(ModalOverlay);
