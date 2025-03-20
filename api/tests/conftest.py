import pytest
from fastapi.testclient import TestClient

from api.index import app


@pytest.fixture
def client():
    """
    Fixture to provide a TestClient instance for testing the FastAPI application.
    """
    return TestClient(app)
