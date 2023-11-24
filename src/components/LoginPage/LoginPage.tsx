import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Button,
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./loginPage.module.css";

import { useAuthenticateUserMutation } from "../../services/api/apiSlice";
import { setAuthInfo } from "../../services/authSlice";
import { setTokens } from "../../utils/sessionStorage";
import { AuthRegResponse } from "../../utils/types";
import { ROUTES } from "../../utils/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading, isError }] = useAuthenticateUserMutation();
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const params = { email, password };
      const result = (await login(params)) as { data: AuthRegResponse };
      if (result.data.success) {
        dispatch(setAuthInfo(result.data));
        setTokens(result.data);
        navigate(ROUTES.CONSTRUCTOR);
      }
    },
    [password, email]
  );

  return (
    <main className={styles.main}>
      <form name="loginForm" className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Вход</h2>
        <EmailInput
          value={email}
          extraClass={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordInput
          extraClass={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button htmlType="submit" type="primary" extraClass={styles.submit}>
          {isLoading
            ? "Войти"
            : isError
            ? "Что-то пошло не так, попробуйте еще раз"
            : "Проверяем логин..."}
        </Button>
      </form>
      <div className={styles.captionContainer}>
        <p className={styles.caption}>
          Вы — новый пользователь?{" "}
          <Link className={styles.captionLink} to="/register">
            Зарегистрироваться
          </Link>
        </p>
        <p className={styles.caption}>
          Забыли пароль?{" "}
          <Link className={styles.captionLink} to="/forgot-password">
            Восстановить пароль
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
