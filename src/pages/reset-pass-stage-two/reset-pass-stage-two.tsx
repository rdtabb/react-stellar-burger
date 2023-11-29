import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { Form, ICaption, IFormInputConfig } from "../../components/form";

import { ROUTES } from "../../utils/api";
import { ResetPasswordEmailStageResponse } from "../../utils/types";
import { useResetPasswordTokenStageMutation } from "../../services/api/apiSlice";

const resetPassStageTwoCaptionsConfig: ICaption[] = [
  {
    linkRoute: ROUTES.LOGIN,
    linkText: "Войти",
    captionText: "Вспомнили пароль?",
  },
];

export const ResetPassStageTwo = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useState<string>("");

  const [mutate, { isLoading, isError }] = useResetPasswordTokenStageMutation();

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const result = (await mutate({
        password,
        token,
      })) as {
        data: ResetPasswordEmailStageResponse;
      };
      if (result.data.success) {
        navigate(ROUTES.LOGIN);
      }
    },
    [password, token]
  );

  const resetPassStageTwoInputsConfig: IFormInputConfig[] = useMemo(
    () => [
      {
        value: password,
        valueSetter: setPassword,
        as: PasswordInput,
        placeholder: "Введите новый пароль",
      },
      {
        value: token,
        valueSetter: setToken,
        as: PasswordInput,
        placeholder: "Введите код из письма",
      },
    ],
    [password, token]
  );

  return (
    <Form
      formName="forgotForm"
      formTitle="Восстановление пароля"
      handleSubmit={handleSubmit}
      submitButtonText={
        isLoading
          ? "Сохраняем"
          : isError
          ? "Что-то пошло не так, попробуйте еще раз"
          : "Cохранить"
      }
      captionsConfig={resetPassStageTwoCaptionsConfig}
      inputsConfig={resetPassStageTwoInputsConfig}
    />
  );
};
