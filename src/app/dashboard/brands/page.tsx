"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import DynamicTable from "@/components/Dashboard/Components/CustomTable";
import { FiEdit, FiTrash } from "react-icons/fi";
import { axiosInstance } from "@/lib/axiosInstance";
import BrandForm from "@/components/Dashboard/Brands/BrandForm";
import Swal from 'sweetalert2'

interface BrandItem {
  _id: string;
  name: string;
  status: string;
  image?: {
    id: string;
  };
}

interface Brands {
  id: number;
  brand: string;
  status: string;
  action: ReactNode;

  [key: string]: string | number | ReactNode | null;
}

const columns = [
  { key: "id", label: "ID", width: "30" },
  { key: "brand", label: "NOMBRE", width: "200" },
  { key: "status", label: "ESTADO", width: "100" },
  { key: "action", label: "ACCIÓN", width: "200" },
];

const ProductBrands = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [brands, setBrands] = useState<Brands[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [brand, setBrand] = useState<any>();

  const fetchProducts = async () => {
    await axiosInstance.get("/brands").then((data) => {
      if (data?.data?.data) {
        setBrands(data?.data?.data);
      }
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteBrand = async (item: BrandItem) => {
    // Primero eliminamos la marca
    axiosInstance.delete(`/brands/${item?._id}`).then((data) => {
      if (data?.data?.status) {
        // Luego eliminamos la imagen asociada
        Swal.fire({
          title: "¿Estás seguro?",
          text: "Esta acción eliminará permanentemente la marca y la imagen asociada.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, eliminar",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            axiosInstance
              .delete(`/delete/${item?.image?.id}`)
              .then((data) => {
                if (data?.data?.status) {
                  Swal.fire({
                    title: "¡Eliminado!",
                    text: "La marca fue eliminada correctamente.",
                    icon: "success",
                  });
                  fetchProducts(); // Recargamos los productos
                }
              })
              .catch((error) => {
                console.error(
                  "Error eliminando imagen:",
                  error.response ? error.response.data : error.message
                );
                Swal.fire({
                  title: "Error",
                  text: "Hubo un problema al eliminar la imagen.",
                  icon: "error",
                });
              });
          }
        });
      }
    }).catch((error) => {
      console.error("Error eliminando marca:", error.response ? error.response.data : error.message);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al eliminar la marca.",
        icon: "error",
      });
    });
  };

  const editCategory = async (id: React.ReactNode) => {
    axiosInstance.get(`/brands/${id}`).then((data) => {
      if (data?.data?.status) {
        setBrand(data?.data?.data);
        setIsDrawerOpen(true);
      }
    });
  };

  const data = brands.map((item, index) => {
    return {
      id: index + 1,
      brand: item.name,
      status: item.status === "Active" ? "Activo" : "Inactivo",
      action: (
        <div className="gap-3">
          <Link href="void:0" onClick={() => editCategory(item?._id)}>
            <button className="text-blue-500 bg-blue-200 p-2 rounded-xl hover:bg-blue-500 hover:text-blue-200 m-1">
              <FiEdit /> {/* Icono de "Editar" */}
            </button>
          </Link>

          <Link
            href="void:0"
            // @ts-expect-error Item type may not have _id or image properties due to incorrect typing.
            onClick={() => deleteBrand(item)}
          >
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
          setBrand([]);
        }}
        data={data}
        columns={columns}
        title="Marcas"
        title2="Marca"
      />
      ;
      <BrandForm
        fetchProducts={fetchProducts}
        data={brand}
        open={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </>
  );
};

export default ProductBrands;
