import { memo, useCallback } from 'react'

import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
    setPopupState,
    useCreateOrderMutation,
    priceSelector,
    idsSelector,
    clearConstructorIngredients,
    bunSelector,
    authInfoSelector
} from '@services/index'
import { CACHE_KEYS, ROUTES } from '@utils/api'

import styles from '../burgerConstructor.module.css'

export const PriceOrder = memo(() => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isAuth } = useSelector(authInfoSelector)
    const bun = useSelector(bunSelector)
    const price = useSelector(priceSelector)
    const ids = useSelector(idsSelector)

    const [createOrder] = useCreateOrderMutation({
        fixedCacheKey: CACHE_KEYS.ORDER_INFO
    })

    const postOrder = useCallback(async (): Promise<void> => {
        if (!isAuth) {
            return navigate(ROUTES.LOGIN)
        }

        dispatch(setPopupState('order'))
        const result = await createOrder(ids)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        if (result.data.success) {
            dispatch(clearConstructorIngredients())
        }
    }, [ids])

    return (
        <div className={styles.order}>
            <div className={styles.priceContainer}>
                <p className={styles.totalPrice}>{price ?? 0}</p>
                <CurrencyIcon type="primary" />
            </div>
            <Button
                onClick={postOrder}
                title="Оформить заказ"
                type="primary"
                htmlType="submit"
                disabled={bun ? false : true}
            >
                Оформить заказ
            </Button>
        </div>
    )
})
