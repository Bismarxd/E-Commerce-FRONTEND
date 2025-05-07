"use client"
import ProductImages from '@/components/Dashboard/Product/ProductImages';
import ProductInformation from '@/components/Dashboard/Product/ProductInformation';
import ProductOffers from '@/components/Dashboard/Product/ProductOffers';
import ProductSeo from '@/components/Dashboard/Product/ProductSeo';
import ProductVariants from '@/components/Dashboard/Product/ProductVariants';
import ProductVideo from '@/components/Dashboard/Product/ProductVideo';
import ShippingReturns from '@/components/Dashboard/Product/ShippingReturns';
import { axiosInstance } from '@/lib/axiosInstance';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaInfoCircle, FaImage, FaTh, FaEllipsisH } from 'react-icons/fa';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { Product } from '@/types/types';


// Interfaces para los Props de los componentes

interface TabsProps {
  icon: React.ReactNode; // Icono que se va a renderizar
  label: string; // Nombre de la pestaña
  isActive: boolean; // Si la pestaña está activa
  onClick: () => void; // Función para manejar el clic
  children?: React.ReactNode; // Prop para pasar contenido adicional
}

interface DropdownItemProps {
  label: string; // Nombre de la opción del desplegable
  onClick: () => void; // Acción a realizar cuando se haga clic en la opción
}

const Tabs: React.FC<TabsProps> = ({ icon, label, isActive, onClick, children }) => {
  return (
    <div
      className={`flex lg:w-1/4 items-center space-x-2 cursor-pointer px-2 py-2 rounded ${isActive ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
      {children && <div className="ml-2">{children}</div>} {/* Renderizando los children */}
    </div>
  );
};

const DropdownItem: React.FC<DropdownItemProps> = ({ label, onClick }) => {
  return (
    <a
      href="#"
      onClick={onClick}
      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
    >
      {label}
    </a>
  );
};

const DbProductDetail = () => { 
  const [activeTab, setActiveTab] = useState<string>("info");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>()

  const params = useParams()
  const getProducts=async () => {
    axiosInstance.get(`/product/${params?.slug?.[0]}`).then((data) => {
      if (data?.data?.status) {
        setProduct(data?.data?.data);
      }
    });
  }
  useEffect(()=>{
    getProducts()
  },[])


  const handleTabClick = (tab: string): void => {
    setActiveTab(tab);
  };

  const productData:Product = {
    _id: product?._id || '',
    name: product?.name || "",
    sku: product?.sku || "",
    images: product?.images || [],
    category: product?.category || "",
    barcode: product?.barcode || "",
    offers: product?.offers || { discountPercentage: 0, flashSale: "No", startDate: new Date(), endDate: new Date() },
    buyingPrice: product?.buyingPrice || 0,
    sellingPrice: product?.sellingPrice || 0,
    tax: product?.tax || "",
    brand: product?.brand || "",
    status: product?.status ? "Active" : "Inactive",
    canPurchaeAble: product?.canPurchaeAble ? "Yes" : "No",
    showStock: product?.showStock ? "Enable" : "Disable",
    refundable: product?.refundable ? "Yes" : "No",
    maximunPurchaseQuantity: product?.maximunPurchaseQuantity ||   0,
    lowStockQuantityWarning: product?.lowStockQuantityWarning ||  0,
    unit: product?.unit ||  "",
    weight: product?.weight ||  "",
    tags: product?.tags ||  "VAT-5, VAT-6",
    description: product?.description ||  "",
    shippingReturn: product?.shippingReturn,
    seo: product?.seo ? { ...product?.seo, metaImage: product?.seo?.metaImage } : undefined,
  };


  return (
    <>

      <div className="flex items-center gap-3 mb-4">
        <Link href="/dashboard">Dashboard</Link>
        <MdOutlineKeyboardArrowRight/>
        <Link href="/dashoard/products">Productos</Link>
        <MdOutlineKeyboardArrowRight/>
        <span>Ver</span>
      </div>

      <div className="p-4 bg-gray-100 w-full">
      {/* Tab system */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 justify-start lg:justify-between lg:space-x-4 mb-4">
        <Tabs 
          icon={<FaInfoCircle />} 
          label="Información" 
          isActive={activeTab === "info"} 
          onClick={() => handleTabClick("info")}
        >
         
        </Tabs>
        <Tabs 
          icon={<FaImage />} 
          label="Imágenes" 
          isActive={activeTab === "images"} 
          onClick={() => handleTabClick("images")}
        />
        <Tabs 
          icon={<FaTh />} 
          label="Variación" 
          isActive={activeTab === "variation"} 
          onClick={() => handleTabClick("variation")}
        />
        <div className="relative">
          <div
            className="flex items-center space-x-2 bg-white text-gray-700 px-4 py-2 rounded shadow cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <FaEllipsisH /> {/* Ícono "More" usando React Icons */}
            <span>Más</span>
          </div>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
              <DropdownItem label="Ofertas" onClick={() => setActiveTab("Offers")} />
              <DropdownItem label="Videos" onClick={() => setActiveTab("Videos")} />
              <DropdownItem label="Envios y Retornos" onClick={() => setActiveTab("ShippingReturn")} />
              <DropdownItem label="Seo" onClick={() => setActiveTab("Seo")} />
            </div>
          )}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white p-4 rounded shadow mt-4">
       {activeTab==="info" && <ProductInformation product={productData}/>}
       {activeTab==="images" && <ProductImages getProducts={getProducts} images={product?.images}/>}
       {activeTab==="variation" && <ProductVariants/>}
       {activeTab==="Offers" && <ProductOffers offer={product?.offers}/>}
       {activeTab==="ShippingReturn" && <ShippingReturns shippingReturn={product?.shippingReturn}/>}
       {activeTab==="Videos" && <ProductVideo/>}
       {activeTab==="Seo" && <ProductSeo getProducts={getProducts} seo={product?.seo} />}
      </div>
      </div>


    </>
  );
};

export default DbProductDetail;
