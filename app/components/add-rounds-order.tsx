import { useMemo, useState } from "react";

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Form,
} from "@heroui/react";
import { StockModel } from "../types/stocks";
import { useCrudOrders } from "../hooks/use-crud-orders";

type TAddRoundOrderProps = {
    open?: boolean;
    stocks: StockModel[]
    orderId: string
    onAddedSuccess: () => void
}

export const AddRoundOrder: React.FC<TAddRoundOrderProps> = ({ open, orderId, stocks, onAddedSuccess }) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure({ isOpen: open });
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const { updateOrderFn } = useCrudOrders();
    const [updating, setUpdating] = useState(false)

    const stocksById = useMemo(() => {
        return stocks.reduce((acc, stock) => {
            acc[stock.id] = stock
            return acc
        }, {} as Record<string, StockModel>)
    }, [stocks])

    const selectedValue = useMemo(
        () => Array.from(selectedKeys).map((key) => stocksById[key].name).join(", "),
        [selectedKeys, stocksById],
    );

    const handleAddRoundToOrder = (formData: FormData) => {
        const stock_id = selectedKeys.values().next().value as unknown as string
        const quantity = parseInt(formData.get("quantity") as string)

        setUpdating(true)

        updateOrderFn({
            order_id: orderId,
            rounds: [{
                stock_id,
                quantity
            }]
        }).finally(() => {
            setUpdating(false)
            onAddedSuccess()
            onClose()
        }).catch(error => {
            console.error(error);
            alert('Error')
        })
    }

    return (
        <>
            <Button variant="light" color="success" size="sm" onPress={onOpen}>
                Add round
            </Button>
            <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
                <Form action={handleAddRoundToOrder}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">New round</ModalHeader>
                                <ModalBody>
                                    <Dropdown isDisabled={updating}>
                                        <DropdownTrigger>
                                            <Button className="capitalize" name="stock_id">
                                                {selectedValue || 'Select beer'}
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu
                                            aria-label="Single selection example"
                                            selectedKeys={selectedKeys}
                                            selectionMode="single"
                                            variant="bordered"
                                            // @ts-expect-error
                                            onSelectionChange={setSelectedKeys}
                                        >
                                            {stocks.map((stock) => (
                                                <DropdownItem key={stock.id} value={stock.id}>
                                                    {stock.name}
                                                </DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    </Dropdown>
                                    <Input
                                        label="Quantity"
                                        name="quantity"
                                        placeholder="How many beers?"
                                        type="number"
                                        variant="bordered"
                                        isDisabled={updating}
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="flat" onPress={onClose} isDisabled={updating}>
                                        Close
                                    </Button>
                                    <Button
                                        color="primary"
                                        type="submit"
                                        isDisabled={updating}
                                        isLoading={updating}
                                    >
                                        Add round
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Form>
            </Modal>
        </>
    );
}
