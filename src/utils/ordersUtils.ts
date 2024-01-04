import { SocketResponse, OrderStatus } from '@services/index'

type Day = 'день' | 'дня' | 'дней'

interface DateDeserialized {
    day: number
    month: number
    time: string
}

const deserializeDate = (date: Date): DateDeserialized => {
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()

    return {
        day: date.getDate(),
        month: date.getMonth(),
        time: `${hour}:${minutes}`
    }
}

const getEndingForDays = (days: number): Day => {
    if (days === 1) {
        return 'день'
    } else if (days >= 2 && days <= 4) {
        return 'дня'
    } else {
        return 'дней'
    }
}

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

export const calculateDateDiff = (dateISO?: string): string | undefined => {
    if (!dateISO) {
        return undefined
    }

    const currentDate = new Date(Date.now())
    const orderDate = new Date(Date.parse(dateISO))

    const { day: currentDay, month: currentMonth } = deserializeDate(currentDate)
    const { day: orderDay, month: orderMonth, time: orderTime } = deserializeDate(orderDate)

    const differenceInMonths = currentMonth - orderMonth

    if (differenceInMonths === 0) {
        const differenceInDays = currentDay - orderDay

        if (differenceInDays === 0) {
            return `Сегодня, ${orderTime}`
        }

        if (differenceInDays === 1) {
            return `Вчера, ${orderTime}`
        }

        return `${differenceInDays} ${getEndingForDays(differenceInDays)} назад, ${orderTime}`
    }

    return `${differenceInMonths} месяц назад, ${orderTime}`
}
