import styles from "../profilePage.module.css";
import {
  EmailInput,
  Input,
  PasswordInput,
  EditIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { userSelector } from "../../../services/authSlice";
import { useSelector } from "react-redux";
import { memo, useCallback } from "react";

const Form = () => {
  const user = useSelector(userSelector);

  const handleChange = useCallback((e: any) => console.log(e), []);

  return (
    <form name="editProfileForm" className={styles.inputs}>
      {user?.name && (
        <Input placeholder="Имя" value={user?.name} onChange={handleChange} />
      )}
      {user?.email && (
        <EmailInput value={user?.email} onChange={handleChange} />
      )}
      <PasswordInput value="********" onChange={handleChange} />
    </form>
  );
};

export default memo(Form);
