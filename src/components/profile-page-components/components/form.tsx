import { useState, memo, useCallback, useEffect, useMemo } from 'react'

import {
    EmailInput,
    Input,
    PasswordInput,
    EditIcon,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components'

import { useUserInfoQuery, useChangeUserInfoMutation } from '@services/index'
import { CACHE_KEYS, AuthRegResponse } from '@utils/index'

import styles from '../profilePageComponents.module.css'

export const Form = memo(() => {
    const { data: user, isLoading: isUserInfoLoading } = useUserInfoQuery(CACHE_KEYS.USER_INFO)
    const [updateUser, { isLoading: isUpdateUserLoading }] = useChangeUserInfoMutation()

    const [name, setName] = useState<string>(user?.user.name ?? '')
    const [email, setEmail] = useState<string>(user?.user.email ?? '')
    const [password, setPassword] = useState<string>('')
    const [isNameLocked, setIsNameLocked] = useState<boolean>(true)
    const [isEmailLocked, setIsEmailLocked] = useState<boolean>(true)

    useEffect(() => {
        if (user) {
            setName(user.user.name)
            setEmail(user.user.email)
        }
    }, [user?.user])

    const handleNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setName(event.target.value)
    }, [])

    const handleEmailChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setEmail(event.target.value)
    }, [])

    const handlePasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setPassword(event.target.value)
    }, [])

    const onUpdate = useCallback(async () => {
        const result = (await updateUser({
            email,
            name,
            password
        })) as {
            data: AuthRegResponse
        }

        if (result.data.success) {
            setEmail(result.data.user.email)
            setName(result.data.user.name)
            setPassword('')
            setIsEmailLocked(true)
            setIsNameLocked(true)
        }
    }, [name, email, password])

    const onCancel = useCallback(() => {
        setName(user?.user.name ?? '')
        setEmail(user?.user.email ?? '')
        setPassword('')
        setIsEmailLocked(true)
        setIsNameLocked(true)
    }, [user?.user])

    const shouldShowButtons: boolean = useMemo(() => {
        const fetchedName = user?.user.name
        const fetchedEmail = user?.user.email

        if (!fetchedName || !fetchedEmail) {
            return false
        }

        if (name !== fetchedName || email !== fetchedEmail || password !== '') {
            return true
        }

        return false
    }, [name, email, user?.user, password])

    return (
        <form
            name="editProfileForm"
            onSubmit={(event) => event.preventDefault()}
            className={styles.inputs}
        >
            <div className={styles.inputContainer}>
                <Input
                    placeholder="Имя"
                    value={isUserInfoLoading ? 'Загружаем...' : name}
                    onChange={handleNameChange}
                    disabled={isNameLocked}
                />
                <button
                    className={styles.editButton}
                    onClick={() => setIsNameLocked((prev) => !prev)}
                >
                    <EditIcon type="primary" />
                </button>
            </div>

            <div className={styles.inputContainer}>
                <EmailInput
                    disabled={isEmailLocked}
                    value={isUserInfoLoading ? 'Загружаем...' : email}
                    onChange={handleEmailChange}
                />
                <button
                    className={styles.editButton}
                    onClick={() => setIsEmailLocked((prev) => !prev)}
                >
                    <EditIcon type="primary" />
                </button>
            </div>

            <PasswordInput value={password} onChange={handlePasswordChange} />

            <div
                className={
                    shouldShowButtons ? styles.buttonsGroup : styles['buttonsGroup_disabled']
                }
            >
                <Button type="secondary" htmlType="button" onClick={onCancel}>
                    Отмена
                </Button>
                <Button
                    type="primary"
                    htmlType="submit"
                    onClick={onUpdate}
                    disabled={isUserInfoLoading || isUpdateUserLoading}
                >
                    {isUpdateUserLoading ? 'Сохраняем...' : 'Сохранить'}
                </Button>
            </div>
        </form>
    )
})
