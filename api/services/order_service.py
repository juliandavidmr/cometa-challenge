from typing import List
from datetime import datetime
import uuid

from api.services.db_service import DBService
from api.services.stock_service import StockService
from api.schemas.order_schema import (
    AddRoundsToOrderSchema,
    OrderItemSchema,
    OrderRoundItemSchema,
    OrderRoundSchema,
    OrderSchema,
    CreateOrderSchema,
    OrderSchemaResponseSchema,
)


class OrderService:
    def __init__(self, stock_service: StockService, db_service: DBService):
        self.db_service = db_service
        self.stock_service = stock_service

    def get_all_orders(self) -> List[OrderSchema]:
        """
        Get all available orders
        """
        orders = self.db_service.get_registers()

        if orders is None:
            return []

        for order in orders:
            items: List[OrderItemSchema] = []
            order["subtotal"] = 0
            order["discounts"] = 0
            rounds = order["rounds"]
            for round_ in rounds:
                for round_item in round_["items"]:
                    stock_id = round_item["stock_id"]
                    stock_item = self.stock_service.get_stock_item_by_id(stock_id)

                    if stock_item is None:
                        continue

                    subtotal = stock_item["price"] * round_item["quantity"]
                    order["subtotal"] += subtotal

                    items.append(
                        OrderItemSchema(
                            name=stock_item["name"],
                            quantity=round_item["quantity"],
                            total=1,
                            price_per_unit=10,
                            stock_id=round_item["stock_id"],
                        )
                    )

        return orders

    def get_calculated_orders(self) -> List[OrderSchemaResponseSchema]:
        orders = self.db_service.get_registers()
        orders_with_items: List[OrderSchemaResponseSchema] = []

        for order in orders:
            items: List[OrderItemSchema] = []
            for round_ in order["rounds"]:
                for item in round_["items"]:
                    stock_id = item["stock_id"]
                    stock_item = self.stock_service.get_stock_item_by_id(stock_id)

                    if stock_item is None:
                        continue

                    subtotal = stock_item["price"] * item["quantity"]
                    order["subtotal"] += subtotal

                    items.append(
                        OrderItemSchema(
                            name=stock_item["name"],
                            quantity=item["quantity"],
                            total=stock_item["price"] * item["quantity"],
                            price_per_unit=stock_item["price"],
                            stock_id=stock_id,
                        )
                    )

            orders_with_items.append(
                OrderSchemaResponseSchema(
                    id=order["id"],
                    paid=order["paid"],
                    created=order["created"],
                    taxes=order["taxes"],
                    subtotal=order["subtotal"],
                    discounts=order["discounts"],
                    items=items,
                    rounds=order["rounds"],
                )
            )

        return orders_with_items

    def get_order_by_id(self, id: int):
        """
        Get an order by id
        """
        orders = self.get_all_orders()
        for order in orders:
            if order["id"] == id:
                return order
        return None

    def create_order(self, to_create_order: CreateOrderSchema) -> OrderSchema:
        orders = self.get_all_orders()
        """
        Create a new order
        """
        new_order = OrderSchema(
            id=str(uuid.uuid4()),
            created=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            paid=False,
            subtotal=0,
            taxes=0,
            discounts=0,
            rounds=[
                OrderRoundSchema(
                    created=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    items=[
                        OrderRoundItemSchema(
                            stock_id=new_round["stock_id"],
                            quantity=new_round["quantity"],
                        )
                        for new_round in to_create_order["rounds"]
                    ],
                )
            ],
        )
        orders.append(new_order)

        self.db_service.update_all_registers(orders)
        return new_order

    def add_round_to_order(
        self, order_id: str, body: AddRoundsToOrderSchema
    ) -> OrderSchema | None:
        """
        Update an existing order
        """

        if len(body["rounds"]) == 0:
            return None

        orders = self.get_all_orders()

        for order in orders:
            if order["id"] == order_id:
                order["rounds"].append(
                    OrderRoundSchema(
                        created=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                        items=[
                            OrderRoundItemSchema(
                                stock_id=round_["stock_id"],
                                quantity=round_["quantity"],
                            )
                            for round_ in body["rounds"]
                        ],
                    )
                )

                self.db_service.update_all_registers(orders)
                return order

    def remove_order(self, id: int) -> OrderSchema | None:
        orders = self.get_all_orders()
        for order in orders:
            if order["id"] == id:
                orders.remove(order)
                self.db_service.update_all_registers(orders)
                return order
        return None
