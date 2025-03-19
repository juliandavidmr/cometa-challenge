'use client'

import { Button } from "@heroui/button"
import { cn } from "@heroui/theme"

import type { Order } from "../types/orders"
import { useCrudOrders } from "../hooks/use-crud-orders"
import { AddRoundOrder } from "./add-rounds-order"
import type { StockModel } from "../types/stocks"

type TOrdersTableProps = {
    orders: Order[]
    stocks: StockModel[]
    className?: string
    onRefreshOrders: () => void
}

export const OrdersGrid: React.FC<TOrdersTableProps> = ({ orders, stocks, className, onRefreshOrders }) => {
    const { removeOrderFn } = useCrudOrders()

    const handleRemoveOrder = (order: Order) => {
        const yes = confirm('Are you sure that you want remove this order?')

        if (yes) {
            removeOrderFn({
                order_id: order.id
            })
        }
    }

    const renderContent = () => {
        if (!orders.length) {
            return (
                <>
                    No orders
                </>
            )
        }

        return orders.map((order, index) => {
            return (
                <article key={order.id} className={cn(
                    // Padding
                    "p-3",
                    // Border
                    "border-2 border-solid border-gray-200 dark:border-gray-600",
                    // Rounded
                    "rounded-large overflow-hidden",
                    // Hover
                    "hover:border-secondary-200",
                    "bg-white dark:bg-slate-800"
                )}>
                    <div className="flex items-center justify-between gap-x-4 mb-3">
                        <Button variant="flat" color="success" type="button">
                            Mark as paid
                        </Button>
                        <AddRoundOrder stocks={stocks} orderId={order.id} onAddedSuccess={onRefreshOrders} />
                        <Button variant="light" color="danger" type="button" onPress={() => handleRemoveOrder(order)}>
                            Remove
                        </Button>
                    </div>
                    <h2 className="text-xl text-primary-600">
                        Order #{index + 1}
                    </h2>
                    <p className="mb-3">
                        <span className="text-xs text-gray-500">
                            Created: {order.created}
                        </span>
                        <br />
                        <span className="text-md text-gray-500">
                            Paid: {order.paid ? <span className="text-success-800">Yes</span> : <span className="text-danger-500">No</span>}
                        </span>
                        <br />
                        <span className="text-md text-success-600">
                            Total: ${order.subtotal}
                        </span>
                    </p>
                    <ul>
                        {order.items.map((item, index) => {
                            return (
                                <li
                                    key={item.stock_id}
                                    className={cn(
                                        'rounded-md p-0.5 hover:bg-secondary-200',
                                        index % 2 === 0 && "bg-slate-50"
                                    )}
                                >
                                    <span className="text-sm text-gray-400">{index + 1})</span> {item.quantity} de {item.name}
                                </li>
                            )
                        })}
                    </ul>
                </article>
            )
        })
    }

    return (
        <section className={cn("grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4", className)}>
            <h1 className="col-span-full text-2xl font-semibold">
                Orders ({orders.length})
            </h1>
            {renderContent()}
        </section>
    )
}