"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaCartArrowDown, FaHeart, FaStar } from "react-icons/fa";
import ProductCard from "@/components/ProductCard";
import ProductsTabs from "@/components/ProductsTabs";
import { useParams } from "next/navigation";
import { axiosInstance } from "@/lib/axiosInstance";
import { Product, Variation } from "@/types/types";

import useToast from "@/hooks/useToast";
import Toast from "@/components/CustomToast";

// interface Images {
//   url: string;
//   id: string;
// }

// interface Variations {
//   _id: string;
//   color: string;
//   price: string;
//   quantityAvailable: string;
//   size: string;
//   sku: string;
// }

// interface Product {
//   _id: string;
//   images: [Images];
//   name: string;
//   sellingPrice: string;
//   variations: Variations[];
// }

interface GroupedVariations {
  [color: string]: { size: string; _id: string }[]; // Definir el tipo específico
}

const DbProductDetail = () => {
  const params = useParams();
  const [successToast, setSuccessToast] = useState(true);
  const { message, isVisible, showToast } = useToast();
  const [product, setProduct] = useState<Product>();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [variationId, setVariationId] = useState("");
  const fetchProducts = async () => {
    await axiosInstance.get("/products").then((data) => {
      if (data?.data?.status) {
        setProducts(data?.data?.data);
      }
    });
  }
  const fetchProduct = async () => {
    await axiosInstance.get(`/product/${params?.slug}/byslug`).then((data) => {
      if (data?.data?.status) {
        console.log(data?.data?.data)
        setProduct(data?.data?.data);
        setSelectedImage(data?.data?.data.images?.[0]?.url);
      }
    });
  };

  useEffect(() => {
    fetchProduct();
    fetchProducts();
  }, []);

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };
  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const addToWishList = async () => {
    try {
      const response = await axiosInstance.post("/wishlist", {
        productId: product?._id,
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
      showToast(
        "Hubo un error al añadir el producto a la lista de deseos",
        3000
      );
    }
  };

  // Agrupar las variaciones por color
  const groupByColor = (variations: Variation[]) => {
    return variations.reduce((acc: GroupedVariations, variation) => {
      const { color, size, _id } = variation;
      if (!acc[color]) {
        acc[color] = [];
      }
      if (!acc[color].some(v => v.size === size))  {
        acc[color].push({ size, _id });
      }
      return acc;
    }, {});
  };

  const groupedVariations = product?.variations
    ? groupByColor(product.variations)
    : {};


  const addToCart = async () => {
    if(variationId==="")
      {
        setSuccessToast(false);
        showToast("Elige un Color y Tamaño", 3000);
        return false;
      }
    axiosInstance.post("/cart", {productId: product?._id, quantity: quantity, variationId: variationId}).then((data) => {
      if(data?.data?.status){
        setSuccessToast(true);
        showToast("Añadido al Carrito", 3000);
      }
    })
  }

  return (
    <div className="xl:container mx-auto px-2 xl:px-4 py-12">
      {isVisible && message && (
        <Toast
          message={message}
          type={successToast ? "success" : "error"}
          onClose={() => showToast("", 0)} 
        />
      )}
      <div className="text-sm flex items-start text-gray-500 mb-4">
        <Link href={"/products"}>Productos</Link> <MdOutlineKeyboardArrowRight />
        <Link href={"/"}>{product?.name}</Link> <MdOutlineKeyboardArrowRight />

      </div>

      <div className="flex flex-col md:flex-row space-x-8">
        <div className="w-full md:w-1/2">
          {selectedImage && (
            <Image
              src={selectedImage}
              className="mb-3 w-full h-[400px] aspect-square object-cover"
              alt="product image"
              width={500}
              height={500}
            />
          )}
          <Slider {...settings}>
            {product?.images?.map((item) => {
              return (
                <div
                  onClick={() => setSelectedImage(`${item?.url}`)}
                  key={item._id}
                  className="w-1/4 flex flex-row "
                >
                  <Image
                    src={`${item?.url}`}
                    className="border-2 rounded-md object-cover cursor-pointer object-fill h-full"
                    alt="product image"
                    height={150}
                    width={150}
                  />
                </div>
              );
            })}
          </Slider>
        </div>

        <div className="md:w-full">
          <h1 className="text-3xl">{product?.name}</h1>
          <p className="text-xl text-gray-700 mb-2">
            {product?.sellingPrice} Bs.
          </p>
          <div className="flex items-center mb-4">
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
          </div>
          <div className="mb-4 flex items-center flex-wrap gap-3">
            <span className="font-bold">Color(es):</span>
            {Object.keys(groupedVariations).map((color, index) => {
              return (
                <div key={index} className="flex flex-col items-center">
                  <button
                    className={`ms-2 w-8 h-8 border rounded-full transition-all
            ${
              color === selectedColor
                ? "border-4 border-[#4b9cd3] shadow-md"
                : "border-2 border-gray-300"
            }`} // Borde y sombra al seleccionar el color
                    style={{ backgroundColor: color }}
                    onClick={() =>
                      setSelectedColor(color === selectedColor ? null : color)
                    } // Cambiar el color seleccionado
                  ></button>
                </div>
              );
            })}
          </div>

          {/* Mostrar tamaños disponibles solo cuando un color es seleccionado */}
          {selectedColor && (
            <div className="mb-4 flex items-center flex-wrap gap-3">
              <span className="font-bold">Tamaño(s) disponible(s):</span>
              {groupedVariations[selectedColor]
                ?.sort((a, b) => {
                  const order = ["S", "M", "L"];
                  return order.indexOf(a.size) - order.indexOf(b.size);
                })
                .map((variation, sizeIndex) => (
                  <button
                    onClick={() => {
                      setSelectedSize(variation.size); // Establecer el tamaño seleccionado
                      setVariationId(variation._id); // Establecer el ID de la variación (SKU o _id)
                    }}
                    key={sizeIndex}
                    className={`
            ms-2 text-sm border rounded-full text-gray-700 bg-[#f7f7fc] transition-all flex items-center justify-center
            ${variation.size === "S" ? "w-8 h-8" : ""}
            ${variation.size === "M" ? "w-10 h-10" : ""}
            ${variation.size === "L" ? "w-12 h-12" : ""}
            ${
              selectedSize === variation.size ? "bg-blue-500 text-white" : ""
            }  // Cambiar estilo si es el tamaño seleccionado
          `}
                    title={variation.size}
                  >
                    <span className="block w-full text-center text-xs">
                      {variation.size}
                    </span>
                  </button>
                ))}
            </div>
          )}

          <div className="mb-4">
            <span className="font-bold">Cantidad</span>
            <div className="inline-flex items-center ms-2">
              <button
                onClick={handleDecrease}
                className="bg-[#f7f7fc] px-2 py-0 rounded-l"
              >
                -
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-12 text-center border-t border-b"
              />
              <button
                onClick={handleIncrease}
                className="bg-[#f7f7fc] px-2 py-0 rounded-l"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex space-x-4">
            <button onClick={addToCart} className="flex text-white bg-[#94a3b8] hover:bg-[#6e89af] items-center px-4 py-2 border rounded-3xl">
              <FaCartArrowDown />
              Añadir al Carrito
            </button>
            <button
              onClick={addToWishList}
              className="flex items-center px-4 py-2 border rounded-3xl"
            >
              <FaHeart />
              Favorito
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5">
        {product && (
          <ProductsTabs data={product} />
        )}
      </div>

      <div className="my-5">
        <h2 className="text-4xl font-bold">Productos Relacionados</h2>
      </div>
      <ProductCard isWishlisted={false} data={products} />
    </div>
  );
};

export default DbProductDetail;
