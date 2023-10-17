import { useState, memo, useCallback } from "react";
import {
  Button,
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./loginPage.module.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      password,
      email,
    });
  }, []);

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
          Войти
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

export default memo(LoginPage);
