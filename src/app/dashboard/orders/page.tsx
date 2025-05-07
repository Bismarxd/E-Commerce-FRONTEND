"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import DynamicTable from '@/components/Dashboard/Components/CustomTable';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { axiosInstance } from '@/lib/axiosInstance';
import { FiEye } from 'react-icons/fi';
import { Order, TableData } from '@/types/types';


  const columns = [
    { key: 'orderId', label: 'ID', width: '150' },
    { key: 'orderType', label: 'TIPO DE PEDIDO', width: '150' },
    { key: 'customer', label: 'CLIENTE', width: '200' },
    { key: 'amount', label: 'CANTIDAD', width: '150' },
    { key: 'date', label: 'FECHA', width: '150' },
    { key: 'status', label: 'ESTADO', width: '150' },
    { key: 'action', label: 'ACCIÓN', width: '150' },
  ];

// interface Order {
//   orderId: string,
//   orderType: string,
//   customer: string,
//   status: string
// }

const Orders = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [orders, setOrders] = useState<TableData[]>([]);


    const fetchOrders = async () => {
      await axiosInstance.get("/orders").then((data) => {
        if(data?.data?.status)
        {

          setOrders(data?.data?.data?.map((item: Order) =>{
            return {
               orderId: item?.orderId, 
               orderType: item?.orderType, 
               customer: item?.userId?.name, 
               amount: item?.total,
               date: item?.orderDate,
               status: item?.orderStatus,
               action: (
                <div className="gap-3">
                  <Link
                    href={`/dashboard/orders/${item?._id}`}
                    as={`/dashboard/orders/${item._id}`}
                  >
                    <button className="text-green-500 bg-green-200 p-2 rounded-xl hover:bg-green-500 hover:text-green-200 m-1">
                      <FiEye /> {/* Icono de "Ver" */}
                    </button>
                  </Link>
        
                 
                </div>
              ),
            }
          }))
        }
      })
    }

    useEffect(()=>{
      fetchOrders()
    },[])
  return (
    <>
      <div className="flex items-center gap-3 mb-4">
        <Link href="/dashboard">Dashboard</Link>
        <MdOutlineKeyboardArrowRight/>
        <Link href="/dashboard/orders">Ordenes</Link>
        
      </div>
        <DynamicTable btnAction={() => setIsDrawerOpen(!isDrawerOpen)} data={orders} columns={columns} title='Ordenes' title2='orden' isBtnNeeded={false}/>;
    
    </>
  )
}

export default Orders