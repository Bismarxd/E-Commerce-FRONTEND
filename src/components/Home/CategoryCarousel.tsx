"use client"
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { axiosInstance } from '@/lib/axiosInstance';

interface Image{
  url: string,
  id: string
}
interface CategoryProps {
  subcategory: string,
  image: Image
}

const CategoryCarousel = () => {
    const [categories, setCategories] = useState([])
    const sliderRef:React.RefObject<Slider | null> = useRef(null)

    const fetchCategories= async ()=> {
       axiosInstance.get("/categories").then((data)=> {
         if(data?.data?.status){
           setCategories(data?.data?.data)
         }
       })
     }
     useEffect(()=>{
      fetchCategories()
     },[])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
      };



  return (
    <div className='xl:container category-carousel mx-auto overflow-hidden px-2 xl:px-4 mt-10'>
        <div className='flex justify-between'>
            <h3 className='text-md lg:text-4xl font-bold'>Buscar por Categoria</h3>
            <div className="flex items-center gap-3">
                <button onClick={() => sliderRef.current?.slickPrev()} className='bg-gray-200 w-8 lg:w-10 h-10 rounded-full px-2 py-1'>
                    <MdKeyboardArrowLeft size={25}/>
                </button>
                <button onClick={() => sliderRef.current?.slickNext()}  className='bg-gray-200 w-8 lg:w-10 h-10 rounded-full px-2 py-1'>
                    <MdKeyboardArrowRight size={25}/>
                </button>
            </div>
        </div>
            <div className="mt-5 ">
                <Slider ref={sliderRef} {...settings}>
                    {categories.map((item:CategoryProps, index) => (
                        <div key={index} className='flex pe-3 justify-center items-center gap-3 rounded-t-md hover: cursor-pointer'>
                            <Image 
                                src={item?.image?.url} 
                                alt={item?.subcategory} 
                                className='rounded-tl-md rounded-tr-md h-52 w-52' 
                                width={500} 
                                height={500}
                            />
                            <h5 className='text-center font-bold mt-3'>{item?.subcategory}</h5>    
                        </div>
                    ))}
                </Slider>
            </div>
    </div>
  )
}

export default CategoryCarousel