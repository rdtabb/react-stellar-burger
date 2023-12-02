import React, { memo } from "react";
import { FormInput } from "./form-input";

interface ComponentProps
  extends Omit<React.HTMLProps<HTMLInputElement>, "size" | "type" | "ref"> {
  value: string;
  extraClass?: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  placeholder?: string;
}

export interface IFormInputConfig {
  value: string;
  valueSetter: (value: React.SetStateAction<string>) => void;
  as: React.FC<ComponentProps>;
  placeholder?: string;
}

interface IFormInputsProps {
  inputsConfig: IFormInputConfig[];
}

export const FormInputs = memo(({ inputsConfig }: IFormInputsProps) => {
  return (
    <>
      {inputsConfig.map((input, index) => (
        <FormInput {...input} key={index} />
      ))}
    </>
  );
});
