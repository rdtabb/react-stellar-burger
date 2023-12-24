import { memo } from 'react'

import { Routes, Route } from 'react-router-dom'

import { Form, Aside, profilePageStyles } from '@components/index'
import { ROUTES } from '@utils/api'

export const Profile = memo(() => (
    <main className={profilePageStyles.main}>
        <Aside />
        <Routes>
            <Route path='/' element={<Form />} />
            <Route path={'/profile/orders'} element={<div>them orders</div>} />
        </Routes>
    </main>
))
