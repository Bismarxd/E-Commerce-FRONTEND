"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import OrderDetails from '@/components/Dashboard/Orders/OrderDetails';
import { axiosInstance } from '@/lib/axiosInstance'; 
import { useParams } from 'next/navigation';
import { Order } from '@/types/types';

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
  const params= useParams();
  const [order, setOrder] = useState<Order | null>(null);

  const slug = params.slug as string[];

  const fetchOrder = async () => {
    await axiosInstance.get(`/order/${slug[0]}`).then((data) => {
      if (data?.data?.status) {
        setOrder(data?.data?.data);
      }
    });
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
      <div className="flex items-center gap-3 mb-4">
        <Link href="/dashboard">Dashboard</Link>
        <MdOutlineKeyboardArrowRight />
        <Link href="/dashboard/orders">Ordenes</Link>
        <MdOutlineKeyboardArrowRight />
        <span>Ver</span>
      </div>

      <div className="mt-4">
        <OrderDetails fetchOrder={fetchOrder} {...orderData} />
      </div>
    </>
  );
};

export default OrderView;
