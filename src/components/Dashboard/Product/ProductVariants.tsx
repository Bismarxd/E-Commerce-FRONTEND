import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave } from "react-icons/fa";
import { axiosInstance } from "@/lib/axiosInstance";
import { useParams } from "next/navigation";
import { Variation } from "@/types/types";

const ProductVariants: React.FC = () => {
  const params = useParams();
  const [variations, setVariations] = useState<Variation[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(
    null
  );
  const [editingId, setEditingId] = useState<string | null>(null);

  const getVariations = async () => {
    const response = await axiosInstance.get(
      `/product/${params?.slug?.[0]}/variations`
    );
    if (response?.data?.status) {
      setVariations(response?.data?.data);
    }
  };

  useEffect(() => {
    getVariations();
  }, []);

  const validationSchema = Yup.object({
    color: Yup.string().required("Requerido"),
    size: Yup.string().required("Requerido"),
    price: Yup.number().positive("Debe ser positivo").required("Requerido"),
    sku: Yup.string().required("Requerido"),
    quantityAvailable: Yup.number()
      .integer()
      .min(1, "Debe ser al menos 1")
      .required("Requerido"), // Debe coincidir con initialValues
  });

  const handleAddVariation = () => {
    setSelectedVariation(null);
    setIsModalOpen(true);
  };

  const handleEditVariation = (variation: Variation) => {
    setSelectedVariation(variation);
    setEditingId(variation?._id);
    setIsModalOpen(true);
  };

  const handleDeleteVariation = async (id: string) => {
    axiosInstance
      .delete(`/product/${params?.slug?.[0]}/variations/${id}`)
      .then((data) => {
        if (data?.data?.status) {
          alert("Eliminado correctamente");
          getVariations();
        }
      })
      .catch((error) => {
        console.error("Error eliminando variacion:", error);
      });
  };

  const handleSubmit = async (values: Variation) => {
    try {
      if (editingId) {
        const response = await axiosInstance.put(
          `/product/${params?.slug?.[0]}/variations/${editingId}`,
          values
        );
        if (response?.data?.status) {
          alert("Editado correctamente");
          setVariations(
            variations.map((v) =>
              v._id === selectedVariation?._id ? response.data : v
            )
          );
        }
      } else {
        const response = await axiosInstance.post(
          `/product/${params?.slug?.[0]}/variations`,
          values
        );
        if (response?.data?.status) {
          alert("Añadido correctamente");
          setVariations([...variations, response.data]);
        }
      }
      setIsModalOpen(false);
      setEditingId(null);
      getVariations();
    } catch (error) {
      console.error("Error saving variant:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Variaciones</h2>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
            onClick={handleAddVariation}
          >
            <FaPlus className="mr-2" /> Agregar Variación
          </button>
        </div>

        <div className="space-y-2">
          {variations.map((variation, index) => (
            <div
              key={variation._id || index}
              className="flex justify-between items-center bg-gray-100 p-2 rounded"
            >
              <div>
                Color: {variation.color} | 
                Tamaño: {variation.size} | 
                Sku: {variation.sku} | 
                Cantidad:{" "}
                {variation.quantityAvailable}
              </div>
              <div className="flex space-x-2">
                <button
                  className="bg-green-200 text-green-700 p-1 rounded"
                  onClick={() => handleEditVariation(variation)}
                >
                  <FaEdit />
                </button>
                <button
                  className="bg-red-200 text-red-700 p-1 rounded"
                  onClick={() => handleDeleteVariation(variation._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-lg font-semibold">
                {selectedVariation ? "Editar" : "Añadir"} Variación
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsModalOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
            <Formik
              initialValues={
                selectedVariation || {
                  _id: "",
                  color: "",
                  size: "",
                  price: 0,
                  sku: "",
                  quantityAvailable: 1,
                }
              }
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Color
                      </label>
                      <Field
                        as="select"
                        name="color"
                        className="block w-full border p-2 rounded"
                      >
                        <option value="">Seleccionar Color</option>
                        <option value="white">Blanco</option>
                        <option value="black">Negro</option>
                        <option value="blue">Azul</option>
                      </Field>
                      <ErrorMessage
                        name="color"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Precio
                      </label>
                      <Field
                        type="number"
                        name="price"
                        className="block w-full border p-2 rounded"
                      />
                      <ErrorMessage
                        name="price"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tamaño
                      </label>
                      <Field
                        as="select"
                        name="size"
                        className="block w-full border p-2 rounded"
                      >
                        <option value="">Seleccionar Tamaño</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                      </Field>
                      <ErrorMessage
                        name="size"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        SKU
                      </label>
                      <Field
                        type="text"
                        name="sku"
                        className="block w-full border p-2 rounded"
                      />
                      <ErrorMessage
                        name="sku"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Cantidad
                      </label>
                      <Field
                        type="number"
                        name="quantityAvailable"
                        className="block w-full border p-2 rounded"
                      />
                      <ErrorMessage
                        name="quantityAvailable"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 mt-4">
                    <button
                      type="button"
                      className="px-4 py-2 border rounded text-gray-700 bg-white hover:bg-gray-50"
                      onClick={() => setIsModalOpen(false)}
                    >
                      <FaTimes className="mr-2" /> Cerrar
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      <FaSave className="mr-2" />{" "}
                      {selectedVariation ? "Actualizar" : "Guardar"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductVariants;
