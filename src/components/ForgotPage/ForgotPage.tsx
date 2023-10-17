import { useState } from "react";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "../LoginPage/loginPage.module.css";

const ResetPage = () => {
  const [email, setEmail] = useState<string>("");

  return (
    <main className={styles.main}>
      <form name="loginForm" className={styles.form}>
        <h2 className={styles.title}>Восстановление пароля</h2>
        <EmailInput
          placeholder="Укажите e-mail"
          value={email}
          extraClass={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button htmlType="submit" type="primary" extraClass={styles.submit}>
          Войти
        </Button>
      </form>
      <div className={styles.captionContainer}>
        <p className={styles.caption}>
          Вспомнили?{" "}
          <Link className={styles.captionLink} to="/login">
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
};

export default ResetPage;
