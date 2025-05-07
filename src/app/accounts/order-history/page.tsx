"use client";
import { axiosInstance } from "@/lib/axiosInstance";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { Order } from "@/types/types";

const OrderHistory = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [ordersData, setOrdersData] = useState<Order[]>([]);

  const getOrders = async () => {
    axiosInstance.get("/userOrders").then((data) => {
      if (data?.data?.status) {
        setOrdersData(data?.data?.data);
      }
    });
  };

  useEffect(() => {
    getOrders();
  }, []);

  const cancelOrder = async (id?: string) => {
    await axiosInstance
      .put(`/order/${id}`, { orderStatus: "Cancelled" })
      .then((data) => {
        if (data?.data?.status) {
          alert("Orden Cancelada");
          getOrders();
        }
      });
  };
  return (
    <div className="flex flex-col md:flex-row p-4">
      {/* Order History Table */}
      <div className="w-full md:w-[90%] md:h-[80%] bg-white p-4 rounded-lg shadow-md mt-4 md:mt-0 md:ml-4">
        <h2 className="text-2xl font-semibold text-red-500 mb-4">
          Pedidos de Devolución
        </h2>
        <table className="w-full text-left">
          <thead>
            <tr>
              {[
                "ID de pedido",
                "Productos",
                "Estado",
                "Pago",
                "Cantidad",
                "Acción",
              ].map((header) => (
                <th key={header} className="py-2">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ordersData.map((order) => (
              <tr key={order.orderId} className="border-t">
                <td className="py-2">
                  <div>{order.orderId}</div>
                  <div className="text-gray-500 text-sm">{order.date}</div>
                </td>
                <td className="py-2">{order.items?.length}Productos</td>
                <td className="py-2">
                  <span
                    className={`px-2 py-1 rounded-full ${
                      order.orderStatus === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
                <td className="py-2">
                  <span
                    className={`px-2 py-1 rounded-full ${
                      order.refundStatus === "Pending"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {order.refundStatus}
                  </span>
                </td>
                <td className="py-2">{order.subtotal}</td>
                <td className="py-2 relative">
                  <button
                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                    onClick={() =>
                      setOpenMenu(openMenu === order._id ? null : order._id ?? null)
                    }
                  >
                    <FaEllipsisH />
                  </button>
                  {openMenu === order._id && (
                    <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 z-40">
                      <Link
                        href={`/accounts/order-history/${order?._id}`}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Ver Detalles
                      </Link>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          cancelOrder(order?._id);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Cancelar Orden
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 text-gray-600">
          Mostrando 1 a {ordersData?.length} de {ordersData?.length} resultados
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
