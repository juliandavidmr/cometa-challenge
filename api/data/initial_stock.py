from typing import List

from ..schemas.stock_schema import StockSchema

"""
Initial data for the application stock
"""
INITIAL_STOCK: List[StockSchema] = [
    {"id": "1", "name": "Corona", "price": 115, "quantity": 2},
    {"id": "2", "name": "Quilmes", "price": 120, "quantity": 0},
    {"id": "3", "name": "Club Colombia", "price": 110, "quantity": 3},
    {"id": "4", "name": "Heineken", "price": 125, "quantity": 1},
    {"id": "5", "name": "Stella Artois", "price": 130, "quantity": 4},
    {"id": "6", "name": "Budweiser", "price": 118, "quantity": 2},
    {"id": "7", "name": "Modelo Especial", "price": 122, "quantity": 3},
    {"id": "8", "name": "Carlsberg", "price": 128, "quantity": 1},
    {"id": "9", "name": "Guinness", "price": 135, "quantity": 2},
    {"id": "10", "name": "Blue Moon", "price": 127, "quantity": 3},
    {"id": "11", "name": "Hoegaarden", "price": 132, "quantity": 2},
    {"id": "12", "name": "Leffe", "price": 140, "quantity": 3},
    {"id": "13", "name": "Paulaner", "price": 138, "quantity": 1},
    {"id": "14", "name": "Erdinger", "price": 142, "quantity": 2},
    {"id": "15", "name": "Chimay", "price": 145, "quantity": 1},
    {"id": "16", "name": "Duvel", "price": 143, "quantity": 2},
    {"id": "17", "name": "Peroni", "price": 125, "quantity": 3},
    {"id": "18", "name": "Asahi", "price": 130, "quantity": 2},
    {"id": "19", "name": "Sapporo", "price": 128, "quantity": 1},
    {"id": "20", "name": "Tiger", "price": 120, "quantity": 4},
]
