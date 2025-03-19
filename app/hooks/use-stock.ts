import { useEffect, useState } from "react";

import { StockModel } from "../types/stocks";
import { getStocks } from "../repository/stocks.repository";

export const useStock = () => {
	const [stocks, setStocks] = useState<StockModel[]>([]);

	useEffect(() => {
		const call = async () => {
			const stocks = await getStocks();
			console.log("stocks", stocks);
			setStocks(stocks);
		};
		call();
	}, []);

	return {
		stocks,
	};
};
