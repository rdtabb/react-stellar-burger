import { useGetOrdersQuery } from '@services/index'
import { CACHE_KEYS } from '@utils/api'
import { socketSelector } from '@services/api/feedSlice'
import { useSelector } from 'react-redux'

export const Feed = () => {
    const query = useGetOrdersQuery(CACHE_KEYS.ORDERS)
    const data = useSelector(socketSelector)
    console.log(query)
    console.log(data)

    return <div>Feed</div>
}
