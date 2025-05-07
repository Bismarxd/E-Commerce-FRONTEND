"use client";
import ProductCard from "@/components/ProductCard";
import { axiosInstance } from "@/lib/axiosInstance";
import React, { useEffect, useState } from "react";
import { Product } from "@/types/types";

import useToast from "@/hooks/useToast";
import Toast from "@/components/CustomToast";

interface WishlistResponse {
  products: Product[];
}
const WishList = () => {
  const [wishList, setWishlist] = useState<WishlistResponse>({products:[]});
  const [successToast, setSuccessToast] = useState(true);
  const { message, isVisible, showToast } = useToast();

  const fetchWishlist = async () => {
    await axiosInstance.get("/wishlist").then((data) => {
      if (data?.data?.status) {
        setWishlist(data?.data?.data);
      }
    });
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeFromWishList = async (id: string) => {
    await axiosInstance.delete(`wishlist/${id}`).then((data) => {
      if (data?.data?.status) {
        console.log(data?.data);
        fetchWishlist();
        setTimeout(()=>{

        },3000)
      }
    });
  };

  // const router= useRouter()

  const clearwishList = async () => {
    axiosInstance.delete("/wishlist").then((data) => {
      if (data?.data?.status) {
        setSuccessToast(false);
        showToast("Productos Eliminados de Favoritos", 3000);
        fetchWishlist()
      }
    });
  };

  return (
    <div className="xl:container px-2 xl:px-4 py-12 mx-auto">
      {isVisible && message && (
        <Toast
          message={message}
          type={successToast ? "success" : "error"}
          onClose={() => showToast("", 0)} // Cerrar el toast manualmente
        />
      )}
      <div className="flex items-center">
        <h1 className="text-xl md:text-4xl font-bold mb-0">Favoritos</h1>
        <span className="text-xl ms-2 relative top-[5px]">
          ({wishList?.products?.length} Producto(s) Encontrados)
        </span>
      </div>
      <div className="w-full flex justify-end">
        <button
          className="border rounded-md px-3 py-2 bg-orange-500 text-white font-semibold hover:bg-orange-700"
          onClick={clearwishList}
        >
          Borrar
        </button>
      </div>
      <div className="mt-5">
       {wishList?.products?.length ?  <ProductCard
          isWishlisted={true}
          wishListCLick={removeFromWishList}
          data={wishList?.products}
        /> : <div>
          <img src="/lista vacia.png" className="block mx-auto"/>
          <h2 className="text-center font-semibold text-emerald-900">La Lista de Favoritos Esta Vacia</h2>
          </div>}
      </div>
    </div>
  );
};

export default WishList;
