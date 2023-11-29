import React, { PropsWithChildren } from "react";
import styles from '../form.module.css'

export const FormContainer = ({ children }: PropsWithChildren<unknown>) => {
  return <main className={styles.main}>{children}</main>;
};
