"use client";
import React, { useEffect, useState } from "react";
import OrderDetails from "@/components/Dashboard/Orders/OrderDetails";
import { axiosInstance } from "@/lib/axiosInstance";
import { useParams } from "next/navigation";
import { Order } from "@/types/types";


// Función para convertir la fecha y hora en formato adecuado
function formatDateTime(isoString: string): string {
  
  const date = new Date(isoString);

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const time = date.toLocaleTimeString("en-US", options).toUpperCase();
  const formattedDate = date
    .toLocaleDateString("es-BO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");

  return `${time}, ${formattedDate}`;
}


const OrderView = () => {
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  const fetchOrder = async () => {
    const orderId = params?.slug;
    if (orderId) {
      try {
        const response = await axiosInstance.get(`/order/${orderId}`);
        if (response?.data?.status) {
          setOrder(response?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  if (!order) {
    return <div>Loading...</div>; 
  }
  
  const orderData = {
    orderId: order._id,
    status: order.status,
    date: formatDateTime(order.orderDate ?? ""),
    paymentType: order.paymentType,
    orderType: order.orderType,
    items: order.items,
    address: {
      name: order?.shippingAddress?.fullName,
      email: order?.shippingAddress?.email,
      phone: order?.shippingAddress?.phone,
      address: order?.shippingAddress?.streetAddress,
    },
    subtotal: order.subtotal,
    tax: order.tax,
    discount: order.discount,
    shippingFee: order.shippingCharge,
  };

  return (
    <>
      <main className="w-full px-4 pb-6">
        <h2 className="text-2xl font-bold text-blue-500 mb-6">Detalles de la Orden</h2>
        <div className="bg-white rounded-lg shadow-md">
        <OrderDetails from="user" fetchOrder={fetchOrder} {...orderData} />
      </div>
      </main>

     
    </>
  );
};

export default OrderView;
