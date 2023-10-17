import { useState, useCallback } from "react";
import styles from "../LoginPage/loginPage.module.css";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../services/asyncThunks";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(
        registerUser({
          name,
          email,
          password,
        }),
      );
    },
    [name, email, password],
  );

  return (
    <main className={styles.main}>
      <form name="loginForm" className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Регистрация</h2>
        <Input
          placeholder="Имя"
          value={name}
          extraClass={styles.input}
          onChange={(e) => setName(e.target.value)}
        />
        <EmailInput
          value={email}
          extraClass={styles.input}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
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
          Уже зарегистрированы?{" "}
          <Link className={styles.captionLink} to="/login">
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
};

export default RegisterPage;
