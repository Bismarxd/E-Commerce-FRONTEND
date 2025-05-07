import { axiosInstance } from "@/lib/axiosInstance";
import React from "react";
import Image from "next/image";
import { FaRegTimesCircle, FaCheckCircle } from "react-icons/fa";
import { Order } from "@/types/types";


const statusColors = {
  Pendiente: "bg-red-200 text-red-600",
  Aceptado: "bg-orange-200 text-orange-600",
  Enviado: "bg-blue-200 text-blue-600",
  "En Camino": "bg-yellow-200 text-yellow-600",
  Pagado: "bg-indigo-200 text-indigo-600",
  Entregado: "bg-emerald-200 text-emerald-600",
  Cancelado: "bg-gray-300 text-gray-700",
  Devuelto: "bg-orange-200 text-orange-600",
  Reemboolsado: "bg-purple-200 text-purple-600",
};



const OrderDetails: React.FC<Order> = ({
  orderId,
  from,
  status,
  date,
  paymentType,
  orderType,
  items,
  address,
  tax,
  discount,
  shippingFee,
  subtotal,
  fetchOrder,
}) => {
  // const subtotal = items.reduce((total, item) => total + item.price, 0);
  const total = (subtotal ?? 0) + (tax ?? 0) + (shippingFee ?? 0) - (discount ?? 0);

  const acceptOrder = async () => {
    await axiosInstance
      .put(`/order/${orderId}`, { orderStatus: "Aceptado" })
      .then((data) => {
        if (data?.data?.status) {
          alert("Orden Aceptada");
          fetchOrder();
        }
      });
  };

  const cancelOrder = async () => {
    await axiosInstance
      .put(`/order/${orderId}`, { orderStatus: "Cancelado" })
      .then((data) => {
        if (data?.data?.status) {
          alert("Orden Cancelada");
          fetchOrder();
        }
      });
  };

  const changeOrderStatus = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    await axiosInstance
      .put(`/order/${orderId}`, { orderStatus: e.target.value })
      .then((data) => {
        if (data?.data?.status) {
          alert("Orden Actualizada");
          fetchOrder();
        }
      });
  };

  return (
    <div className="p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Encabezado del pedido */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold">ID de Pedido: #{orderId}</h1>
            <div className="flex items-center space-x-2 mt-2">
              {status && (
               <span
               className={`px-2 py-1 rounded ${
                 statusColors[status] || "bg-gray-200 text-gray-600"
               }`}
             >
               {status}
             </span>
              )}
            </div>

            <p className="text-gray-600 mt-2">{date}</p>
            <p className="text-gray-600">Método de pago: {paymentType}</p>
            <p className="text-gray-600">Tipo de pedido: {orderType}</p>
          </div>
          {from !== "user" && (
            <div className="flex space-x-2">
              {status === "Pendiente" && (
                <button
                  onClick={cancelOrder}
                  className="bg-red-500 text-white px-4 py-2 rounded flex items-center hover:bg-red-800"
                >
                  <FaRegTimesCircle className="mr-2" /> Rechazar
                </button>
              )}
              {status === "Pendiente" && (
                <button
                  onClick={acceptOrder}
                  className="bg-green-500 text-white px-4 py-2 rounded flex items-center hover:bg-green-800"
                >
                  <FaCheckCircle className="mr-2" /> Aceptar
                </button>
              )}

              {status !== "Pendiente" && (
                <select
                  name="orderStatus"
                  className="border rounded-md shadow p-2"
                  onChange={changeOrderStatus}
                >
                   <option value="Pendiente">Pendiente</option>
                   <option value="Aceptado">Aceptado</option>
                   <option value="Enviado">Enviado</option>
                  <option value="Entregado">Entregado</option>
                  <option value="Pagado">Pagado</option>
                  <option value="Cancelado">Cancelado</option>
                  <option value="En Camino">En Camino</option>
                  <option value="Enviado">Enviado</option>
                  <option value="Reemboolsado">Reemboolsado</option>
                </select>
              )}
            </div>
          )}
        </div>

        {/* Detalles del pedido */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Detalles del pedido</h2>
            {items?.map((item, index) => (
              <div className="flex items-center mb-4" key={index}>
                <Image
                  src={item?.productImage}
                  alt={item?.productImage}
                  className="w-12 h-12 rounded mr-4"
                  width={200}
                  height={200}
                />
                <div>
                  <p className="font-semibold">{item?.productName}</p>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-gray-600">Bs.{item?.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Subtotales */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Subtotal</h2>
            <div className="flex justify-between mb-2">
              <p className="text-gray-600">Subtotal</p>
              <p className="text-gray-600">Bs.{subtotal}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p className="text-gray-600">Impuestos</p>
              <p className="text-gray-600">Bs.{tax}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p className="text-gray-600">Descuento</p>
              <p className="text-gray-600">Bs.0</p>
            </div>
            <div className="flex justify-between mb-2">
              <p className="text-gray-600">Costo de envío</p>
              <p className="text-gray-600">Bs.{shippingFee}</p>
            </div>
            <div className="flex justify-between font-semibold">
              <p>Total</p>
              <p>Bs.{total}</p>
            </div>
          </div>
        </div>

        {/* Dirección de envío y facturación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {["Dirección de envío", "Dirección de facturación"].map((title) => (
            <div className="bg-white p-4 rounded-lg shadow-md" key={title}>
              <h2 className="text-xl font-semibold mb-4">{title}</h2>
              <div className="flex items-center mb-2">
                <Image
                  src="/avatar.jpg"
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full mr-4"
                  width={200}
                  height={200}
                />
                <div>
                  <p className="font-semibold">{address.name}</p>
                  <p className="text-gray-600">{address.email}</p>
                  <p className="text-gray-600">{address.phone}</p>
                  <p className="text-gray-600">{address.address}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
