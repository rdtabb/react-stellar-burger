import { useState, memo } from "react";
import {
  EmailInput,
  Input,
  PasswordInput,
  EditIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "../profilePageComponents.module.css";
import { useProfileFormState } from "../hooks/use-profile-form-state";

export const Form = memo(() => {
  const { email, name, handleEmailChange, handleNameChange, isLoading } =
    useProfileFormState();

  const [isNameLocked, setIsNameLocked] = useState<boolean>(true);
  const [isEmailLocked, setIsEmailLocked] = useState<boolean>(true);

  return (
    <form
      name="editProfileForm"
      onSubmit={(event) => event.preventDefault()}
      className={styles.inputs}
    >
      <div style={{ position: "relative", width: "fit-content" }}>
        <Input
          placeholder="Имя"
          value={isLoading ? "Загружаем..." : name}
          onChange={handleNameChange}
          disabled={isNameLocked}
        />
        <button
          className={styles.editButton}
          onClick={() => setIsNameLocked((prev) => !prev)}
        >
          <EditIcon type="primary" />
        </button>
      </div>

      <div style={{ position: "relative", width: "fit-content" }}>
        <EmailInput
          disabled={isEmailLocked}
          value={isLoading ? "Загружаем..." : email}
          onChange={handleEmailChange}
        />
        <button
          className={styles.editButton}
          onClick={() => setIsEmailLocked((prev) => !prev)}
        >
          <EditIcon type="primary" />
        </button>
      </div>

      <PasswordInput value="********" onChange={() => {}} disabled />
    </form>
  );
});
