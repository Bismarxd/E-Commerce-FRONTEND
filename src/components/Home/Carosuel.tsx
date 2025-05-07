"use client"
import React from 'react'
import Image from 'next/image';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carosuel = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,  // Habilitar cambio automático
        autoplaySpeed: 3000, 
      };

      const slides = [
        {image: "/banner1.png", alt: "slider 1"},
        {image: "/banner2.jpg", alt: "slider 2"},
        {image: "/banner3.png", alt: "slider 3"},
      ]

  return (
    <div className='banner xl:container mx-auto overflow-hidden px-2 xl:px-4 my-4'>
        <Slider {...settings}>
          {slides.map((item, index) => (
            <div className='h-[300px] lg:h-[400px]' key={index}>
              <Image src={item?.image} alt={item?.alt} className='w-full h-full rounded-md'width={500} height={500}/>
            </div>
          ))}
        </Slider>
    </div>
  )
}

export default Carosuel