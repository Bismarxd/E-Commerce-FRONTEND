"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import ProductCard from "@/components/ProductCard";
import ProductFilter from "@/components/ProductFilter";
import { axiosInstance } from "@/lib/axiosInstance";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types/types";

// ✅ Tipo estricto del producto
// interface Product {
//   _id: string;
//   name: string;
//   sku: string;
//   slug?: string;
//   category: string;
//   barcode: string;
//   price: number;
//   image: string;
//   stock: number;
// }

// ✅ Tipo estricto para los filtros (ajusta según tus filtros reales)
interface ProductFilters {
  subcategory?: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  stockAvailable?: boolean;
}

const PRODUCTS_PER_PAGE = 1;

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductFilters>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const params = useSearchParams();

  // Extraer subcategoría de la URL
  useEffect(() => {
    const subcategory = params.toString()?.split("=")?.[1];
    setFilteredProducts((prev) => ({ ...prev, subcategory }));
    setCurrentPage(1);
  }, [params.toString()]);

  // ✅ Tipar la respuesta de Axios
  interface ProductResponse {
    status: boolean;
    data: Product[];
  }

  const fetchProducts = async (): Promise<void> => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get<ProductResponse>("/products", {
        params: filteredProducts,
      });

      if (data.status) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filteredProducts]);

  useEffect(() => {
    const total = Math.ceil(products.length / PRODUCTS_PER_PAGE);
    setTotalPages(total);
  }, [products]);

  const handleFilterChange = (newFilters: ProductFilters) => {
    setFilteredProducts(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilteredProducts({});
    setCurrentPage(1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="xl:container mx-auto px-2 xl:px-4 py-2">
      <div className="flex items-center space-x-3">
        <p>Inicio</p> <MdOutlineKeyboardArrowRight /> <p>Productos</p>
      </div>

      <div className="flex items-center justify-between gap-3 mt-2">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold mb-0">
            Mostrar Todos los Productos
          </h1>
          <span className="text-xl ms-2">
            ({products.length} Productos Encontrados)
          </span>
        </div>
        <div>
          <button
            onClick={handleClearFilters}
            className="bg-orange-600 text-white p-3 rounded-md hover:bg-orange-400"
          >
            Borrar Filtros
          </button>
        </div>
      </div>

      <div className="mt-8 flex space-x-3">
        <div className="w-1/4">
          <ProductFilter
            onFilterChange={handleFilterChange}
            filteredProducts={filteredProducts}
          />
        </div>
        <div className="w-full">
          {loading ? (
            <p className="text-center py-10 text-gray-500">
              Cargando productos...
            </p>
          ) : (
            <>
              <ProductCard isWishlisted={false} data={currentProducts} />

              <div className="flex justify-center mt-8 space-x-2">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                  Anterior
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-2 rounded ${
                        currentPage === pageNum
                          ? "bg-orange-600 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                )}

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                  Siguiente
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
