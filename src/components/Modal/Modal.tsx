import React, { useCallback, useEffect, memo } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Children } from "../../utils/types";

type ModalProps = Children & {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalContentClass: string
};

const Modal = ({ children, isOpen, setIsOpen, modalContentClass }: ModalProps) => {
  const closePopup = useCallback((): void => {
    setIsOpen(false);
  }, []);

  const closePopupOnOverlay = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) closePopup()
  }

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        closePopup();
      }
    };

    isOpen
      ? document.addEventListener("keydown", handleEscKey)
      : document.removeEventListener("keydown", handleEscKey);
  }, [isOpen]);

  return (
    <>
      {createPortal(
        <div
          onClick={closePopupOnOverlay}
          className={isOpen ? styles.modalActive : styles.modal}
        >
          <div className={modalContentClass}>
            {children}
            <div className={styles.closeWrapper}>
              <CloseIcon onClick={closePopup} type="primary" />
            </div>
          </div>
        </div>,
        document.getElementById("root")!,
      )}
    </>
  );
};

export default memo(Modal);
