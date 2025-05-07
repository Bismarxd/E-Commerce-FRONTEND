"use client";
import { axiosInstance } from "@/lib/axiosInstance";
import { useState, JSX, useEffect } from "react";
import { FaShoppingBag, FaCheckCircle, FaUndoAlt } from "react-icons/fa";
import { Order } from "@/types/types";

interface OverviewCardProps {
  icon: JSX.Element;
  value: string | number;
  label: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ icon, value, label }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-gray-600 mt-2">{label}</div>
    </div>
  );
};

const Overview = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrder = async () => {
    axiosInstance.get("/userOrders").then((data) => {
      if (data?.data?.status) {
        setOrders(data?.data?.data);
      }
    });
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div>
      <div>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-red-600">Resumen</h1>
          <p className="text-lg mt-2">¡Bienvenido de nuevo, Will Smith!</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <OverviewCard
              icon={<FaShoppingBag className="text-pink-600" />}
              value={orders?.length}
              label="Total de Pedidos"
            />
            <OverviewCard
              icon={<FaCheckCircle className="text-orange-600" />}
              value={
                orders?.filter((item) => item?.orderStatus === "Entregado")
                  .length
              }
              label="Pedidos Completados"
            />
            <OverviewCard
              icon={<FaUndoAlt className="text-purple-600" />}
              value={
                orders?.filter((item) => item?.orderStatus === "Devuelto")
                  .length
              }
              label="Pedidos Devueltos"
            />
          </div>
        </div>
      </div>

      {/* <div className="flex flex-col md:flex-row p-4">
       
        <div className="w-full md:w-[90%] md:h-[80%] bg-white p-4 rounded-lg shadow-md mt-4 md:mt-0 md:ml-4">
          <h2 className="text-2xl font-semibold text-red-500 mb-4">
            Historial de Pedidos
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
              {orders.map((order, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2">
                    <div>{order._id}</div>
                    <div className="text-gray-500 text-sm">{order.date}</div>
                  </td>
                  <td className="py-2">{order.products}</td>
                  <td className="py-2">
                    <span
                      className={`px-2 py-1 rounded-full ${
                        order.status === "Pendiente"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2">
                    <span
                      className={`px-2 py-1 rounded-full ${
                        order.payment === "No Pagado"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {order.payment}
                    </span>
                  </td>
                  <td className="py-2">{order.amount}</td>
                  <td className="py-2 relative">
                    <button
                      className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                      onClick={() =>
                        setOpenMenu(openMenu === order.id ? null : order.id)
                      }
                    >
                      <FaEllipsisH />
                    </button>
                    {openMenu === order.id && (
                      <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 z-40">
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                          View Details
                        </button>
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                          Cancel Order
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-gray-600">
            Mostrando 1 a {orders.length} de {orders.length} resultados
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Overview;
