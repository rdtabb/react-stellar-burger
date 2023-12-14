import { memo, useCallback } from 'react'

import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux'

import {
    setPopupState,
    useCreateOrderMutation,
    priceSelector,
    idsSelector,
    clearConstructorIngredients,
    bunSelector
} from '@services/index'
import { CACHE_KEYS } from '@utils/api'

import styles from '../burgerConstructor.module.css'

export const PriceOrder = memo(() => {
    const dispatch = useDispatch()

    const bun = useSelector(bunSelector)
    const price = useSelector(priceSelector)
    const ids = useSelector(idsSelector)

    const [createOrder, _] = useCreateOrderMutation({
        fixedCacheKey: CACHE_KEYS.ORDER_INFO
    })

    const postOrder = useCallback(async () => {
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
                <p className={styles.totalPrice}>{price ? price : 0}</p>
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
