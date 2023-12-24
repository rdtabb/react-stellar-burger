import { SocketResponse } from '@services/index'

const getMonthDay = (date: Date) => {
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()

    return {
        day: date.getDate(),
        month: date.getMonth(),
        time: `${hour}:${minutes}`
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
        ?.filter((order) => order.status !== 'done')
        .map((order) => order.number)
        .slice(0, 5)
}

export const calculateDateDiff = (dateISO?: string): string | undefined => {
    if (!dateISO) {
        return undefined
    }

    const currentDate = new Date(Date.now())
    const orderDate = new Date(Date.parse(dateISO))

    const { day: currentDay, month: currentMonth } = getMonthDay(currentDate)
    const { day: orderDay, month: orderMonth, time: orderTime } = getMonthDay(orderDate)

    const differenceInMonths = currentMonth - orderMonth

    if (differenceInMonths === 0) {
        const differenceInDays = currentDay - orderDay

        if (differenceInDays === 0) {
            return `Сегодня, ${orderTime}`
        }

        if (differenceInDays === 1) {
            return `Вчера, ${orderTime}`
        }

        return `${differenceInDays} дней назад, ${orderTime}`
    }

    return `${differenceInMonths} месяц назад, ${orderTime}`
}
