import json
import os

from typing import List
from api.schemas.order_schema import OrderSchema


class DBService:
    def __init__(self):
        self.db_path = os.path.join(
            os.path.dirname(os.path.dirname(__file__)), "db.json"
        )

    def get_registers(self) -> List[OrderSchema]:
        try:
            if os.path.exists(self.db_path) and os.path.getsize(self.db_path) > 0:
                with open(self.db_path, "r") as f:
                    data = json.load(f)
                    return data
            return []
        except Exception as e:
            print(f"Error loading registers: {e}")
            return []

    def update_all_registers(self, registers: List[OrderSchema]):
        try:
            data = registers
            with open(self.db_path, "w") as f:
                json.dump(data, f, indent=2)
        except Exception as e:
            print(f"Error saving registers: {e}")
