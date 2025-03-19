'use client'

import { Button } from "@heroui/button"
import { cn } from "@heroui/theme"

import type { Order } from "../types/orders"

type TOrdersTableProps = {
    orders: Order[]
    className?: string
}

export const OrdersGrid: React.FC<TOrdersTableProps> = ({ orders, className }) => {
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
                    "p-3.5",
                    // Border
                    "border border-solid border-gray-200 dark:border-gray-600",
                    // Rounded
                    "rounded-large overflow-hidden",
                    // Hover
                    "hover:bg-slate-400 hover:dark:bg-slate-900"
                )}>
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
                    <ul className="mb-3">
                        {order.items.map((item, index) => {
                            return (
                                <li key={item.stock_id}>
                                    <span className="text-sm text-gray-400">{index + 1})</span> {item.quantity} de {item.name}
                                </li>
                            )
                        })}
                    </ul>
                    <div className="flex items-center justify-between">
                        <Button variant="flat" color="success" type="button">
                            Mark as paid
                        </Button>
                        <Button variant="flat" color="danger" type="button">
                            Remove
                        </Button>
                    </div>
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