from typing import TypedDict

class StockSchema(TypedDict):
    id: int
    name: str
    price: float
    quantity: int