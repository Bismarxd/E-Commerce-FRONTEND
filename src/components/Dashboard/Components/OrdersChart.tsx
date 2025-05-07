import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { OrderStatusSummary } from "@/types/types";

ChartJS.register(ArcElement, Tooltip, Legend);

interface OrderSummary{
  dataChart: OrderStatusSummary
}

const OrdersChart: React.FC<OrderSummary> = ({ dataChart }) => {
  // Obtén los valores de cada estado
  const delivered = dataChart?.orderStatusSummary?.Entregado || 0;
  const cancelled = dataChart?.orderStatusSummary?.Cancelado || 0;
  const refunded = dataChart?.orderStatusSummary?.Reemboolsado || 0;

  // Suma de los valores válidos
  const totalValidOrders = delivered + cancelled + refunded;

  // Si no hay órdenes válidas, evita dividir entre 0
  const deliveredPercentage = totalValidOrders
    ? (delivered / totalValidOrders) * 100
    : 0;
  const cancelledPercentage = totalValidOrders
    ? (cancelled / totalValidOrders) * 100
    : 0;
  const refundedPercentage = totalValidOrders
    ? (refunded / totalValidOrders) * 100
    : 0;

  const data = {
    labels: ["Entregado", "Cancelado", "Rechazado"],
    datasets: [
      {
        data: [delivered, cancelled, refunded],
        backgroundColor: ["#EF4444", "#8B5CF6", "#02921a"],
        hoverBackgroundColor: ["#B91C1C", "#6D28D9", "#08c127"],
      },
    ],
  };

  const totalOrders = dataChart?.totalOrders || 0;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg w-full max-w-sm mx-auto flex items-center justify-center">
      <div className="w-1/2">
        <Doughnut data={data} options={options} />
      </div>
      <div className="w-1/2 pl-4">
        <p className="text-center text-lg font-bold">Total</p>
        <p className="text-center text-gray-500 text-xl">{totalOrders}</p>
        <div className="mt-4">
          <p className="text-red-500">
            Entregado ({deliveredPercentage.toFixed(2)}%)
          </p>
          <p className="text-purple-500">
            Cancelado ({cancelledPercentage.toFixed(2)}%)
          </p>
          <p className="text-green-700">
            Reembolsados ({refundedPercentage.toFixed(2)}%)
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrdersChart;
