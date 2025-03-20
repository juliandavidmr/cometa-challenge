#! /bin/bash

uv run pytest -vv

echo "Undoing changes of db_test.json"
echo "[]" > ./api/tests/db_test.json
echo "Done"