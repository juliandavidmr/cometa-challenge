from typing import List
from datetime import datetime

from api.services.stock_service import StockService
from api.schemas.order_schema import OrderSchema, CreateOrderSchema

class OrderService:
    def __init__(self, stock_service: StockService):
        self.stock_service = stock_service
        self.orders: List[OrderSchema] = []
    def get_all_orders(self):
        """
        Get all available orders
        """
        return self.orders
    def get_order_by_id(self, id: int):
        """
        Get an order by id
        """
        for order in self.orders:
            if order["id"] == id:
                return order
        return None
    def create_order(self, to_create_order: CreateOrderSchema) -> OrderSchema:
        """
        Create a new order
        """
        new_order: OrderSchema = {
            "id": len(self.orders) + 1,
            "created": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "paid": False,
            "subtotal": 0,
            "taxes": 0,
            "discounts": 0,
            "items": to_create_order["items"],
            "rounds": to_create_order["rounds"]
        }
        self.orders.append(new_order)
        return new_order
    def remove_order(self, id: int) -> OrderSchema | None:
        for order in self.orders:
            if order["id"] == id:
                self.orders.remove(order)
                return order
        return None