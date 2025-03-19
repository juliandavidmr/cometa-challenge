from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routers.orders_router import OrdersRouter
from api.routers.stocks_router import StockRouter

### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(StockRouter)
app.include_router(OrdersRouter)
