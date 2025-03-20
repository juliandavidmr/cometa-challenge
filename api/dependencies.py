from fastapi import Depends
from datetime import datetime

from .services.db_service import DBService
from .services.stock_service import StockService
from .services.order_service import OrderService
from .data.initial_stock import INITIAL_STOCK

stock_service = StockService(
    INITIAL_STOCK, datetime.now().strftime("%Y-%m-%d %H:%M:%S")
)


def get_stock_service():
    return stock_service


def get_db_service():
    return DBService()


def get_order_service(
    stock_service: StockService = Depends(get_stock_service),
    db_service: DBService = Depends(get_db_service),
):
    return OrderService(stock_service, db_service)
