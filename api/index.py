from fastapi import FastAPI

from api.routers.orders_router import OrdersRouter
from api.routers.stocks_router import StockRouter, stock_service

### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")
app.include_router(StockRouter)
app.include_router(OrdersRouter)