import { useState, useCallback, useEffect } from 'react'

import {
    EmailInput,
    Input,
    PasswordInput,
    EditIcon,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useForm } from 'react-hook-form'

import { useUserInfoQuery, useChangeUserInfoMutation } from '@services/index'
import { CACHE_KEYS, AuthRegResponse } from '@utils/index'

import { Field } from './form-field'

import styles from '../profilePageComponents.module.css'

export interface FormValues {
    name: string
    email: string
    password: string
}

export const Form = (): JSX.Element => {
    const { data: user, isLoading: isUserInfoLoading } = useUserInfoQuery(CACHE_KEYS.USER_INFO)
    const [updateUser, { isLoading: isUpdateUserLoading }] = useChangeUserInfoMutation()

    const [isNameLocked, setIsNameLocked] = useState<boolean>(true)
    const [isEmailLocked, setIsEmailLocked] = useState<boolean>(true)

    const {
        control,
        reset,
        handleSubmit,
        setValue,
        formState: { isDirty },
        watch
    } = useForm<FormValues>({
        mode: 'onChange',
        defaultValues: {
            name: user?.user.name ?? '',
            email: user?.user.email ?? '',
            password: ''
        }
    })

    const name = watch('name')
    const email = watch('email')
    const password = watch('password')

    const setFormValues = useCallback(
        (name: string, email: string): void => {
            setValue('email', email)
            setValue('name', name)
        },
        [setValue]
    )

    useEffect(() => {
        if (!isDirty && user?.user.name && user.user.email) {
            setFormValues(user.user.name, user.user.email)
        }
    }, [user?.user.email, user?.user.name])

    const onUpdate = useCallback(
        async (values: FormValues): Promise<void> => {
            const { data } = (await updateUser({
                ...values
            })) as {
                data: AuthRegResponse
            }

            if (data.success) {
                setFormValues(data.user.name, data.user.email)
                setIsEmailLocked(true)
                setIsNameLocked(true)
            }
        },
        [updateUser]
    )

    const onCancel = useCallback((): void => {
        reset()
        setIsEmailLocked(true)
        setIsNameLocked(true)
    }, [reset])

    const shouldDisplayButtons = (): boolean => {
        const serverName = user?.user.name
        const serverEmail = user?.user.email

        if (name === serverName && email === serverEmail) {
            return false
        }

        if (password !== '') {
            return false
        }

        return true
    }

    return (
        <form name="editProfileForm" onSubmit={handleSubmit(onUpdate)} className={styles.inputs}>
            <div className={styles.inputContainer}>
                <Field
                    name="name"
                    control={control}
                    as={Input}
                    disabled={isNameLocked}
                    placeholder={isUpdateUserLoading || isUserInfoLoading ? 'Загружаем...' : 'Имя'}
                />
                <button
                    className={styles.editButton}
                    onClick={() => setIsNameLocked((prev) => !prev)}
                    type="button"
                >
                    <EditIcon type="primary" />
                </button>
            </div>

            <div className={styles.inputContainer}>
                <Field
                    name="email"
                    control={control}
                    as={EmailInput}
                    disabled={isEmailLocked}
                    placeholder={
                        isUpdateUserLoading || isUserInfoLoading ? 'Загружаем...' : 'Адрес почты'
                    }
                />
                <button
                    className={styles.editButton}
                    onClick={() => setIsEmailLocked((prev) => !prev)}
                    type="button"
                >
                    <EditIcon type="primary" />
                </button>
            </div>

            <Field name="password" control={control} as={PasswordInput} />

            <div
                className={
                    shouldDisplayButtons() ? styles.buttonsGroup : styles['buttonsGroup_disabled']
                }
            >
                <Button type="secondary" htmlType="button" onClick={onCancel}>
                    Отмена
                </Button>
                <Button
                    type="primary"
                    htmlType="submit"
                    disabled={isUserInfoLoading || isUpdateUserLoading}
                >
                    {isUpdateUserLoading ? 'Сохраняем...' : 'Сохранить'}
                </Button>
            </div>
        </form>
    )
}
