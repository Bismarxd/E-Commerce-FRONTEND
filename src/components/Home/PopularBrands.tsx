"use client"
import React, {useEffect, useRef, useState} from 'react'
import Image from 'next/image';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { axiosInstance } from '@/lib/axiosInstance';

interface Image{
  url: string,
  id: string
}
interface BrandsProps {
  name: string,
  image: Image
}
const PopularBrands = () => {
  const [brands, setBrands] = useState([])
  const fetchBrands = async ()=> {
    axiosInstance.get("/brands").then((data)=> {
      if(data?.data?.status){
        setBrands(data?.data?.data)
      }
    })
  }
  useEffect(()=>{
    fetchBrands()
  },[])

  const sliderRef:React.RefObject<Slider | null> = useRef(null)
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
    <div className='xl:container px-2 xl:px-4 mx-auto mt-10'>
        <div className="flex justify-between items-center">
            <h3 className='text-2xl lg:text-4xl font-bold'>Marcas Populares</h3>
              <div className="flex items-center gap-3">
                  <button onClick={() => sliderRef.current?.slickPrev()} className='bg-gray-200 w-8 lg:w-10 h-10 rounded-full px-2 py-1'>
                      <MdKeyboardArrowLeft size={25}/>
                  </button>
                  <button onClick={() => sliderRef.current?.slickNext()}  className='bg-gray-200 w-8 lg:w-10 h-10 rounded-full px-2 py-1'>
                      <MdKeyboardArrowRight size={25}/>
                  </button>
              </div>
        </div>

        <div className="mt-5 overflow-hidden">
            <Slider ref={sliderRef} {...settings}>
                {brands.map((item: BrandsProps, index) => (
                  <div key={index}  className='mt-5 p-1'>
                      <div className='p-4 flex flex-col justify-center items-center shadow-md mx-3 bg-white'>
                        <Image 
                            src={item?.image?.url} 
                            alt={item?.name} 
                            className='lg:w-full block aspect-square h-50 w-50  lg:p-4 lg:mb-3' 
                            width={500} 
                            height={500}
                        />
                        <h5 className='text-center font-bold'>{item?.name}</h5>    
                    </div>
                  </div>
                    
                ))}
            </Slider>
        </div>
    </div>
  )
}

export default PopularBrands