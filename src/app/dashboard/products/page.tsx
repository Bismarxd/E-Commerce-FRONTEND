"use client";
import DynamicTable from "@/components/Dashboard/Components/CustomTable";
import React, { useEffect, useState } from "react";
import { ReactNode } from "react";
import ProductForm from "@/components/Dashboard/Product/ProductForm";
import { axiosInstance } from "@/lib/axiosInstance";
import Link from "next/link";
import { FiEdit, FiEye, FiTrash } from "react-icons/fi";

interface Product {
  id: number;
  name: string;
  category: string;
  buyingPrice: number;
  sellingPrice: number;
  status: string;
  action: ReactNode;
  [key: string]: string | number | ReactNode;
}

const columns = [
  { key: "name", label: "NOMBRE", width: "200" },
  { key: "category", label: "CATEGORIA", width: "200" },
  { key: "buyingPrice", label: "PRECIO DE COMPRA", width: "150" },
  { key: "sellingPrice", label: "PRECIO DE VENTA", width: "150" },
  { key: "status", label: "ESTADO", width: "100" },
  { key: "action", label: "ACCIÓN", width: "200" },
];

const DbProducts: React.FC = () => {

  const [products, setProducts] = useState<Product[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [product, setProduct] = useState<any>("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

 const fetchProducts = async () => {
     await axiosInstance.get("/products").then((data) => {
       if (data?.data?.data) {
         setProducts(data?.data?.data);
       }
     });
   };

   useEffect(() => {
      fetchProducts();
    }, []);
  

  const deleteProduct = async (id: React.ReactNode) => {
    axiosInstance.delete(`/product/${id}`).then((data) => {
      if (data?.data?.status) {
        alert("Producto Eliminado Correctamente");
        fetchProducts();
      }
    });
  };

  const editProduct = async (id: React.ReactNode) => {
    axiosInstance.get(`/product/${id}`).then((data) => {
      if (data?.data?.status) {
        setProduct(data?.data?.data);
        setIsDrawerOpen(true);
      }
    });
    fetchProducts()
  };

  const data = products.map((item, index) => {
    return {
      id: index + 1,
      name: item.name,
      category: item.category,
      buyingPrice: item.buyingPrice,
      sellingPrice: item.sellingPrice,
      status: item.status === "Active" ? "Activo" : "Inactivo",
      action: (
        <div className="gap-3">
          <Link
            href={`/dashboard/products/${item?._id}`}
            as={`/dashboard/products/${item._id}`}
          >
            <button className="text-green-500 bg-green-200 p-2 rounded-xl hover:bg-green-500 hover:text-green-200 m-1">
              <FiEye /> {/* Icono de "Ver" */}
            </button>
          </Link>

          <Link href="void:0" onClick={() => editProduct(item?._id)}>
            <button className="text-blue-500 bg-blue-200 p-2 rounded-xl hover:bg-blue-500 hover:text-blue-200 m-1">
              <FiEdit /> {/* Icono de "Editar" */}
            </button>
          </Link>

          <Link href="void:0" onClick={() => deleteProduct(item?._id)}>
            <button className="text-red-500 bg-red-200 p-2 rounded-xl hover:bg-red-500 hover:text-red-200 m-1">
              <FiTrash /> {/* Icono de "Eliminar" */}
            </button>
          </Link>
        </div>
      ),
    };
  });

  return (
    <>
      <DynamicTable

        btnAction={() => {
          setIsDrawerOpen(!isDrawerOpen);
          setProduct([]);
        }}
        data={data}
        columns={columns}
        title="Productos"
        title2="Producto"
      />
      ;
      <ProductForm
        fetchProducts = {fetchProducts}
        data={product}
        open={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </>
  );
};

export default DbProducts;
