from typing import List

from ..schemas.stock_schema import StockSchema


class StockService:
    def __init__(self, stock: List[StockSchema], last_update: str) -> None:
        self.stock = stock
        self.last_update = last_update

    def get_stock(self) -> List[StockSchema]:
        return self.stock

    def get_stock_item_by_id(self, id: str) -> StockSchema | None:
        for item in self.stock:
            if item["id"] == id:
                return item
        return None

    def get_last_update(self):
        return self.last_update
