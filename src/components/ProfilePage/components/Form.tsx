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
      <InputWrapper />
      {user?.email && (
        <EmailInput value={user?.email} onChange={handleChange} />
      )}
      <PasswordInput value="********" onChange={handleChange} />
    </form>
  );
};

const InputWrapper = memo(() => {
  const user = useSelector(userSelector);

  const handleChange = useCallback((e: any) => console.log(e), []);
  //@ts-ignore
  return <Input placeholder="Имя" value={user?.name} onChange={handleChange} />;
});

export default memo(Form);
