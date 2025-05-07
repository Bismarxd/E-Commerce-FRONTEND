"use client";
import { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";

const orders = [
  {
    id: "0110243",
    date: "07.45 PM, 01-10-2024",
    products: "3 Productos",
    status: "Pendiente",
    payment: "No Pagado",
    amount: "Bs.278.00",
  },
  {
    id: "0110242",
    date: "07.45 PM, 01-10-2024",
    products: "4 Productos",
    status: "Entregado",
    payment: "Pagado",
    amount: "Bs.720.00",
  },
  {
    id: "0110241",
    date: "07.45 PM, 01-10-2024",
    products: "4 Productos",
    status: "Entregado",
    payment: "Pagado",
    amount: "Bs.415.20",
  },
];

const ReturnOrders = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
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
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="py-2">
                  <div>{order.id}</div>
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
    </div>
  );
};

export default ReturnOrders;
