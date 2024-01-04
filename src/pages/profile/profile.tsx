import { memo } from 'react'

import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import { Form, Aside, profilePageStyles, OrderList } from '@components/index'
import { profileOrdersSelector, useProfileOrdersQuery } from '@services/index'
import { ROUTES, CACHE_KEYS } from '@utils/api'

export const Profile = memo(() => {
    useProfileOrdersQuery(CACHE_KEYS.PROFILE_ORDERS)
    const orders = useSelector(profileOrdersSelector)

    return (
        <main className={profilePageStyles.main}>
            <Aside />
            <Routes>
                <Route path={'/details'} element={<Form />} />
                <Route
                    path={ROUTES.PROFILE_ORDERS}
                    element={<OrderList orders={orders?.toReversed()} shouldDisplayStatus />}
                />
            </Routes>
        </main>
    )
})
