import React, { useState } from 'react'
import Image from 'next/image'
import { FaInfoCircle, FaStar, FaTruck, FaVideo } from 'react-icons/fa'
import { Product, Video } from '@/types/types'

interface ProductsTabsProps {
  data: Product
}


const ProductsTabs: React.FC<ProductsTabsProps> = ({data}) => {
    const [activeTab, setActiveTab] = useState<string>("Detalles")
    const handleTabCLick = (tab:string) => {
        setActiveTab(tab)
    }
  return (
    <div className="border rounded-b-3xl rounded-t-3xl">
      <div className="flex tabs-container mb-4 p-4 overflow-x-auto flex-nowrap">
        {[
          { name: "Detalles", icon: <FaInfoCircle /> },
          { name: "Videos", icon: <FaVideo /> },
          { name: "Reseñas", icon: <FaStar /> },
          { name: "Envios y Devoluciones", icon: <FaTruck /> },
        ].map((tab) => (
          <div
            className={`${
              activeTab === tab.name
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-800"
            } tab px-4 py-2 border rounded-3xl mr-2 cursor-pointer whitespace-nowrap flex items-center space-x-2`}
            key={tab.name}
            onClick={() => handleTabCLick(tab.name)}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </div>
        ))}
      </div>
      <div className="tab-content border p-6 rounded-b-3xl">
        {activeTab === "Detalles" && (
          <div>
            <h2 className="text-xl md:text-3xl font-bold">Detalles del producto</h2>
            <p className="mb-4"  dangerouslySetInnerHTML={{ __html: data?.description}}>
             
            </p>
           
          </div>
        )}
        {activeTab === "Videos" && (
          <div>
            <h2 className="text-xl md:text-3xl font-bold">Videos relacionados</h2>
            {data?.videos?.length ? 
            <div className='grid grid-cols-1 md:grid-cols-2'>
              {data?.videos?.map((item: Video) => {
                return <div key={item._id}>
                  <iframe style={{width:"100%",height:"300px"}} src={item?.videoLink} frameBorder="0"></iframe>
                </div>
              })}
            </div>: <Image src='/no video.png' className='block mx-auto' width={200} height={200} alt=""/> }
          </div>
        )}
        {activeTab === "Reseñas" && (
          <div>
            <h2 className="text-xl md:text-3xl font-bold">Reseñas del producto</h2>
          </div>
        )}
        {activeTab === "Envios y Devoluciones" && (
          <div>
            <h2 className="text-xl md:text-3xl font-bold mb-4">
              Envíos y devoluciones del producto
            </h2>
            <div dangerouslySetInnerHTML={{__html:data?.shippingReturn?.shippingReturnPolicy || ""}}></div>
          </div>
        )}

      </div>
    </div>
  );
}

export default ProductsTabs