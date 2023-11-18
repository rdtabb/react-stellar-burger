import { useState } from "react";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import styles from "../LoginPage/loginPage.module.css";
import { resetWithEmail } from "../../services/asyncThunks";
import { ROUTES } from "../../utils/api";

const ResetPage = () => {
  const [email, setEmail] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const goToResetPage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await dispatch(resetWithEmail({ email }));
    //@ts-ignore
    if (response.payload.success) {
      navigate(ROUTES.RESET_PASSWORD);
    }
  };

  return (
    <main className={styles.main}>
      <form name="forgotForm" onSubmit={goToResetPage} className={styles.form}>
        <h2 className={styles.title}>Восстановление пароля</h2>
        <EmailInput
          placeholder="Укажите e-mail"
          value={email}
          extraClass={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button htmlType="submit" type="primary" extraClass={styles.submit}>
          Восстановить
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
