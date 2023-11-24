import styles from "../profilePage.module.css";
import {
  EmailInput,
  Input,
  PasswordInput,
  EditIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { memo, useCallback, useState } from "react";
import { useUserInfoQuery } from "../../../services/api/apiSlice";

const Form = () => {
  const { data: user } = useUserInfoQuery("userinfo")

  const [isNameLocked, setIsNameLocked] = useState<boolean>(true);
  const [isEmailLocked, setIsEmailLocked] = useState<boolean>(true);
  const [name, setName] = useState<string | undefined>(user?.user.name);
  const [email, setEmail] = useState<string | undefined>(user?.user.email);

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    [],
  );

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    [],
  );

  const toggleNameLock = () => {
    setIsNameLocked((prev) => !prev);
  };

  const toggleEmailLock = () => {
    setIsEmailLocked((prev) => !prev);
  };

  return (
    <form
      name="editProfileForm"
      onSubmit={(e) => e.preventDefault()}
      className={styles.inputs}
    >
      {name && (
        <div style={{ position: "relative", width: "fit-content" }}>
          <Input
            placeholder="Имя"
            value={name}
            onChange={handleNameChange}
            disabled={isNameLocked}
          />
          <button className={styles.editButton} onClick={toggleNameLock}>
            <EditIcon type="primary" />
          </button>
        </div>
      )}
      {email && (
        <div style={{ position: "relative", width: "fit-content" }}>
          <EmailInput
            disabled={isEmailLocked}
            value={email}
            onChange={handleEmailChange}
          />
          <button className={styles.editButton} onClick={toggleEmailLock}>
            <EditIcon type="primary" />
          </button>
        </div>
      )}
      <PasswordInput
        value="********"
        onChange={() => console.log("change")}
        disabled
      />
    </form>
  );
};

export default memo(Form);
