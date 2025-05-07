"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import DynamicTable from "@/components/Dashboard/Components/CustomTable";
import CategoryForm from "@/components/Dashboard/Category/CategoryForm";
import { FiEdit, FiTrash } from "react-icons/fi";
import { axiosInstance } from "@/lib/axiosInstance";
import Swal from 'sweetalert2'

interface Categories {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  status: string;
  action: ReactNode;
  [key: string]: string | number | ReactNode;
}

const columns = [
  { key: "id", label: "ID", width: "30" },
  { key: "category", label: "CATEGORIA", width: "200" },
  { key: "subcategory", label: "PRECIO DE COMPRA", width: "150" },
  { key: "status", label: "ESTADO", width: "100" },
  { key: "action", label: "ACCIÓN", width: "200" },
];

const ProductCategories = () => {
 
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [categories, setCategories] = useState<Categories[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [category, setCategory] = useState<any>();

  const fetchProducts = async () => {
    await axiosInstance.get("/categories").then((data) => {
      if (data?.data?.data) {
        setCategories(data?.data?.data);
      }
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteCategory = async (id: React.ReactNode) => {
    // Primero muestra la confirmación con SweetAlert
    Swal.fire({
      title: "¿Está seguro que desea eliminar?",
      text: "¡Esta acción es irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, estoy seguro!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, entonces realiza la eliminación
        try {
          const data = await axiosInstance.delete(`/categories/${id}`);
          if (data?.data?.status) {
           
            fetchProducts(); // Actualiza la lista de categorías después de eliminar
            Swal.fire({
              title: "¡Eliminado!",
              text: "La categoría fue eliminada correctamente.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Error",
              text: "No se pudo eliminar la categoría.",
              icon: "error",
            });
          }
        } catch (error) {
          console.log(error)
          Swal.fire({
            title: "Error",
            text: "Ocurrió un error al eliminar la categoría.",
            icon: "error",
          });
        }
      }
    });
  };
  

  const editCategory = async (id: React.ReactNode) => {
    axiosInstance.get(`/categories/${id}`).then((data) => {
      if (data?.data?.status) {
        setCategory(data?.data?.data);
        setIsDrawerOpen(true);
      }
    });
  };

  const data = categories.map((item, index) => {
    return {
      id: index + 1,
      category:
        item.category === "Men"
          ? "Hombres"
          : item.category === "Women"
          ? "Mujeres"
          : "Niños",
      subcategory: item.subcategory,
      status: item.status === "Active" ? "Activo" : "Inactivo",
      action: (
        <div className="gap-3">
          <Link href="void:0" onClick={() => editCategory(item?._id)}>
            <button className="text-blue-500 bg-blue-200 p-2 rounded-xl hover:bg-blue-500 hover:text-blue-200 m-1">
              <FiEdit /> {/* Icono de "Editar" */}
            </button>
          </Link>

          <Link href="void:0" onClick={() => deleteCategory(item?._id)}>
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
          setIsDrawerOpen(!isDrawerOpen)
          setCategory([])
        }}
        data={data}
        columns={columns}
        title="Categorias"
        title2="Categoria"
      />
      ;
      <CategoryForm
        fetchProducts={fetchProducts}
        data={category}
        open={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </>
  );
};

export default ProductCategories;
