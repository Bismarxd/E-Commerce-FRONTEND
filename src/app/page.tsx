"use client";
import { useEffect, useState } from "react";
import Carosuel from "@/components/Home/Carosuel";
import CategoryCarousel from "@/components/Home/CategoryCarousel";
import 'multi-range-slider-react/lib/multirangeslider.css';
import PopularBrands from "@/components/Home/PopularBrands";
import PromotionCards from "@/components/Home/PromotionCards";
import ProductCard from "@/components/ProductCard";
import { FaHeadset, FaHeart, FaLock, FaShippingFast } from "react-icons/fa";
import { axiosInstance } from "@/lib/axiosInstance";
import useToast from '@/hooks/useToast';
import Toast from '@/components/CustomToast';

export default function Home() {
  const [successToast, setSuccessToast] = useState(true);
  const { message, isVisible, showToast } = useToast();
  const [flashSaleProducts, setFlashSaleProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);

  const fetchFlashSaleProducts = async () => {
    try {
      const [flashSaleRes, latestRes] = await Promise.all([
        axiosInstance.get("/products/flash-sale"),
        axiosInstance.get("/products")
      ]);

      if (flashSaleRes?.data?.status) {
        setFlashSaleProducts(flashSaleRes?.data?.data);
      }

      if (latestRes?.data?.status) {
        setLatestProducts(latestRes?.data?.data);
      }
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  useEffect(() => {
    fetchFlashSaleProducts();
  }, []);

  const addToWishList = async (id: string) => {
    try {
      const response = await axiosInstance.post("/wishlist", { 
        productId: id 
      });

      if (response?.data?.status) {
        setSuccessToast(true);
        showToast("Producto Añadido a Favoritos", 3000);
      } else {
        setSuccessToast(false);
        showToast("El Producto ya fue añadido a Favoritos", 3000);
      }
    } catch (error) {
      console.error(error);
      showToast("Hubo un error al añadir el producto a la lista de deseos", 3000);
    }
  };

  const services = [
    { icon: <FaHeadset size={30} className="text-[#f23e14]"/>, title: "Servicio Profesional", description: "Eficiencia y soporte por un equipo apasionado" },
    { icon: <FaLock size={30} className="text-[#f23e14]"/>, title: "Pago Seguro", description: "Diferentes métodos de pago" },
    { icon: <FaShippingFast size={30} className="text-[#f23e14]"/>, title: "Delivery", description: "Entregas en la puerta de su casa" },
    { icon: <FaHeart size={30} className="text-[#f23e14]"/>, title: "Calidad de servicio", description: "Control de calidad y precios accesibles" }
  ];

  return (
    <div className="mb-8">
      {isVisible && message && (
        <Toast message={message} type={successToast ? "success" : "error"} onClose={() => showToast("", 0)} />
      )}

      <Carosuel/>
      <CategoryCarousel/>
      <PromotionCards/>

      <div className="xl:container px-2 xl:px-4 mt-10 mx-auto">
        <h2 className="text-4xl font-bold m-4">Últimos Productos</h2>
        <ProductCard isWishlisted={false} wishListCLick={addToWishList} data={latestProducts}/>
      </div>

      <div className="xl:container px-2 xl:px-4 mt-10 mx-auto">
        <h2 className="text-4xl font-bold m-4">Ofertas</h2>
        <ProductCard isWishlisted={true} wishListCLick={addToWishList} data={flashSaleProducts}/>
      </div>

      <PopularBrands/>

      <div className="mx-auto xl:container px-2 xl:px-4 mt-10">
        <div className="flex flex-wrap gap-4 md:flex-nowrap justify-center md:justify-between items-center p-8">
          {services.map((item, index) => (
            <div key={index} className="text-center w-full sm:w-1/2 md:w-1/4">
              <div className="flex items-center justify-center mb-3">{item.icon}</div>
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
