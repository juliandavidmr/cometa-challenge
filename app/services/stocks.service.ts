import type { StockModel } from "../types/stocks";

export async function getStocks(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch stocks");
  }
  const data = await response.json();
  const beers = (data["beers"] as StockModel[]) || [];
  return beers;
}
