import { memo, useEffect, PropsWithChildren } from 'react'

import { useAppDispatch, useAppSelector } from '@hooks/use-typed-redux'
import { popupClassSelector, setPopupClass } from '@services/modal-slice/modalSlice'

import styles from './modal.module.css'

interface ModalOverlayProps extends PropsWithChildren {
    closePopupOnOverlay: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const ModalOverlay = memo(({ children, closePopupOnOverlay }: ModalOverlayProps) => {
    const popupClass = useAppSelector(popupClassSelector)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(setPopupClass(styles.modalActive))
        }, 200)

        return () => {
            dispatch(setPopupClass(styles.modal))
            clearTimeout(timeout)
        }
    }, [])

    return (
        <div onClick={closePopupOnOverlay} className={popupClass}>
            {children}
        </div>
    )
})
