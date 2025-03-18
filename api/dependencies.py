from fastapi import Depends
from datetime import datetime

from api.services.stock_service import StockService
from api.services.order_service import OrderService

from api.data.initial_stock import INITIAL_STOCK

stock_service = StockService(
    INITIAL_STOCK,
    datetime.now().strftime("%Y-%m-%d %H:%M:%S")
)

def get_stock_service():
    return stock_service

def get_order_service(stock_service: StockService = Depends(get_stock_service)):
    return OrderService(stock_service)