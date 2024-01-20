import { useEffect, memo } from 'react'

import { Routes, Route } from 'react-router-dom'

import { Form, Aside, profilePageStyles, OrderList } from '@components/index'
import { useAppDispatch, useAppSelector } from '@hooks/use-typed-redux'
import { profileOrdersSelector, profileWsConnectionInit, HTTPStatus } from '@services/index'
import { ROUTES } from '@utils/api'

export const Profile = memo(() => {
    const { orders, status } = useAppSelector(profileOrdersSelector)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (status === HTTPStatus.STALE) {
            dispatch(profileWsConnectionInit())
        }
    }, [dispatch])

    return (
        <main className={profilePageStyles.main}>
            <Aside />
            <Routes>
                <Route path={'/details'} element={<Form />} />
                <Route
                    path={ROUTES.PROFILE_ORDERS}
                    element={
                        <OrderList
                            orders={orders}
                            isLoading={status === HTTPStatus.PENDING}
                            shouldDisplayStatus
                        />
                    }
                />
            </Routes>
        </main>
    )
})
