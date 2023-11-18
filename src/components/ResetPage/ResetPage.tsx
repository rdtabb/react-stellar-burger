import React, { useState } from "react";
import styles from "../LoginPage/loginPage.module.css";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const ResetPage = () => {
  const [pass, setPass] = useState<string>("");
  const [code, setCode] = useState<string>("");

  return (
    <main className={styles.main}>
      <form name="forgotForm" className={styles.form}>
        <h2 className={styles.title}>Восстановление пароля</h2>
        <PasswordInput
          value={pass}
          placeholder="Введите новый пароль"
          extraClass={styles.input}
          onChange={(e) => setPass(e.target.value)}
        />
        <Input
          extraClass={styles.input}
          value={code}
          placeholder="Введите код из письма"
          onChange={(e) => setCode(e.target.value)}
        />
        <Button htmlType="submit" type="primary" extraClass={styles.submit}>
          Сохранить
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

export default ResetPage;
