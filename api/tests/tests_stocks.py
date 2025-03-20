from fastapi.testclient import TestClient


def test_get_all_stocks(client: TestClient):
    """Test para verificar que se obtienen todos los stocks correctamente"""
    response = client.get("/api/stocks/")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] == True
    assert "last_update" in data
    assert data["last_update"] != ""
    assert "beers" in data
    assert len(data["beers"]) > 0


def test_get_stock_by_id(client):
    """Test para verificar que se obtiene un stock por su ID"""
    response = client.get("/api/stocks/")
    beers = response.json()["beers"]
    assert len(beers) > 0

    beer_id = beers[0]["id"]
    response = client.get(f"/api/stocks/{beer_id}")

    assert response.status_code == 200
    data = response.json()
    assert data["success"] == True
    assert data["beer"]["id"] == beer_id


def test_get_nonexistent_stock(client):
    """Test para verificar el comportamiento cuando se busca un stock que no existe"""
    response = client.get("/api/stocks/undefined")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] == False
    assert data["beer"] is None
    assert "error_message" in data
