import { memo } from "react";

import styles from "../../components/profile-page-components/profilePageComponents.module.css";
import { Aside } from "../../components/profile-page-components/components/aside";
import { Form } from "../../components/profile-page-components/components/form";

export const Profile = memo(() => (
  <main className={styles.main}>
    <Aside />
    <Form />
  </main>
));
