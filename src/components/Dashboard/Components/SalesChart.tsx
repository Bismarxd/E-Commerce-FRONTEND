import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { FaChartBar } from "react-icons/fa";
import { SalesData } from "@/types/types";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface SalesChartProps {
  dataSales: SalesData;
}

const SalesChart: React.FC<SalesChartProps>  = ({dataSales}) => {

  const data = {
    labels: Array.from({ length: 31 }, (_, i) => i + 1),
    datasets: [
      {
        label: "Ventas",
        data: Array.from({ length: 31 }, (_, i) => {
          const sale = dataSales?.dailySales?.find(s => s._id === i + 1);
          return sale ? sale.total : 0;
        }),
        borderColor: "#DC2626",
        backgroundColor: "rgba(220, 38, 38, 0.2)",
        tension: 0.4,
        fill:  true
      },
    ],
  };
  

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Días del Mes",
        },
      },
      y: {
        title: {
          display: true,
          text: "Ventas",
        },
      },
    },
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg w-full max-w-lg mx-auto">
      <div className="flex justify-between mb-4">
        <div>
          <p className="text-lg font-bold">Bs. {dataSales?.totalSales}</p>
          <p className="text-sm text-gray-500">Ventas Totales</p>
        </div>
        <div>
          <p className="text-lg font-bold">Bs. {dataSales?.avgSalesPerDay}</p>
          <p className="text-sm text-gray-500">Promedio de Ventas por Día</p>
        </div>
      </div>
      <FaChartBar className="text-xl text-gray-700"/>
      <Line data={data} options={options} />
    </div>
  );
};

export default SalesChart;