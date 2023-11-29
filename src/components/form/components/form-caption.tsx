import React from "react";
import styles from '../form.module.css'
import { Link } from "react-router-dom";

export interface ICaption {
  captionText: string;
  linkText: string;
  linkRoute: string;
}

interface IFormCaption {
  captionsConfig: ICaption[];
}

export const FormCaption = ({ captionsConfig }: IFormCaption) => {
  return (
    <div className={styles.captionContainer}>
      {captionsConfig.map((caption) => (
        <p className={styles.caption}>
            {caption.captionText}{" "}
            <Link className={styles.captionLink} to={caption.linkRoute}>
                {caption.linkText}
            </Link>
        </p>
      ))}
    </div>
  );
};
