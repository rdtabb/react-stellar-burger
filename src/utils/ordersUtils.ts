import { SocketResponse, OrderStatus } from '@services/index'

export const filterOrders = (response: SocketResponse, done: boolean): number[] | undefined => {
    const orders = response.orders

    if (done) {
        return orders
            ?.filter((order) => order.status === 'done')
            .map((order) => order.number)
            .slice(0, 5)
    }

    return orders
        ?.filter((order) => order.status === 'pending')
        .map((order) => order.number)
        .slice(0, 5)
}

export const getOrderStatus = (status?: OrderStatus) => {
    if (status === 'done') {
        return 'Выполнен'
    }

    if (status === 'pending') {
        return 'Обрабатывается'
    }

    if (status === 'created') {
        return 'Создан'
    }

    return 'Ошибка при обработке статуса заказа...'
}
