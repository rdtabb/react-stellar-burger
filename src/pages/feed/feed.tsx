import { useEffect } from 'react'

import { FeedContainer, FeedStats, OrderList } from '@components/index'
import { useAppDispatch, useAppSelector } from '@hooks/use-typed-redux'
import { feedOrdersSelector, feedWsConnectionInit, HTTPStatus } from '@services/index'

export const Feed = () => {
    const dispatch = useAppDispatch()
    const { orders, status } = useAppSelector(feedOrdersSelector)

    useEffect(() => {
        if (status === HTTPStatus.STALE) {
            dispatch(feedWsConnectionInit())
        }
    }, [dispatch])

    return (
        <FeedContainer>
            <OrderList orders={orders} isLoading={status === HTTPStatus.PENDING} />
            <FeedStats />
        </FeedContainer>
    )
}
