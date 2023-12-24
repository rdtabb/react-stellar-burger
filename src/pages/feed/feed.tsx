import { useSelector } from 'react-redux'

import { FeedContainer, FeedStats, OrderList } from '@components/index'
import { feedOrdersSelector } from '@services/api/feedSlice'

export const Feed = () => {
    const orders = useSelector(feedOrdersSelector)

    return (
        <FeedContainer>
            <OrderList orders={orders} />
            <FeedStats />
        </FeedContainer>
    )
}