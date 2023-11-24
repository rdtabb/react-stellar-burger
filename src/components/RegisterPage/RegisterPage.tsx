import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../LoginPage/loginPage.module.css";

import { useRegisterUserMutation } from "../../services/api/apiSlice";
import { AuthRegResponse } from "../../utils/types";
import { ROUTES } from "../../utils/api";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterUserMutation();
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

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
    [name, email, password]
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
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          extraClass={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button htmlType="submit" type="primary" extraClass={styles.submit}>
          {!isLoading ? "Зарегистрироваться" : "Регистрируем..."}
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
