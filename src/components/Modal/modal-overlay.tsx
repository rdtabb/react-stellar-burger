import { memo, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { popupClassSelector, setPopupClass } from '@services/modalSlice'
import { Children } from '@utils/types'

import styles from './modal.module.css'

type ModalOverlayProps = Children & {
    closePopupOnOverlay: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const ModalOverlay = memo(({ children, closePopupOnOverlay }: ModalOverlayProps) => {
    const popupClass = useSelector(popupClassSelector)
    const dispatch = useDispatch()

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
