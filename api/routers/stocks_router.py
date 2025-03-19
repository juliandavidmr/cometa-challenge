from fastapi import APIRouter, Depends

from api.dependencies import get_stock_service

from ..services.stock_service import StockService

StockRouter = APIRouter(
    prefix="/api/stocks",
    tags=["stocks"],
)

@StockRouter.get("/")
def get_all_stocks(stock_service: StockService = Depends(get_stock_service)):
    """
    Get all available orders
    """
    return {
        "success": True,
        "beers": stock_service.get_stock(),
        "last_update": stock_service.get_last_update(),
    }


@StockRouter.get("/{order_id:str}")
def get_stock_by_id(order_id: str, stock_service: StockService = Depends(get_stock_service)):
    """
    Get order by id
    """
    order = stock_service.get_stock_item_by_id(order_id)
    if order is None:
        return {"success": False, "beer": None, "error_message": "Beer not found"}
    return {"success": True, "beer": order}
