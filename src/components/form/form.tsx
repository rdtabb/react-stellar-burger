import { memo } from "react";
import styles from "./form.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { FormCaption } from "./components/form-caption";
import { FormInputs } from "./components/form-inputs";
import { IFormProps } from "./form.types";

export const Form = memo(
  ({
    handleSubmit,
    formName,
    formTitle,
    submitButtonText,
    captionsConfig,
    inputsConfig,
  }: IFormProps) => {
    return (
      <main className={styles.main}>
        <form name={formName} onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.title}>{formTitle}</h2>
          <FormInputs inputsConfig={inputsConfig} />
          <Button htmlType="submit" type="primary" extraClass={styles.submit}>
            {submitButtonText}
          </Button>
        </form>
        <FormCaption captionsConfig={captionsConfig} />
      </main>
    );
  }
);
