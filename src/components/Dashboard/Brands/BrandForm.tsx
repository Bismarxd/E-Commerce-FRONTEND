"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaImage, FaTimes, FaTrash } from "react-icons/fa";
import { axiosInstance } from "@/lib/axiosInstance";
import JoditEditor from "jodit-react";
import { useParams } from "next/navigation";
import useToast from '@/hooks/useToast';
import Toast from '@/components/CustomToast';

interface Image {
  url: string;
  id: string;
}
interface FormValues {
  _id: React.ReactNode;
  name: string;
  description: string;
  status: string;
  image: Image;
}

const BrandForm: React.FC<{
  open: boolean;
  setIsDrawerOpen: (value: boolean) => void;
  data?: FormValues;
  fetchProducts: () => Promise<void>;
}> = ({ data = {} as FormValues, open, setIsDrawerOpen, fetchProducts }) => {
  const [successToast, setSuccessToast] = useState(true);
  const { message, isVisible, showToast } = useToast();
  const [isEdit, setIsEdit] = useState(false);
  const [editorContent, setEditorContent] = useState<string>("");
  const [image, setImage] = useState<string | null>("");
  const [publicId, setPublicId] = useState("");
  const params = useParams();

  useEffect(() => {
    if (data?.image?.url) {
      setImage(data?.image?.url);
      setPublicId(data?.image?.id);
    }else {
      setImage("");
      setPublicId("");
    }
  }, [data]);

  useEffect(() => {
    if (Object.keys(data)?.length > 0) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
    if (data?.description) {
      setEditorContent(data?.description);
    }
  }, [data]);

  useEffect(() => {
    if (Object.keys(data)?.length > 0) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [data]);

  const formik = useFormik<FormValues>({
    initialValues: {
      _id: data?._id || "",
      name: data?.name || "",
      description: data?.description || "",
      status: data?.status || "Active",
      image: data?.image || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("El Nombre es obligatorio"),
      description: Yup.string().required("La descripcion es obligatoria"),
    }),
    onSubmit: (values) => {
      if (!isEdit) {
        axiosInstance.post(`/brands`, values).then((data) => {
          if (data?.data?.status) {
            setSuccessToast(true);
            showToast("Marca Añadida Correctamente", 3000);
            formik.resetForm({});
            setImage("");
            setEditorContent("");
            setIsDrawerOpen(!open);
          } else {
            console.log("Error:", data?.data?.error);
          }
        });
        fetchProducts();
      } else {
        axiosInstance
          .put(`/brands/${(data as { _id: string })._id}`, values)
          .then((data) => {
            if (data?.data?.status) {
              setSuccessToast(true);
              showToast("Marca Editada Correctamente", 3000);
              formik.resetForm({});
              setImage("");
              setEditorContent("");
              setIsEdit(false);
              setIsDrawerOpen(!open);
            }
          });
        fetchProducts();
      }
    },
  });

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
          setPublicId(response.data.public_id)
          formik.setFieldValue("image", {
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
          axiosInstance
            .put(`/brands/${params?.slug?.[0]}`, {
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

  return (
    <div className="min-h-screen bg-gray-100 flex items-start">
       {isVisible && message && (
            <Toast
              message={message}
              type={successToast ? "success" : "error"}
              onClose={() => showToast("", 0)}
            />
          )}
      {open && (
        <div className="fixed top-0 z-50 right-0 h-full w-[80%] bg-white shadow-lg p-6 overflow-y-auto transition-transform transform">
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h2 className="text-xl font-semibold">
              {isEdit ? "Editar" : "Añadir"} Marca
            </h2>
            <button
              type="button"
              onClick={() => {
                setIsDrawerOpen(false);
                setIsEdit(false);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Campos de texto */}
              {/* nombre */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 block w-full border ${
                    formik.touched.name && formik.errors.name
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm p-2`}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-sm">{formik.errors.name}</p>
                )}
              </div>

              {/* estado */}
              <div className="">
                <label className="text-sm font-medium text-gray-700">
                  Estado *
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      checked={formik.values.status === "Active"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    Activo
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="Inactive"
                      checked={formik.values.status === "Inactive"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    Inactivo
                  </label>
                </div>
              </div>
            </div>

            {/* imagen */}
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
                  <img
                    src={image}
                    alt="Uploaded"
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

            {/* descripcion */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Descripción *
              </label>
              <JoditEditor
                value={editorContent}
                onBlur={(newContent) => {
                  setEditorContent(newContent);
                  formik.setFieldValue("description", newContent);
                }}
              />
              {formik.errors.description && formik.touched.description && (
                <div className="text-red-500 text-sm">
                  {formik.errors.description}
                </div>
              )}
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-4 mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                {isEdit ? "Editar" : "Guardar"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsDrawerOpen(false);
                  setIsEdit(false);
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cerrar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default BrandForm;
