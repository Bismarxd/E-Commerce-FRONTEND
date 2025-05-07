"use client"
import ProductCard from '@/components/ProductCard'
import { axiosInstance } from '@/lib/axiosInstance'
import React, {useEffect, useState} from 'react'

const Offers = () => {

 

  const [flashSaleProducts, setFlashSaleProducts] = useState([])
   const fetchFlashSaleProducts = async () => {
      await axiosInstance.get("/products/flash-sale").then((data)=> {
        if(data?.data?.status)
        {
          setFlashSaleProducts(data?.data?.data)
        }
      })
  
     
    }
  
    useEffect(()=>{
      fetchFlashSaleProducts()
    },[])

    console.log(flashSaleProducts)

  return (
    <div className='xl:container px-2 xl:px-4 py-12 mx-auto'>
      <div className="flex items-center">
        <h1 className='text-xl md:text-4xl font-bold mb-0'>Ofertas de Productos</h1>
        <span className='text-xl ms-2 relative top-[5px]'>
          ({flashSaleProducts?.length} Producto(s) Encontrados)
        </span>
      </div>
      <div className="mt-5">
        <ProductCard isWishlisted={false} data={flashSaleProducts}/>
      </div>
    </div>
  )
}

export default Offers