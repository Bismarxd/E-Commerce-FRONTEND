"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaSave } from "react-icons/fa";
import { axiosInstance } from "@/lib/axiosInstance";
import { useParams } from "next/navigation";
import { Video } from "@/types/types";

const ProductVideo = () => {
  const params = useParams();
  const [videos, setVideos] = useState<Video[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const getVideos = async () => {
    const response = await axiosInstance.get(
      `/product/${params?.slug?.[0]}/videos`
    );
    if (response?.data?.status) {
      setVideos(response?.data?.data);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  const formik = useFormik({
    initialValues: {
      videoProvider: "",
      videoLink: "",
      _id: "",
    },
    validationSchema: Yup.object({
      videoProvider: Yup.string().required("El proveedor es obligatorio"),
      videoLink: Yup.string()
        .url("Debe ser un enlace válido")
        .required("El enlace es obligatorio"),
    }),
    onSubmit: async (values) => {
      try {
        if (editingId) {
          // 🔹 EDITAR VIDEO
          await axiosInstance.put(
            `/product/${params?.slug?.[0]}/videos/${editingId}`,
            values
          );
          alert("Video editado correctamente");
        } else {
          // 🔹 AGREGAR VIDEO
          await axiosInstance.post(`/product/${params?.slug?.[0]}/videos`, {
            values,
          });
          alert("Video añadido correctamente");
        }
        setIsModalOpen(false);
        formik.resetForm();
        setEditingId(null);
        getVideos();
      } catch (error) {
        console.error("Error al guardar video:", error);
      }
    },
  });

  const handleEditVideo = (video: Video) => {
    formik.setValues(video);
    setEditingId(video._id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    axiosInstance
      .delete(`/product/${params?.slug?.[0]}/videos/${id}`)
      .then((data) => {
        if (data?.data?.status) {
          alert("Video eliminado correctamente");
          getVideos();
        }
      })
      .catch((error) => {
        console.error("Error eliminando video:", error);
      });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Videos</h1>
        <button
          onClick={() => {
            formik.resetForm();
            setEditingId(null);
            setIsModalOpen(true);
          }}
          className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
        >
          <FaPlus className="mr-2" /> Agregar Video
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">PROVEEDOR DE VIDEO</th>
            <th className="py-2 px-4 border-b">ENLACE</th>
            <th className="py-2 px-4 border-b">ACCIÓN</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{video.videoProvider}</td>
              <td className="py-2 px-4 border-b">
                <a
                  href={video.videoLink}
                  className="text-blue-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {video.videoLink}
                </a>
              </td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <button
                  onClick={() => handleEditVideo(video)}
                  className="bg-green-100 text-green-500 p-2 rounded"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(video._id)}
                  className="bg-red-100 text-red-500 p-2 rounded"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-sm text-gray-600">
        Mostrando {videos.length} entradas
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-lg font-semibold">Video de Producto</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={formik.handleSubmit} className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PROVEEDOR DE VIDEO *
                </label>
                <select
                  name="videoProvider"
                  value={formik.values.videoProvider}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="block w-full border border-gray-300 rounded-md p-2 bg-white"
                >
                  <option value="" disabled>
                    Selecciona un proveedor
                  </option>
                  <option value="YouTube">YouTube</option>
                  <option value="Vimeo">Vimeo</option>
                  <option value="Dailymotion">Dailymotion</option>
                </select>
                {formik.touched.videoProvider &&
                  formik.errors.videoProvider && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.videoProvider}
                    </div>
                  )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ENLACE *
                </label>
                <textarea
                  name="videoLink"
                  value={formik.values.videoLink}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="block w-full border border-gray-300 rounded-md p-2 h-24"
                />
                {formik.touched.videoLink && formik.errors.videoLink && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.videoLink}
                  </div>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  <FaTimes className="mr-2" /> Cerrar
                </button>
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  <FaSave className="mr-2" /> Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductVideo;
