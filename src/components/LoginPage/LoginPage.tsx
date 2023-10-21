import { useState, memo, useCallback, useEffect } from "react";
import {
  Button,
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./loginPage.module.css";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginStatusSelector, setLoginStatus } from "../../services/authSlice";
import { authenticateUser } from "../../services/asyncThunks";
import { ROUTES } from "../../utils/api";

const LoginPage = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(
    () => () => {
      dispatch(setLoginStatus("idle"));
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const params = { email, password };
      dispatch(authenticateUser(params))
        .unwrap()
        .then((res) => {
          if (res.success) navigate(ROUTES.CONSTRUCTOR);
        });
    },
    [password, email],
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
        <ButtonLogin />
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

const ButtonLogin = () => {
  const status = useSelector(loginStatusSelector);

  return (
    <Button htmlType="submit" type="primary" extraClass={styles.submit}>
      {status === "idle" || status === "success"
        ? "Войти"
        : status === "failed"
        ? "Что-то пошло не так, попробуйте еще раз"
        : "Пров�ряем логин..."}
    </Button>
  );
};

export default memo(LoginPage);
