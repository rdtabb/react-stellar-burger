import { useState, useCallback, useEffect } from "react";
import styles from "../LoginPage/loginPage.module.css";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import {
  registerStatusSelector,
  setRegisterStatus,
} from "../../services/authSlice";
import { registerUser } from "../../services/asyncThunks";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(
    () => () => {
      dispatch(setRegisterStatus("idle"));
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const params = {
        name,
        email,
        password,
      };
      dispatch(registerUser(params))
        .unwrap()
        .then((res) => (res.success ? navigate(ROUTES.LOGIN) : null));
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
        <RegisterButton />
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

const RegisterButton = () => {
  const status = useSelector(registerStatusSelector);

  return (
    <Button htmlType="submit" type="primary" extraClass={styles.submit}>
      {status === "idle" || status === "success"
        ? "Зарегистрироваться"
        : "Регистрируем..."}
    </Button>
  );
};

export default RegisterPage;
