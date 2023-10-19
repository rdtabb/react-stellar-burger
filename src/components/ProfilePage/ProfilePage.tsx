import { memo } from "react";
import styles from "./profilePage.module.css";
import Aside from "./components/Aside";
import Form from "./components/Form";

const ProfilePage = () => {
  return (
    <main className={styles.main}>
      <Aside />
      <Form />
    </main>
  );
};

export default memo(ProfilePage);
