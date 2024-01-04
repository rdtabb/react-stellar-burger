import React, { useCallback } from 'react'

import { useLocation, useNavigate, Routes, Route } from 'react-router-dom'

import { OrderItemInfo } from '@components/order-list/order-item-info'
import {
    Profile,
    Constructor,
    IngredientDetailsPage,
    ResetPassStageOne,
    ResetPassStageTwo,
    RegisterForm,
    LoginForm,
    Feed
} from '@pages/index'
import styles from '@pages/ingredient-details/ingredient-details.module.css'
import { useUserInfoQuery } from '@services/index'
import { ROUTES, CACHE_KEYS } from '@utils/index'

import { AppHeader } from '../app-header/app-header'
import { Modal } from '../modal/modal'
import { NotFound } from '../not-found/not-found'
import { OnlyAuth, OnlyUnAuth } from '../protected/protected'

export const App = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const previousLocation = location.state?.previousLocation

    const navigateToConstructor = useCallback(() => {
        setTimeout(() => navigate(ROUTES.CONSTRUCTOR), 200)
    }, [])

    useUserInfoQuery(CACHE_KEYS.USER_INFO)

    return (
        <>
            <AppHeader />
            <Routes location={previousLocation || location}>
                <Route path={ROUTES.CONSTRUCTOR} element={<Constructor />} />
                <Route path={ROUTES.LOGIN} element={<OnlyUnAuth component={<LoginForm />} />} />
                <Route
                    path={ROUTES.REGISTER}
                    element={<OnlyUnAuth component={<RegisterForm />} />}
                />
                <Route
                    path={ROUTES.FORGOT_PASSWORD}
                    element={<OnlyUnAuth component={<ResetPassStageOne />} />}
                />
                <Route
                    path={ROUTES.RESET_PASSWORD}
                    element={<OnlyUnAuth component={<ResetPassStageTwo />} />}
                />
                <Route
                    path={`${ROUTES.INGREDIENT_DETAILS}/:id`}
                    element={<IngredientDetailsPage enableRedirect={false} />}
                />
                <Route path={ROUTES.PROFILE} element={<OnlyAuth component={<Profile />} />} />
                <Route path={`${ROUTES.PROFILE_ORDERS}/:id`} element={<OrderItemInfo />} />
                <Route path={ROUTES.FEED} element={<Feed />} />
                <Route path={`${ROUTES.FEED}/:id`} element={<OrderItemInfo />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            {previousLocation && (
                <Routes>
                    <Route
                        path={`${ROUTES.INGREDIENT_DETAILS}/:id`}
                        element={
                            <Modal
                                modalContentClass={styles.modalContent}
                                close={navigateToConstructor}
                            >
                                <IngredientDetailsPage enableRedirect={true} />
                            </Modal>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            )}
        </>
    )
}
