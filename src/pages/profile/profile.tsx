import { memo } from 'react'

import { Form, Aside, profilePageStyles } from '@components/index'

export const Profile = memo(() => (
    <main className={profilePageStyles.main}>
        <Aside />
        <Form />
    </main>
))
