import { StockModel } from "../types/stocks";

export async function fetch_all_stocks() {
	const response = await fetch("/api/stocks");
	if (!response.ok) {
		throw new Error("Failed to fetch stocks");
	}
	const data = await response.json();
	const beers = data["beers"] as StockModel[];
	return beers;
}
