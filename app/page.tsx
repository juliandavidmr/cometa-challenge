"use client";

import { useMemo } from "react";

import { useStocks } from "./hooks/use-stock";
import { CreateOrderForm } from "./components/create-order-form";
import { useCurrentOrders } from "./hooks/use-orders";
import { OrdersGrid } from "./components/orders-grid";
import type { OrderModel } from "./types/orders";

export default function Home() {
  const { stocks, isLoading, error, refetchStocks } = useStocks();
  const {
    orders,
    isLoading: isLoadingOrders,
    error: errorOrders,
    refetchOrders,
  } = useCurrentOrders();

  const { ordersPaid, ordersUnpaid } = useMemo(() => {
    const ordersPaid: OrderModel[] = [];
    const ordersUnpaid: OrderModel[] = [];

    for (const order in orders) {
      if (Object.prototype.hasOwnProperty.call(orders, order)) {
        const element = orders[order];
        if (element.paid) {
          ordersPaid.push(element);
        } else {
          ordersUnpaid.push(element);
        }
      }
    }

    return { ordersPaid, ordersUnpaid };
  }, [orders]);

  if (isLoading || isLoadingOrders) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        Loading...
      </div>
    );
  }

  if (error || errorOrders) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        Error: {(error || errorOrders).message}
      </div>
    );
  }

  return (
    <main className="p-8 grid gap-4 lg:gap-6 grid-cols-1 lg:grid-cols-12 container mx-auto">
      <CreateOrderForm
        stocks={stocks}
        onCreateOrderSuccess={() => {
          refetchStocks();
          refetchOrders();
        }}
        className="lg:col-span-4 w-full"
      />
      <div className="lg:col-span-8">
        <OrdersGrid
          title="No paid"
          orders={ordersUnpaid}
          stocks={stocks}
          className="mb-8"
          onRefreshOrders={() => {
            refetchStocks();
            refetchOrders();
          }}
        />
        <OrdersGrid
          title="Paid"
          paidSection
          orders={ordersPaid}
          stocks={stocks}
          onRefreshOrders={() => {
            refetchStocks();
            refetchOrders();
          }}
        />
      </div>
    </main>
  );
}
