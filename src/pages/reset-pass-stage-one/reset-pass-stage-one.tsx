import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

import styles from "../login-form/loginForm.module.css";
import { ROUTES } from "../../utils/api";
import { ResetPasswordEmailStageResponse } from "../../utils/types";
import { useResetPasswordEmailStageMutation } from "../../services/api/apiSlice";

export const ResetPassStageOne = () => {
  const navigate = useNavigate();

  const [resetPassword, { isLoading }] = useResetPasswordEmailStageMutation();
  const [email, setEmail] = useState<string>("");

  const goToResetPage = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const result = (await resetPassword({ email })) as {
        data: ResetPasswordEmailStageResponse;
      };
      if (result.data.success) {
        navigate(ROUTES.RESET_PASSWORD);
      }
    },
    [email]
  );

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
          {isLoading ? "Восстанавливаем..." : "Восстановить"}
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
