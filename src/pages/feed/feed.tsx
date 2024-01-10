import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { FeedContainer, FeedStats, OrderList } from '@components/index'
import { feedOrdersSelector, feedWsConnectionInit, HTTPStatus } from '@services/index'

export const Feed = () => {
    const dispatch = useDispatch()
    const { orders, status } = useSelector(feedOrdersSelector)

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
