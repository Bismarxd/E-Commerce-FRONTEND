"use client";
import CustomerStats from "@/components/Dashboard/Components/CustomerStats";
import OrdersChart from "@/components/Dashboard/Components/OrdersChart";
import OrderStatCard from "@/components/Dashboard/Components/OrderStatCard";
import SalesChart from "@/components/Dashboard/Components/SalesChart";
import StatCard from "@/components/Dashboard/Components/StatCards";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaWallet,
  FaShoppingCart,
  FaUsers,
  FaBox,
  FaClock,
  FaCheckCircle,
  FaTruck,
  FaBoxOpen,
  FaTimesCircle,
  FaUndo,
  FaBan,
} from "react-icons/fa";
import ProductCard from "@/components/ProductCard";
import { axiosInstance } from "@/lib/axiosInstance";
import { Stat, MetricProps, SalesData, OrderProps, OrderStatusSummary, CustomerActivity } from "@/types/types";


interface RestData {
  salesSummary: SalesData; 
  orderSummary: OrderStatusSummary;
  customerActivity: CustomerActivity[];
  topCustomers: {
    fullName: string;
    totalOrders: number;
  }[];
}

const Page: React.FC = () => {
  const [dbMetrics, setDbMetris] = useState<MetricProps>();
  const [orderSt, setOrderSt] = useState<OrderProps[]>([]);
  const [products, setProducts] = useState([]);
  const [restData, setRestData] = useState<RestData>();

  const fetchDbMetrics = async () => {
    await axiosInstance.get("/dashboard/metrics").then((data) => {
      if (data?.data?.status) {
        setDbMetris(data?.data?.data);
      }
    });

    await axiosInstance.get("/dashboard/order-stats").then((data) => {
      if (data?.data?.status) {
        setOrderSt(data?.data?.data);
      }
    });

    await axiosInstance.get("/dashboard/summary").then((data) => {
      if (data?.data?.status) {
        setRestData(data?.data?.data);
      }
    });

    await axiosInstance.get("/products").then((data) => {
      if (data?.data?.status) {
        setProducts(data?.data?.data);
      }
    });
  };

  useEffect(() => {
    fetchDbMetrics();
  }, []);
  console.log(restData)


  const stats: Stat[] = [
    {
      icon: <FaWallet />,
      label: "Ganancias Totales",
      value:
        dbMetrics?.totalEarning.length !== 0
          ? "Bs" + " " + dbMetrics?.totalEarning[0].totalEarning
          : "Bs" + " " + 0,
      color: "bg-pink-500",
    },
    {
      icon: <FaShoppingCart />,
      label: "Pedidos Totales",
      value: dbMetrics?.totalOrders || "",
      color: "bg-red-500",
    },
    {
      icon: <FaUsers />,
      label: "Clientes Totales",
      value: dbMetrics?.totalCustomer || "",
      color: "bg-purple-500",
    },
    {
      icon: <FaBox />,
      label: "Productos Totales",
      value: dbMetrics?.totalProducts || "",
      color: "bg-blue-500",
    },
  ];

  const orderStats: Stat[] = [
    {
      icon: <FaShoppingCart />,
      label: "Pedidos Totales",
      value: dbMetrics?.totalOrders || "",
      color: "text-gray-500",
    },
    {
      icon: <FaClock />,
      label: "Pendientes",
      value: orderSt.find((item) => item?._id === "Pendiente")?.count || "0",
      color: "text-yellow-500",
    },
    {
      icon: <FaCheckCircle />,
      label: "Confirmados",
      value: orderSt.find((item) => item?._id === "Aceptado")?.count || "0",
      color: "text-green-500",
    },
    {
      icon: <FaTruck />,
      label: "En Proceso",
      value: orderSt.find((item) => item?._id === "En Camino")?.count || "0",
      color: "text-blue-500",
    },
    {
      icon: <FaBoxOpen />,
      label: "Entregados",
      value: orderSt.find((item) => item?._id === "Entregado")?.count || "0",
      color: "text-purple-500",
    },
    {
      icon: <FaTimesCircle />,
      label: "Cancelados",
      value: orderSt.find((item) => item?._id === "Cancelado")?.count || "0",
      color: "text-red-500",
    },
    {
      icon: <FaUndo />,
      label: "Devueltos",
      value: orderSt.find((item) => item?._id === "Devuelto")?.count || "0",
      color: "text-blue-500",
    },
    {
      icon: <FaBan />,
      label: "Reembolsados",
      value: orderSt.find((item) => item?._id === "Reemboolsado")?.count || "0",
      color: "text-red-500",
    },
  ];


  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-500">Buenos Días!</h1>
      <p className="text-xl text-black">Administrador</p>
      <div className="mt-4">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">Resumen</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          <h2 className="text-xl font-bold mb-4">Estadísticas de Pedidos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {orderStats.map((order, index) => (
              <OrderStatCard key={index} {...order} />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-between gap-4">
        <div className="w-full md:w-[50%] rounded bg-white shadow">
          <div className="shadow-md p-4 flex justify-between items-center">
            <h3 className="font-bold">Resumen de Ventas</h3>
            {/* <div>
              <DateRangePicker
                ranges={[selectionRange]}
                onChange={(e)=>console.log(e)}
              />
            </div> */}
          </div>
          <div className="mt-3 flex items-center justify-center p-4 w-full">
            {restData?.salesSummary && (
              <SalesChart dataSales={restData.salesSummary} />
            )}
          </div>
        </div>
        <div className="w-[50%] rounded bg-white shadow">
          <div className="shadow-md p-4  flex justify-between items-center">
            <h3 className="font-bold">Resumen de Pedidos</h3>
          </div>
          <div className="mt-3 items-center justify-center p-4 w-full">
            {restData?.orderSummary && (
              <OrdersChart dataChart={restData?.orderSummary} />
            )}
           
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-between gap-4">
        <div className="w-full md:w-[50%] rounded bg-white shadow">
          <div className="shadow-md p-4 flex justify-between items-center">
            <h3 className="font-bold">Estadísticas de Clientes</h3>
          </div>
          <div className="mt-3 flex items-center justify-center p-4 w-full">
            <CustomerStats dataStats={restData?.customerActivity || []} />
          </div>
        </div>
        <div className="w-[50%] rounded bg-white shadow">
          <div className="shadow-md p-4  flex justify-between items-center">
            <h3 className="font-bold">Principales Clientes</h3>
          </div>
          <div className="mt-3 h-full">
            <div className="flex flex-wrap p-4 gap-4">
              {restData?.topCustomers?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-1/4 rounded-lg shadow text-center"
                  >
                    <div className="p-4">
                      <Image
                        src="/placeholder.256x256.png"
                        alt="profil img"
                        className="w-16 rounded-full mx-auto"
                        width={200}
                        height={200}
                      />
                      <p className="font-semibold">{item?.fullName}</p>
                    </div>
                    <p className="text-white p-4 rounded-b-xl bg-blue-500">
                      {item?.totalOrders} pedidos
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 mb-4 rounded-md bg-white ">
        <div className="shadow-md p-4  flex justify-between items-center">
          <h3 className="font-bold">Principales Productos</h3>
        </div>
        <div className="mt-4 p-4">
          <ProductCard isWishlisted={false} data={products} />
        </div>
      </div>
    </div>
  );
};

export default Page;
