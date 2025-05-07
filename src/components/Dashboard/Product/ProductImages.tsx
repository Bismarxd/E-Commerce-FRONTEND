"use client";
import { axiosInstance } from "@/lib/axiosInstance";
import { useParams } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { FaTrash, FaUpload } from "react-icons/fa";
import { Image} from "@/types/types";

interface ProductImagesProps {
  images?: Image[];  // Arreglo de objetos Image, donde cada objeto tiene una URL
  getProducts: () => Promise<void>;
}
const ProductImages: React.FC<ProductImagesProps> = ({
  images,
  getProducts,
}) => {
  const params = useParams();
  const [imagesGet, setImagesGet] = useState<Image[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Efecto para establecer las imágenes obtenidas
  useEffect(() => {
    if (images) {
      setImagesGet(images); // Actualizar el estado con un arreglo de URLs
    }
  }, [images]);

  // Manejar la carga de imágenes
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      // Enviar la imagen usando axios
      axiosInstance
        .post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Imagen cargada exitosamente:", response.data);
          if (response?.data) {
            axiosInstance
              .post(`/product/${params?.slug?.[0]}/images`, {
                imageUrl: response?.data?.url,
                publicId: response?.data?.public_id,
              })
              .then((data) => {
                if (data?.data?.status) {
                  alert("Imagen agregada correctamente");
                  getProducts(); // Actualizar la lista de productos
                } else {
                  alert("Error al agregar imagen");
                }
              });
          }
        })
        .catch((error) => {
          console.error("Error al cargar la imagen:", error);
        });
    }
  };
  // if (event.target.files) {
  //   const uploadedFiles = Array.from(event.target.files);
  //   const imageUrls = uploadedFiles.map((file) => URL.createObjectURL(file));
  //   setImages((prevImages) => [...prevImages, ...imageUrls]);
  // }

  // Manejar la eliminación de una imagen
  const handleImageRemove = (id: string) => {
    // setImagesGet((prevImages) => prevImages.filter((_, i) => i !== index));
    axiosInstance
      .delete(`/product/${params?.slug?.[0]}/images/${id}`)
      .then((data) => {
        if (data?.data?.status) {
          alert("Imagen eliminada correctamente");
          getProducts();
        }
      })
      .catch((error) => {
        console.error(
          "Error eliminando imagen:",
          error.response ? error.response.data : error.message
        );
      });
  };

  // Simular clic en input de archivo
  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-3 items-center justify-start min-h-screen bg-gray-50 p-4">
      {/* Input para subir imágenes */}
      <div
        className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer"
        onClick={handleIconClick}
      >
        <FaUpload size={48} className="text-gray-500" />
        <span className="text-gray-500 mt-2">Subir imágenes</span>
      </div>

      {/* Input oculto para subir imágenes */}
      <input
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Mostrar imágenes subidas */}
      <div className="grid grid-cols-3 gap-4">
        {imagesGet.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image.url}
              alt={`Uploaded ${index + 1}`}
              className="w-24 h-24 object-cover border rounded-md"
            />
            {/* Botón de eliminar con ícono */}
            <button
              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-900"
              onClick={() => handleImageRemove(image._id)}
            >
              <FaTrash size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
