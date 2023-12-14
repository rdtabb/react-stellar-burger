import { useState, useCallback, useMemo } from 'react'

import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useNavigate } from 'react-router-dom'

import { Form, ICaption, IFormInputConfig } from '@components/form'
import { useResetPasswordEmailStageMutation } from '@services/index'
import { ROUTES, ResetPasswordEmailStageResponse } from '@utils/index'

const resetPassStageOneCaptionsConfig: ICaption[] = [
    {
        linkRoute: ROUTES.LOGIN,
        linkText: 'Войти',
        captionText: 'Вспомнили пароль?'
    }
]

export const ResetPassStageOne = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState<string>('')

    const [resetPassword, { isLoading }] = useResetPasswordEmailStageMutation()

    const handleSubmit = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            const result = (await resetPassword({ email })) as {
                data: ResetPasswordEmailStageResponse
            }
            if (result.data.success) {
                navigate(ROUTES.RESET_PASSWORD, {
                    state: {
                        previousUrl: ROUTES.FORGOT_PASSWORD
                    }
                })
            }
        },
        [email]
    )

    const resetPassStageOneInputsConfig: IFormInputConfig[] = useMemo(
        () => [
            {
                value: email,
                valueSetter: setEmail,
                as: EmailInput
            }
        ],
        [email]
    )

    return (
        <Form
            formName="forgotForm"
            formTitle="Восстановление пароля"
            submitButtonText={isLoading ? 'Восстанавливаем...' : 'Восстановить'}
            handleSubmit={handleSubmit}
            captionsConfig={resetPassStageOneCaptionsConfig}
            inputsConfig={resetPassStageOneInputsConfig}
        />
    )
}
