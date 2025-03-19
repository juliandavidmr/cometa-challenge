import { fetch_all_stocks } from "../services/stock.service";

export function getStocks() {
	return fetch_all_stocks();
}
