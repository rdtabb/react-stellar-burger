export type OrderStatus = 'done' | 'pending' | 'created'

export interface Order {
    createdAt: string
    ingredients: string[]
    number: number
    status: OrderStatus
    name: string
    updatedAt: string
    _id: string
}

export interface SocketResponse {
    total?: number
    totalToday?: number
    orders?: Order[]
}
