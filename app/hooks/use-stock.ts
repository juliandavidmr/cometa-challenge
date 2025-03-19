import useSWR from "swr";

import { getStocks } from "../services/stocks.service";

export const useStocks = () => {
	const {
		data: stocks = [],
		error,
		isLoading,
		mutate: refetchStocks,
	} = useSWR("/api/stocks", getStocks);

	return {
		stocks,
		error,
		isLoading,
		refetchStocks,
	};
};
