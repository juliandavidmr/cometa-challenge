from fastapi import APIRouter, Depends
from api.dependencies import get_order_service, get_stock_service
from api.services.order_service import OrderService
from api.services.stock_service import StockService

OrdersRouter = APIRouter(
    prefix = "/api/orders",
    tags = ["orders"],
)

@OrdersRouter.get("/")
def get_all_orders(
    order_service: OrderService = Depends(get_order_service),
    stock_service: StockService = Depends(get_stock_service)
):
    """
    Get all requested orders
    """
    return {"success": True, "orders": order_service.get_all_orders(), "last_update": stock_service.get_last_update()}