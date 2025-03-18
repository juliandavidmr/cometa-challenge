from typing import List

from ..schemas.stock_schema import StockSchema

"""
Initial data for the application stock
"""
INITIAL_STOCK: List[StockSchema] = [
    {"id": 1, "name": "Corona", "price": 115, "quantity": 2},
    {"id": 2, "name": "Quilmes", "price": 120, "quantity": 0},
    {"id": 3, "name": "Club Colombia", "price": 110, "quantity": 3},
    {"id": 4, "name": "Heineken", "price": 125, "quantity": 1},
]