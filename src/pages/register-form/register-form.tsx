import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  PasswordInput,
  Input,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Form, IFormInputConfig, type ICaption } from "../../components/form";

import { useRegisterUserMutation } from "../../services/api/apiSlice";
import { AuthRegResponse } from "../../utils/types";
import { ROUTES } from "../../utils/api";

const registerFormCaptionConfig: ICaption[] = [
  {
    captionText: "Уже зарегистрированы?",
    linkText: "Войти",
    linkRoute: ROUTES.LOGIN,
  },
];

export const RegisterForm = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [register, { isLoading }] = useRegisterUserMutation();

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const params = {
        name,
        email,
        password,
      };
      const result = (await register(params)) as { data: AuthRegResponse };
      if (result.data.success) {
        navigate(ROUTES.LOGIN);
      }
    },
    [name, email, password],
  );

  const registerInputsConfig: IFormInputConfig[] = useMemo(
    () => [
      {
        value: name,
        valueSetter: setName,
        as: Input,
        placeholder: "Имя",
      },
      {
        value: email,
        valueSetter: setEmail,
        as: EmailInput,
      },
      {
        value: password,
        valueSetter: setPassword,
        as: PasswordInput,
      },
    ],
    [password, name, email],
  );

  return (
    <Form
      formName="loginForm"
      formTitle="Регистрация"
      submitButtonText={!isLoading ? "Зарегистрироваться" : "Регистрируем..."}
      handleSubmit={handleSubmit}
      captionsConfig={registerFormCaptionConfig}
      inputsConfig={registerInputsConfig}
    />
  );
};
