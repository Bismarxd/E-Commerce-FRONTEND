import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { CustomerActivity } from "@/types/types";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Data {
  dataStats: CustomerActivity[]
}

const CustomerStats: React.FC<Data> = ({ dataStats }) => {

  const [hourly, setHourly]=useState<string[]>([])
  const [hourlyData, setHourlyData]=useState<number[]>([])
  
  useEffect(() => {
    setHourly(dataStats?.map((item) => item?._id + ":00") || []);
    setHourlyData(dataStats?.map((item) => item?.count) || []);
  }, [dataStats]);

  const data = {
    labels: hourly,

    datasets: [
      {
        label: "Ventas por Hora",
        data: hourlyData,
        backgroundColor: "#3B82F6",
        borderColor: "#2563EB",
        borderWidth: 1,
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
          text: "Hora del Día",
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
      <h2 className="text-center text-lg font-bold mb-4">Ventas por Hora</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default CustomerStats;
