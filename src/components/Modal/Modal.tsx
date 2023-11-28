import React, { useCallback, useEffect, memo } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";

import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { Children } from "../../utils/types";
import { ModalOverlay } from "./modal-overlay";
import { setPopupClass, setPopupState } from "../../services/modalSlice";

type ModalProps = Children & {
  modalContentClass: string;
};

export const Modal = memo(({ children, modalContentClass }: ModalProps) => {
  const dispatch = useDispatch();

  const closePopup = useCallback((): void => {
    dispatch(setPopupClass(styles.modal));
    setTimeout(() => {
      dispatch(setPopupState("closed"));
    }, 200);
  }, []);

  const closePopupOnOverlay = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      if (e.target === e.currentTarget) closePopup();
    },
    []
  );

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        closePopup();
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  return createPortal(
    <ModalOverlay closePopupOnOverlay={closePopupOnOverlay}>
      <div className={modalContentClass}>
        {children}
        <div className={styles.closeWrapper}>
          <CloseIcon onClick={closePopup} type="primary" />
        </div>
      </div>
    </ModalOverlay>,
    document.getElementById("modals")!
  );
});
