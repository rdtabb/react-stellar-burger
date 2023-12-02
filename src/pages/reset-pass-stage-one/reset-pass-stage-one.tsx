import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { Form, ICaption, IFormInputConfig } from "../../components/form";

import { ROUTES } from "../../utils/api";
import { ResetPasswordEmailStageResponse } from "../../utils/types";
import { useResetPasswordEmailStageMutation } from "../../services/api/apiSlice";

const resetPassStageOneCaptionsConfig: ICaption[] = [
  {
    linkRoute: ROUTES.LOGIN,
    linkText: "Войти",
    captionText: "Вспомнили пароль?",
  },
];

export const ResetPassStageOne = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");

  const [resetPassword, { isLoading }] = useResetPasswordEmailStageMutation();

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const result = (await resetPassword({ email })) as {
        data: ResetPasswordEmailStageResponse;
      };
      if (result.data.success) {
        navigate(ROUTES.RESET_PASSWORD, {
          state: {
            previousUrl: ROUTES.FORGOT_PASSWORD,
          },
        });
      }
    },
    [email],
  );

  const resetPassStageOneInputsConfig: IFormInputConfig[] = useMemo(
    () => [
      {
        value: email,
        valueSetter: setEmail,
        as: EmailInput,
      },
    ],
    [email],
  );

  return (
    <Form
      formName="forgotForm"
      formTitle="Восстановление пароля"
      submitButtonText={isLoading ? "Восстанавливаем..." : "Восстановить"}
      handleSubmit={handleSubmit}
      captionsConfig={resetPassStageOneCaptionsConfig}
      inputsConfig={resetPassStageOneInputsConfig}
    />
  );
};
