export type Day = 'день' | 'дня' | 'дней'

export interface DateDeserialized {
    day: number
    month: number
    time: string
}

export const deserializeDate = (date: Date): DateDeserialized => {
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()

    return {
        day: date.getDate(),
        month: date.getMonth(),
        time: `${hour}:${minutes}`
    }
}

export const getEndingForDays = (days: number): Day => {
    if (days === 1) {
        return 'день'
    } else if (days >= 2 && days <= 4) {
        return 'дня'
    } else {
        return 'дней'
    }
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
