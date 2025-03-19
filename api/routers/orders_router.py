from fastapi import APIRouter, Depends

from api.schemas.order_schema import (
    AddRoundsToOrderSchema,
    CreateOrderSchema,
)
from api.dependencies import get_order_service
from api.services.order_service import OrderService

OrdersRouter = APIRouter(
    prefix="/api/orders",
    tags=["orders"],
)


@OrdersRouter.get("/")
def get_all_orders(order_service: OrderService = Depends(get_order_service)):
    """
    Get all requested orders
    """
    return {"success": True, "orders": order_service.get_calculated_orders()}


@OrdersRouter.post("/")
def create_order(
    body: CreateOrderSchema, order_service: OrderService = Depends(get_order_service)
):
    """
    Create a new order
    """
    order = order_service.create_order(body)
    return {"success": True, "order": order}


@OrdersRouter.put("/{order_id:str}")
def add_round_to_order(
    order_id: str,
    body: AddRoundsToOrderSchema,
    order_service: OrderService = Depends(get_order_service),
):
    """
    Update an order by id
    """
    order = order_service.add_round_to_order(order_id, body)
    if order is None:
        return {"success": False, "message": "Order not found"}
    return {"success": True, "order": order}


@OrdersRouter.delete("/{id:str}")
def remove_order(id: int, order_service: OrderService = Depends(get_order_service)):
    """
    Remove an order by id
    """
    order = order_service.remove_order(id)
    if order is None:
        return {"success": False, "message": "Order not found"}
    return {"success": True, "order": order}
