"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import DynamicTable from '@/components/Dashboard/Components/CustomTable';

const orders = [
    { orderId: 1, orderType: 'Delivery', customer: 'Will Smith', status: 'Pendiente', action: <Link href={'/order/1'}>Ver</Link> },
    { orderId: 2, orderType: 'Delivery', customer: 'John Doe', status: 'Entregado', action: <Link href={'/order/2'}>Ver</Link> },
    { orderId: 3, orderType: 'Pickup', customer: 'Jane Doe', status: 'Pendiente', action: <Link href={'/order/3'}>Ver</Link> },
    { orderId: 4, orderType: 'Delivery', customer: 'Tom Hanks', status: 'Entregado', action: <Link href={'/order/4'}>Ver</Link> },
    { orderId: 5, orderType: 'Delivery', customer: 'Emma Watson', status: 'Pendiente', action: <Link href={'/order/5'}>Ver</Link> },
    { orderId: 6, orderType: 'Pickup', customer: 'Chris Hemsworth', status: 'En Progreso', action: <Link href={'/order/6'}>Ver</Link> },
  ];
  
  const columns = [
    { key: 'orderId', label: 'ID', width: '150' },
    { key: 'orderType', label: 'TIPO DE PEDIDO', width: '150' },
    { key: 'customer', label: 'CLIENTE', width: '200' },
    { key: 'status', label: 'ESTADO', width: '150' },
    { key: 'action', label: 'ACCIÓN', width: '150' },
  ];

const OrdersReturn   = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <>
        <DynamicTable btnAction={() => setIsDrawerOpen(!isDrawerOpen)} data={orders} columns={columns} title='Pedidos de Devoluciones' title2='' isBtnNeeded={false}/>;
    </>
  )
}

export default OrdersReturn