import Link from "next/link";
import React from "react";
import Image from "next/image";
import { FaHeart, FaStar } from "react-icons/fa";
import { Product } from "@/types/types";



interface ProductCardProps {
  data: Product[];
  isWishlisted?: boolean;
  wishListCLick?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  data,
  isWishlisted,
  wishListCLick,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {data?.map((item, index) => (
        <Link
          className="bg-white rounded-lg shadow-md p-2"
          key={index}
          href={`/products/${item?.slug}`}
        >
          <div className="w-full">
            <div className="relative">
              <span className="absolute top-3 left-3 z-10 bg-blue-900 text-white text-xs font-bold px-2 py-1 rounded-full">
                Oferta Flash
              </span>
              <FaHeart
                onClick={(e) => {
                  e.preventDefault();
                  if (wishListCLick) {
                    wishListCLick(item?._id);
                  }
                }}
                className={`absolute top-4 right-4 bg-white p-[10px] rounded-full z-10 ${
                  isWishlisted ? "!text-[#ff4800]" : "text-gray-300"
                }`}
                size={34}
              />
              <div className="overflow-hidden">
                {item?.images?.[0]?.url ? (
                  <div className="w-full h-[300px] relative rounded-md overflow-hidden">
                    <Image
                      src={item.images[0].url}
                      alt={item.name || "Producto"}
                      fill
                      className="object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="w-full h-[400px] flex items-center justify-center bg-gray-200 rounded-md">
                    <span className="text-gray-500">Imagen no disponible</span>
                  </div>
                )}
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{item?.name}</h2>
              <div className="my-2 flex items-center">
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-black">
                  {item?.sellingPrice} Bs.
                </span>
                {/* <span className="text-red-500 line-through ms-2">
                  {item?.buyingPrice}
                </span> */}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductCard;
