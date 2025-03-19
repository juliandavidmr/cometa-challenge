from typing import TypedDict, List


class OrderItemSchema(TypedDict):
    id: str
    name: str
    quantity: int
    total: float
    price_per_unit: float
    stock_id: str


class OrderRoundItemSchema(TypedDict):
    stock_id: str
    quantity: int


class OrderRoundSchema(TypedDict):
    created: str
    """
    Items round
    """
    items: List[OrderRoundItemSchema]


class OrderSchemaResponseSchema(TypedDict):
    id: str
    paid: bool
    created: str
    taxes: float
    subtotal: float
    discounts: float
    items: List[OrderItemSchema]
    rounds: List[OrderRoundSchema]


class OrderSchema(TypedDict):
    id: str
    paid: bool
    created: str
    taxes: float
    subtotal: float
    discounts: float
    rounds: List[OrderRoundSchema]


# Creation Order Schemas


class CreateOrderRoundSchema(TypedDict):
    stock_id: str
    quantity: int


class CreateOrderSchema(TypedDict):
    taxes: float
    discounts: float
    rounds: List[CreateOrderRoundSchema]


# Update Order Schemas


class UpdateOrderSchema(TypedDict):
    taxes: float
    discounts: float
    new_round: OrderRoundItemSchema


class AddRoundsToOrderSchema(TypedDict):
    rounds: List[CreateOrderRoundSchema]
