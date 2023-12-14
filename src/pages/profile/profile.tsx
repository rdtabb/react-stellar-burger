import { memo } from 'react'

import { Aside } from '@components/profile-page-components/components/aside'
import { Form } from '@components/profile-page-components/components/form'
import styles from '@components/profile-page-components/profilePageComponents.module.css'

export const Profile = memo(() => (
    <main className={styles.main}>
        <Aside />
        <Form />
    </main>
))
