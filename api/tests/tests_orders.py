from fastapi.testclient import TestClient

from api.schemas.order_schema import CreateOrderRoundSchema, CreateOrderSchema


def test_get_all_orders(client: TestClient):
    """Verificar que se obtienen todas las órdenes correctamente"""
    response = client.get("/api/orders/")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] == True
    assert "orders" in data


def test_create_order(client: TestClient):
    """Test para verificar la creación de una orden"""
    order_data = CreateOrderSchema(
        taxes=0, discounts=0, rounds=[CreateOrderRoundSchema(stock_id="1", quantity=4)]
    )

    response = client.post("/api/orders/", json=order_data)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] == True
    assert "order" in data
    assert len(data["order"]["rounds"]) == 1
    assert data["order"]["discounts"] == order_data["discounts"]
