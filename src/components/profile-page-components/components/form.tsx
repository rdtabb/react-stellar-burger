import { useState, memo, useCallback, useEffect, useMemo } from "react";
import {
  EmailInput,
  Input,
  PasswordInput,
  EditIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "../profilePageComponents.module.css";
import { useUserInfoQuery, useChangeUserInfoMutation } from "../../../services";
import { AuthRegResponse } from "../../../utils";

export const Form = memo(() => {
  const {
    data: user,
    isLoading: isUserInfoLoading,
  } = useUserInfoQuery("userinfo");
  const [
    updateUser,
    { isLoading: isUpdateUserLoading },
  ] = useChangeUserInfoMutation();

  const [name, setName] = useState<string>(user?.user.name ?? "");
  const [email, setEmail] = useState<string>(user?.user.email ?? "");
  const [password, setPassword] = useState<string>("");
  const [isNameLocked, setIsNameLocked] = useState<boolean>(true);
  const [isEmailLocked, setIsEmailLocked] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      setName(user.user.name);
      setEmail(user.user.email);
    }
  }, [user?.user]);

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      setName(event.target.value);
    },
    []
  );

  const handleEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      setEmail(event.target.value);
    },
    []
  );

  const handlePasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      setPassword(event.target.value);
    },
    []
  );

  const onUpdate = useCallback(async () => {
    const result = (await updateUser({
      email,
      name,
      password,
    })) as {
      data: AuthRegResponse;
    };

    if (result.data.success) {
      setEmail(result.data.user.email);
      setName(result.data.user.name);
      setIsEmailLocked(true);
      setIsNameLocked(true);
    }
  }, [name, email, password]);

  const onCancel = useCallback(() => {
    setName(user?.user.name ?? "");
    setEmail(user?.user.email ?? "");
    setIsEmailLocked(true);
    setIsNameLocked(true);
  }, [user?.user]);

  const shouldShowButtons: boolean = useMemo(() => {
    const fetchedName = user?.user.name;
    const fetchedEmail = user?.user.email;

    if (!fetchedName || !fetchedEmail) {
      return false;
    }

    if (name !== fetchedName || email !== fetchedEmail) {
      return true;
    }

    return false;
  }, [name, email, user?.user]);

  return (
    <form
      name="editProfileForm"
      onSubmit={(event) => event.preventDefault()}
      className={styles.inputs}
    >
      <div className={styles.inputContainer}>
        <Input
          placeholder="Имя"
          value={isUserInfoLoading ? "Загружаем..." : name}
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

      <div className={styles.inputContainer}>
        <EmailInput
          disabled={isEmailLocked}
          value={isUserInfoLoading ? "Загружаем..." : email}
          onChange={handleEmailChange}
        />
        <button
          className={styles.editButton}
          onClick={() => setIsEmailLocked((prev) => !prev)}
        >
          <EditIcon type="primary" />
        </button>
      </div>

      <PasswordInput value={password} onChange={handlePasswordChange} />

      {shouldShowButtons && (
        <div className={styles.buttonsGroup}>
          <Button type="secondary" htmlType="button" onClick={onCancel}>
            Отмена
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            onClick={onUpdate}
            disabled={isUserInfoLoading || isUpdateUserLoading}
          >
            {isUpdateUserLoading ? "Сохраняем..." : "Сохранить"}
          </Button>
        </div>
      )}
    </form>
  );
});
