from fastapi import APIRouter
from datetime import datetime

from ..services.stock_service import StockService
from ..data.initial_stock import INITIAL_STOCK

StockRouter = APIRouter(
    prefix="/api/stocks",
    tags=["stocks"],
)

stock_service = StockService(
    INITIAL_STOCK, datetime.now().strftime("%Y-%m-%d %H:%M:%S")
)


@StockRouter.get("/")
def get_all_stocks():
    """
    Get all available orders
    """
    return {
        "success": True,
        "beers": stock_service.get_stock(),
        "last_update": stock_service.get_last_update(),
    }


@StockRouter.get("/{order_id:str}")
def get_stock_by_id(order_id: str):
    """
    Get order by id
    """
    order = stock_service.get_stock_item_by_id(order_id)
    if order is None:
        return {"success": False, "beer": None, "error_message": "Beer not found"}
    return {"success": True, "beer": order}
