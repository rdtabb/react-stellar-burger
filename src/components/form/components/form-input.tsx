import React from "react";
import styles from "../form.module.css";

interface ComponentProps
  extends Omit<React.HTMLProps<HTMLInputElement>, "size" | "type" | "ref"> {
  value: string;
  extraClass?: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  placeholder?: string;
}

interface IFormInput {
  value: string;
  valueSetter: (value: React.SetStateAction<string>) => void;
  as: React.FC<ComponentProps>;
  placeholder?: string;
}

export const FormInput = ({
  as: Component,
  value,
  valueSetter,
  placeholder,
}: IFormInput) => {
  return (
    <Component
      value={value}
      extraClass={styles.input}
      onChange={(e) => valueSetter(e.target.value)}
      placeholder={placeholder}
    />
  );
};
