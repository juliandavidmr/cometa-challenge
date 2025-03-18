from typing import TypedDict, List

class OrderItemSchema(TypedDict):
    id: int
    name: str
    quantity: int

class OrderRoundSchema(TypedDict):
    created: str
    items: List[OrderItemSchema]

class OrderSchema(TypedDict):
    id: int
    created: str
    paid: bool
    subtotal: float
    taxes: float
    discounts: float
    items: List[OrderItemSchema]
    rounds: List[OrderRoundSchema]

class CreateOrderSchema(TypedDict):
    taxes: float
    discounts: float
    items: List[OrderItemSchema]
    rounds: List[OrderRoundSchema]