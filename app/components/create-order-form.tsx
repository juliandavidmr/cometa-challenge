'use client'

import { useMemo, useState } from "react";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { cn } from "@heroui/theme";

import type { StockModel } from "../types/stocks"
import { useCrudOrders } from "../hooks/use-crud-orders";

type TCreateOrderFormProps = {
    className?: string
    stocks: StockModel[]
    onCreateOrderSuccess: () => void
}

export const CreateOrderForm: React.FC<TCreateOrderFormProps> = ({
    stocks,
    className,
    onCreateOrderSuccess,
}) => {
    const { createOrderFn } = useCrudOrders()
    const [orders, setOrders] = useState<{
        name: string
        stockId: string
        quantity: number
        price: number
    }[]>([])
    const stocksById = useMemo(() => {
        return stocks.reduce((acc, stock) => {
            acc[stock.id] = stock
            return acc
        }, {} as Record<string, StockModel>)
    }, [stocks])

    const [selectedKeys, setSelectedKeys] = useState(new Set([]));

    const selectedValue = useMemo(
        () => Array.from(selectedKeys).map((key) => stocksById[key].name).join(", "),
        [selectedKeys, stocksById],
    );

    const handleCreateOrder = (formData: FormData) => {
        const stockId = selectedKeys.values().next().value as unknown as string
        const quantity = parseInt(formData.get("stock") as string)

        setOrders(preOrders => [...preOrders, {
            name: stocksById[stockId].name,
            stockId,
            quantity,
            price: stocksById[stockId].price
        }])
    }

    const handleRemoveOrder = (index: number) => {
        setOrders(preOrders => preOrders.filter((_, i) => i !== index))
    }

    const handleCreateFinalOrder = async () => {
        const finalOrders = orders.map(order => ({
            stock_id: order.stockId,
            quantity: order.quantity,
        }))

        await createOrderFn({
            taxes: 0,
            discounts: 0,
            rounds: finalOrders,
        })

        onCreateOrderSuccess()

        setOrders([])
        setSelectedKeys(new Set([]))
    }

    return (
        <section className={cn("flex flex-col gap-4", className)}>
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Create order</h1>
                    <p className="text-sm text-gray-500">Add some beers to your order</p>
                </div>
                <Button
                    variant="solid"
                    color="secondary"
                    onPress={handleCreateFinalOrder}
                    isDisabled={orders.length === 0}
                >
                    Create final order ({orders.length})
                </Button>
            </div>
            <Table className="col-span-12" aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>BEER</TableColumn>
                    <TableColumn>#</TableColumn>
                    <TableColumn>PRICE</TableColumn>
                    <TableColumn>{' '}</TableColumn>
                </TableHeader>
                <TableBody>
                    {orders.map((order, index) => (
                        <TableRow key={order.stockId}>
                            <TableCell>{order.name}</TableCell>
                            <TableCell>{order.quantity}</TableCell>
                            <TableCell>{order.price}</TableCell>
                            <TableCell>
                                <Button
                                    variant="flat"
                                    color="danger"
                                    onPress={() => {
                                        handleRemoveOrder(index)
                                    }}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Form
                className="col-span-12 grid grid-cols-2 lg:grid-cols-3 gap-4 w-full"
                action={handleCreateOrder}
                validationBehavior="native"
            >
                <Dropdown backdrop="blur" shouldBlockScroll={false}>
                    <DropdownTrigger>
                        <Button className="capitalize" name="stock_id" variant="flat">
                            {selectedValue || 'Select beer'}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Single selection example"
                        selectedKeys={selectedKeys}
                        selectionMode="single"
                        disallowEmptySelection
                        variant="flat"
                        // @ts-expect-error
                        onSelectionChange={setSelectedKeys}
                    >
                        {stocks.map((stock) => (
                            <DropdownItem key={stock.id} value={stock.id} showDivider>
                                {stock.name}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>

                <Input
                    type="number"
                    name="stock"
                    min={1}
                    max={1000}
                    isRequired
                    variant="flat"
                    defaultValue={"1"}
                    placeholder="Enter stock quantity"
                />
                <Button
                    type="submit"
                    variant="flat"
                    color="primary"
                    className="col-span-2 lg:col-span-1"
                    isDisabled={selectedKeys.size === 0}
                >
                    Add to order
                </Button>
            </Form>
        </section>
    )
}

