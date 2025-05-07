"use client"
import { useState } from "react"
import Image from "next/image"

const PromotionCards = () => {

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [promotions, setPromotions] = useState([
        {image:"/promotions1.png", alt:"promotion1"},
        {image:"/promotions2.png", alt:"promotion2"},
        {image:"/promotions3.jpeg", alt:"promotion3"},
    ])

  return (
    <div className='xl:container px-2 xl:px-4 mx-auto my-16'>
        <div className="flex lg:flex-nowrap flex-wrap justify-between gap-3 lg:space-x-3 items-center">
            {
                promotions.map((item, index) => (
                    <div key={index} className='w-full lg:w-1/3'>
                        <Image 
                            src={item?.image} 
                            alt={item?.alt} 
                            className='w-full rounded-xl' 
                            width={300} 
                            height={300}/>
                       
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default PromotionCards