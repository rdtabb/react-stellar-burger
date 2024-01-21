import { useState, useCallback, useMemo } from 'react'

import { PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'

import { Form, ICaption, IFormInputConfig } from '@components/form'
import { useAppDispatch } from '@hooks/use-typed-redux'
import { useAuthenticateUserMutation, setAuthInfo } from '@services/index'
import { setTokens, ROUTES } from '@utils/index'

const loginFormCaptionsConfig: ICaption[] = [
    {
        linkRoute: ROUTES.REGISTER,
        linkText: 'Зарегистрироваться',
        captionText: 'Вы — новый пользователь?'
    },
    {
        linkRoute: ROUTES.FORGOT_PASSWORD,
        linkText: 'Восстановить пароль',
        captionText: 'Забыли пароль?'
    }
]

export const LoginForm = () => {
    const dispatch = useAppDispatch()

    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    const [login, { isLoading, isError }] = useAuthenticateUserMutation()

    const handleSubmit = useCallback(
        async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
            event.preventDefault()
            const params = { email, password }
            const result = await login(params)
            if ('data' in result && result.data.success) {
                dispatch(setAuthInfo(result.data))
                setTokens(result.data)
            }
        },
        [password, email]
    )

    const loginFormInputsConfig: IFormInputConfig[] = useMemo(
        () => [
            {
                value: email,
                valueSetter: setEmail,
                as: EmailInput
            },
            {
                value: password,
                valueSetter: setPassword,
                as: PasswordInput
            }
        ],
        [password, email]
    )

    return (
        <Form
            formName="loginForm"
            formTitle="Вход"
            submitButtonText={
                isLoading
                    ? 'Проверяем логин...'
                    : isError
                      ? 'Что-то пошло не так, попробуйте еще раз'
                      : 'Войти'
            }
            handleSubmit={handleSubmit}
            captionsConfig={loginFormCaptionsConfig}
            inputsConfig={loginFormInputsConfig}
        />
    )
}
