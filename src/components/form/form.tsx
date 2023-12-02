import { memo } from "react";
import styles from "./form.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { FormContainer } from "./components/form-container";
import { type ICaption, FormCaption } from "./components/form-caption";
import { IFormInputConfig, FormInputs } from "./components/form-inputs";

interface IFormProps {
  handleSubmit: (args: any) => any;
  formName: string;
  formTitle: string;
  submitButtonText: string;
  captionsConfig: ICaption[];
  inputsConfig: IFormInputConfig[]
}

export const Form = memo(({
  handleSubmit,
  formName,
  formTitle,
  submitButtonText,
  captionsConfig,
  inputsConfig
}: IFormProps) => {
  return (
    <FormContainer>
      <form name={formName} onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>{formTitle}</h2>
        <FormInputs inputsConfig={inputsConfig} />
        <Button htmlType="submit" type="primary" extraClass={styles.submit}>
          {submitButtonText}
        </Button>
      </form>
      <FormCaption captionsConfig={captionsConfig} />
    </FormContainer>
  );
});
