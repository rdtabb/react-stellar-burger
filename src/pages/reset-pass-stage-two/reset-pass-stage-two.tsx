import React, { useState, useCallback, useMemo, useEffect } from 'react'

import { PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useNavigate, useLocation } from 'react-router-dom'

import { Form, ICaption, IFormInputConfig } from '@components/form'
import { useResetPasswordTokenStageMutation } from '@services/index'
import { ROUTES, ResetPasswordEmailStageResponse } from '@utils/index'

const resetPassStageTwoCaptionsConfig: ICaption[] = [
    {
        linkRoute: ROUTES.LOGIN,
        linkText: 'Войти',
        captionText: 'Вспомнили пароль?'
    }
]

export const ResetPassStageTwo = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const [password, setPassword] = useState<string>('')
    const [token, setToken] = useState<string>('')

    const [mutate, { isLoading, isError }] = useResetPasswordTokenStageMutation()

    useEffect(() => {
        const previousUrl = location.state?.previousUrl

        if (previousUrl !== ROUTES.FORGOT_PASSWORD) {
            navigate(ROUTES.LOGIN)
        }
    }, [])

    const handleSubmit = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            const result = (await mutate({
                password,
                token
            })) as {
                data: ResetPasswordEmailStageResponse
            }
            if (result.data.success) {
                navigate(ROUTES.LOGIN)
            }
        },
        [password, token]
    )

    const resetPassStageTwoInputsConfig: IFormInputConfig[] = useMemo(
        () => [
            {
                value: password,
                valueSetter: setPassword,
                as: PasswordInput,
                placeholder: 'Введите новый пароль'
            },
            {
                value: token,
                valueSetter: setToken,
                as: Input,
                placeholder: 'Введите код из письма'
            }
        ],
        [password, token]
    )

    return (
        <Form
            formName="forgotForm"
            formTitle="Восстановление пароля"
            handleSubmit={handleSubmit}
            submitButtonText={
                isLoading
                    ? 'Сохраняем'
                    : isError
                      ? 'Что-то пошло не так, попробуйте еще раз'
                      : 'Cохранить'
            }
            captionsConfig={resetPassStageTwoCaptionsConfig}
            inputsConfig={resetPassStageTwoInputsConfig}
        />
    )
}
