from typing import TypedDict


class StockSchema(TypedDict):
    id: str
    name: str
    price: float
    quantity: int
