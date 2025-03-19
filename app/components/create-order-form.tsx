'use client'

import { useMemo, useRef, useState } from "react";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { cn } from "@heroui/theme";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";

import type { StockModel } from "../types/stocks"
import { useCrudOrders } from "../hooks/use-crud-orders";
import { Divider } from "@heroui/react";

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
    const discountsRef = useRef<HTMLInputElement | null>(null);
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

    const [selectedStock, setSelectedStock] = useState<string>();

    const handleCreateOrder = (formData: FormData) => {
        const stockId = selectedStock!
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
        const discounts = parseFloat(discountsRef.current?.value || '0')

        await createOrderFn({
            taxes: 0,
            discounts,
            rounds: finalOrders,
        })

        onCreateOrderSuccess()
        setOrders([])
        setSelectedStock(undefined)
    }

    return (
        <section className={cn("flex flex-col gap-4", className)}>

            <div className="flex justify-between items-center gap-4 w-full">
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
                    Send order ({orders.length})
                </Button>
            </div>
            <Input
                type="number"
                label="Discount %"
                name="discounts"
                ref={discountsRef}
                min={0}
                max={100}
                isRequired
                variant="flat"
                defaultValue={"0"}
                placeholder="Enter discount"
            />
            <Table className="col-span-12" aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>BEER</TableColumn>
                    <TableColumn>#</TableColumn>
                    <TableColumn>PRICE</TableColumn>
                    <TableColumn>{' '}</TableColumn>
                </TableHeader>
                <TableBody emptyContent={
                    <p>
                        No beers in this order.
                        <br />
                        Select beer and then click on add
                    </p>
                }>
                    {orders.map((order, index) => (
                        <TableRow key={order.stockId}>
                            <TableCell>{order.name}</TableCell>
                            <TableCell>{order.quantity}</TableCell>
                            <TableCell>{order.price}</TableCell>
                            <TableCell>
                                <Button
                                    variant="flat"
                                    color="danger"
                                    onPress={() => handleRemoveOrder(index)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Form
                action={handleCreateOrder}
                validationBehavior="native"
                className="col-span-12 grid grid-cols-3 gap-4 w-full"
            >
                <Autocomplete
                    label="Beers stock"
                    defaultItems={stocks}
                    // NOTE: Update for a loading stocks state
                    isLoading={stocks.length === 0}
                    placeholder="Select a beer"
                    selectedKey={selectedStock}
                    className="col-span-2"
                    isRequired
                    // @ts-expect-error
                    onSelectionChange={setSelectedStock}
                >
                    {(stock) => <AutocompleteItem key={stock.id}>{stock.name}</AutocompleteItem>}
                </Autocomplete>

                <Input
                    type="number"
                    name="stock"
                    min={1}
                    max={1000}
                    isRequired
                    label="Quantity"
                    variant="flat"
                    defaultValue={"1"}
                    placeholder="Enter quantity"
                />
                <Divider className="col-span-full" />
                <Button
                    type="submit"
                    color="primary"
                    className="col-span-full"
                    isDisabled={selectedStock === undefined}
                >
                    Add beer to order
                </Button>
            </Form>
        </section>
    )
}

