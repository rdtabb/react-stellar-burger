import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

import styles from "../login-form/loginForm.module.css";
import { ROUTES } from "../../utils/api";
import { ResetPasswordEmailStageResponse } from "../../utils/types";
import { useResetPasswordTokenStageMutation } from "../../services/api/apiSlice";

export const ResetPassStageTwo = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useState<string>("");

  const [mutate, { isLoading, isError }] = useResetPasswordTokenStageMutation();

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
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
  }, [password, token]);

  return (
    <main className={styles.main}>
      <form name="forgotForm" className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Восстановление пароля</h2>
        <PasswordInput
          value={password}
          placeholder="Введите новый пароль"
          extraClass={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          extraClass={styles.input}
          value={token}
          placeholder="Введите код из письма"
          onChange={(e) => setToken(e.target.value)}
        />
        <Button htmlType="submit" type="primary" extraClass={styles.submit}>
          {isLoading
            ? "Сохраняем"
            : isError
            ? "Что-то пошло не так, попробуйте еще раз"
            : "Cохранить"}
        </Button>
        <div className={styles.captionContainer}>
          <p className={styles.caption}>
            Вспомнили пароль?{" "}
            <Link className={styles.captionLink} to="/login">
              Войти
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
};
