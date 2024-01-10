import { useEffect, memo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import { Form, Aside, profilePageStyles, OrderList } from '@components/index'
import { profileOrdersSelector, profileWsConnectionInit, HTTPStatus } from '@services/index'
import { ROUTES } from '@utils/api'

export const Profile = memo(() => {
    const { orders, status } = useSelector(profileOrdersSelector)
    const dispatch = useDispatch()

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
                            orders={orders?.toReversed()}
                            isLoading={status === HTTPStatus.PENDING}
                            shouldDisplayStatus
                        />
                    }
                />
            </Routes>
        </main>
    )
})
