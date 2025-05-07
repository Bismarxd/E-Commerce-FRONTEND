"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import JoditEditor from "jodit-react";
import Image from "next/image";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaImage,
  FaTrash,
} from "react-icons/fa";
import { axiosInstance } from "@/lib/axiosInstance";
import { useParams } from "next/navigation";
import { Seo } from "@/types/types";

interface ProductSeoProps {
  seo?: Seo;
  getProducts: () => Promise<void>;
}

const SEOForm: React.FC<ProductSeoProps> = ({ seo }) => {
  const params = useParams();
  const [description, setDescription] = useState<string>(
    seo?.metaDescription || ""
  );
  const [image, setImage] = useState<string | null>("");
  const [publicId, setPublicId] = useState("");

  useEffect(() => {
    if (seo?.metaImage?.url) {
      setImage(seo?.metaImage?.url);
      setPublicId(seo?.metaImage?._id);
    }
  }, [seo]);
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
          const imageUrl = response.data.url;
          setImage(imageUrl);
          setPublicId(response.data.public_id);
          formik.setFieldValue("metaImage", {
            url: imageUrl,
            id: response.data.public_id,
          });
        })
        .catch((error) => {
          console.error("Error al cargar la imagen:", error);
        });
    }
  };
  // Eliminar imagen cargada
  const handleImageRemove = () => {
    axiosInstance
      .delete(`/delete/${publicId}`)
      .then((data) => {
        if (data?.data?.status) {
          alert("Imagen eliminada correctamente");
          setImage("");
          console.log(formik.values);
          axiosInstance
            .put(`/product/${params?.slug?.[0]}`, {
              seo: { ...formik.values, metaImage: { url: "", id: "" } },
            })
            .then((data) => {
              if (data?.data?.status) {
                alert("SEO actualizado correctamente");
              }
            });
        }
      })
      .catch((error) => {
        console.error(
          "Error eliminando imagen:",
          error.response ? error.response.data : error.message
        );
      });
  };

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      metaTitle: seo?.metaTitle || "",
      metaDescription: description,
      metaKeywords: seo?.metaKeywords || "",
      metaImage: seo?.metaImage || { url: "", id: "" },
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      metaTitle: Yup.string().required("Requerido"),
      metaDescription: Yup.string().required("Requerido"),
      metaKeywords: Yup.string().required("Requerido"),
    }),
    onSubmit: (values) => {
      axiosInstance
        .put(`/product/${params?.slug?.[0]}`, {
          seo: {
            ...values,
            metaImage: values.metaImage, // Garantizar que metaImage sea un objeto con `url` y `id`
          },
        })
        .then((data) => {
          if (data?.data?.status) {
            alert("SEO actualizado correctamente");
          }
        });
    },
  });

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">SEO</h1>
      <form onSubmit={formik.handleSubmit}>
        {/* Título */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Título *
          </label>
          <input
            id="metaTitle"
            name="metaTitle"
            type="text"
            placeholder="Ingrese el título"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formik.values.metaTitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.metaTitle && formik.errors.metaTitle && (
            <div className="text-red-500 text-sm">
              {formik.errors.metaTitle}
            </div>
          )}
        </div>

        {/* Descripción */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Descripción *
          </label>
          <JoditEditor
            value={formik.values.metaDescription}
            onBlur={(content) => {
              setDescription(content);
              formik.setFieldValue("metaDescription", content);
            }}
          />
          {formik.touched.metaDescription && formik.errors.metaDescription && (
            <div className="text-red-500 text-sm">
              {formik.errors.metaDescription}
            </div>
          )}
          <div className="flex items-center mt-2">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 mr-2"
            >
              <FaBold />
            </button>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 mr-2"
            >
              <FaItalic />
            </button>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 mr-2"
            >
              <FaUnderline />
            </button>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 mr-2"
            >
              <FaListUl />
            </button>
          </div>
        </div>

        {/* Meta Palabra Clave */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="metaKeyword"
          >
            Palabra clave *
          </label>
          <input
            id="metaKeyword"
            name="metaKeywords"
            type="text"
            placeholder="Ingrese palabras clave"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formik.values.metaKeywords}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.metaKeywords && formik.errors.metaKeywords && (
            <div className="text-red-500 text-sm">
              {formik.errors.metaKeywords}
            </div>
          )}
        </div>

        {/* Cargar Imagen */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="metaImage"
          >
            Imagen
          </label>
          {image === "" && (
            <div className="flex items-center">
              <label
                htmlFor="metaImage"
                className="cursor-pointer text-gray-500 hover:text-gray-700"
              >
                <FaImage size={24} />
              </label>
              <input
                id="metaImage"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          )}

          {image && (
            <div className="mt-4 relative">
              <Image
                src={image}
                alt="Uploaded"
                width={200}
                height={200}
                className="w-24 h-24 object-cover rounded"
              />
              <button
                type="button"
                className="absolute top-0 right-0 bg-white rounded-full p-1 shadow hover:bg-red-500 hover:text-white"
                onClick={handleImageRemove}
              >
                <FaTrash />
              </button>
            </div>
          )}
        </div>

        {/* Botón Guardar */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default SEOForm;
