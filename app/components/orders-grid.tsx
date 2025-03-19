'use client'

import { Button } from "@heroui/button"
import { cn } from "@heroui/theme"
import { Card, CardBody, CardHeader } from "@heroui/card"
import { Divider } from "@heroui/divider"

import type { Order } from "../types/orders"
import { useCrudOrders } from "../hooks/use-crud-orders"
import type { StockModel } from "../types/stocks"

import { AddRoundOrder } from "./add-rounds-order"

type TOrdersTableProps = {
    title: string
    orders: Order[]
    stocks: StockModel[]
    className?: string
    paidSection?: boolean
    onRefreshOrders: () => void
}

export const OrdersGrid: React.FC<TOrdersTableProps> = ({ title, orders, paidSection, stocks, className, onRefreshOrders }) => {
    const { removeOrderFn, markOrderAsPaidFn } = useCrudOrders()

    const handleRemoveOrder = (order: Order) => {
        const yes = confirm('Are you sure that you want remove this order?')

        if (yes) {
            removeOrderFn({
                order_id: order.id
            }).then(() => {
                onRefreshOrders()
            })
        }
    }

    const handleMarkOrderAsPaid = (orderId: string) => {
        markOrderAsPaidFn(orderId).then(() => {
            onRefreshOrders()
        })
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
                <Card key={order.id} className={cn(
                    // Border
                    "border-2 border-solid border-transparent dark:border-gray-600",
                    // Hover
                    "hover:border-primary-300",
                    "bg-white dark:bg-slate-800"
                )}>
                    <CardHeader>
                        <div>
                            <h2 className="text-xl text-primary-600 font-semibold">
                                Order #{index + 1}
                            </h2>
                            {!paidSection && (
                                <div className="flex items-center justify-between gap-x-1 mt-2">
                                    <Button
                                        variant="light"
                                        size="sm"
                                        color="primary"
                                        type="button"
                                        onPress={() => handleMarkOrderAsPaid(order.id)}
                                    >
                                        Paid?
                                    </Button>
                                    <AddRoundOrder stocks={stocks} orderId={order.id} onAddedSuccess={onRefreshOrders} />

                                    <Button variant="light" size="sm" color="danger" type="button" onPress={() => handleRemoveOrder(order)}>
                                        Delete
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <p className="mb-3">
                            <span className="text-xs text-gray-500">
                                Created: {order.created}
                            </span>
                            <br />
                            <span className="text-md text-gray-500">
                                Paid: {order.paid ? <span className="text-success-800">Yes</span> : <span className="text-danger-500">No</span>}
                            </span>
                            <br />
                            <span className="text-md text-success-600 font-semibold">
                                Total: ${order.subtotal}
                            </span>
                        </p>
                        <ul>
                            {order.items.map((item, index) => {
                                return (
                                    <li
                                        key={index}
                                        className={cn(
                                            'rounded-md p-0.5 hover:bg-primary-100',
                                            index % 2 === 0 && "bg-slate-50"
                                        )}
                                    >
                                        <span className="text-sm text-gray-400">{index + 1})</span> {item.quantity} de {item.name}
                                    </li>
                                )
                            })}
                        </ul>
                    </CardBody>
                </Card>
            )
        })
    }

    return (
        <section className={cn("grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4", className)}>
            <h1 className="col-span-full text-2xl font-semibold">
                Orders ({orders.length}): {title}
            </h1>
            {renderContent()}
        </section>
    )
}