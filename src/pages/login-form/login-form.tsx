import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Form, ICaption, IFormInputConfig } from "../../components/form";

import { useAuthenticateUserMutation, setAuthInfo } from "../../services";
import { setTokens, AuthRegResponse, ROUTES } from "../../utils";

const loginFormCaptionsConfig: ICaption[] = [
  {
    linkRoute: ROUTES.REGISTER,
    linkText: "Зарегистрироваться",
    captionText: "Вы — новый пользователь?",
  },
  {
    linkRoute: ROUTES.FORGOT_PASSWORD,
    linkText: "Восстановить пароль",
    captionText: "Забыли пароль?",
  },
];

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [login, { isLoading, isError }] = useAuthenticateUserMutation();

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const params = { email, password };
      const result = (await login(params)) as { data: AuthRegResponse };
      if (result.data.success) {
        dispatch(setAuthInfo(result.data));
        setTokens(result.data);
      }
    },
    [password, email],
  );

  const loginFormInputsConfig: IFormInputConfig[] = useMemo(
    () => [
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
    [password, email],
  );

  return (
    <Form
      formName="loginForm"
      formTitle="Вход"
      submitButtonText={
        isLoading
          ? "Проверяем логин..."
          : isError
          ? "Что-то пошло не так, попробуйте еще раз"
          : "Войти"
      }
      handleSubmit={handleSubmit}
      captionsConfig={loginFormCaptionsConfig}
      inputsConfig={loginFormInputsConfig}
    />
  );
};
