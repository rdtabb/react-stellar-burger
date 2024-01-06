import { memo } from 'react'

import { useCreateOrderMutation } from '@services/index'
import { CACHE_KEYS } from '@utils/index'

import css from './modal.module.css'

export const OrderDetails = memo(() => {
    const [, { isLoading, isError, data }] = useCreateOrderMutation({
        fixedCacheKey: CACHE_KEYS.ORDER_INFO
    })

    return (
        <article className={css.modalGrid}>
            {data && (
                <>
                    <h2 className={css.title}>{data?.order.number}</h2>
                    <p className={css.subtitle}>идентификатор заказа</p>
                    <div className={css.accepted}></div>
                    <p className={css.caption}>Ваш заказ начали готовить</p>
                    <p className={css.subcaption}>{data?.name}</p>
                </>
            )}
            {isLoading && <p className={css.subtitle}>Обрабатываем ваш заказ, милорд...</p>}
            {isError && (
                <p className={css.subtitle}>
                    Милорд, наша суборбитальная станция подверглась нападению коварных ситхов. Силы
                    джедаев уже в пути, повторите ваш заказ позже. Да прибудет с вами сила
                </p>
            )}
        </article>
    )
})
