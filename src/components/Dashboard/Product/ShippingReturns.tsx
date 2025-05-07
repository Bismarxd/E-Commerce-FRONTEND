import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import JoditEditor from "jodit-react";
import { axiosInstance } from "@/lib/axiosInstance";
import { useParams } from "next/navigation";
import { ShippingReturn } from "@/types/types";

interface ProductShippingReturnsProps {
  shippingReturn?: ShippingReturn;
}

const ShippingReturns: React.FC<ProductShippingReturnsProps> = ({
  shippingReturn,
}) => {
  const [editorContent, setEditorContent] = useState<string>(shippingReturn?.shippingReturnPolicy || "");
  const params = useParams();
  // Configuración de Formik con validación
  const formik = useFormik<ShippingReturn>({
    initialValues: {
      shippingType: shippingReturn?.shippingType || "Flat Rate",
      isProductQuantityMultiply: shippingReturn?.isProductQuantityMultiply ? "Yes" : "No",
      shippingCost: shippingReturn?.shippingCost || 80,
      shippingReturnPolicy: editorContent,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      shippingType: Yup.string().required("Requerido"),
      isProductQuantityMultiply: Yup.string().required("Requerido"),
      shippingCost: Yup.string()
        .required("Requerido")
        .matches(/^\d+(\.\d{1,2})?$/, "Formato de costo inválido"),
      shippingReturnPolicy: Yup.string().required("Requerido"),
    }),
    onSubmit: (values) => {
      console.log("Form submitted:", values);

      const formatedValues = {
        ...values,
        isProductQuantityMultiply:
          values?.isProductQuantityMultiply === "Yes" ? true : false,
        shippingCost: Number(values?.shippingCost),
      };
      axiosInstance
        .put(`/product/${params?.slug?.[0]}`, {
          shippingReturn: formatedValues,
        })
        .then((data) => {
          if (data?.data?.status) {
            alert("añadido correctamnet");
          }
        });
    },
  });

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">Envío y Devolución</h1>
      <form onSubmit={formik.handleSubmit}>
        {/* Tipo de Envío */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            TIPO DE ENVÍO <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="Free"
              name="shippingType"
              value="Free"
              onChange={formik.handleChange}
              checked={formik.values.shippingType === "Free"}
              className="mr-2"
            />
            <label htmlFor="Free" className="mr-4">
              Gratis
            </label>
            <input
              type="radio"
              id="Flat Rate"
              name="shippingType"
              value="Flat Rate"
              onChange={formik.handleChange}
              checked={formik.values.shippingType === "Flat Rate"}
              className="mr-2"
            />
            <label htmlFor="Flat Rate">Tarifa Plana</label>
          </div>
          {formik.errors.shippingType && formik.touched.shippingType && (
            <div className="text-red-500 text-sm">
              {formik.errors.shippingType}
            </div>
          )}
        </div>

        {/* Multiplicar Cantidad */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            ¿MULTIPLICAR CANTIDAD DE PRODUCTO?{" "}
            <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="Yes"
              name="isProductQuantityMultiply"
              value="Yes"
              onChange={formik.handleChange}
              checked={formik.values.isProductQuantityMultiply === "Yes"}
              className="mr-2"
            />
            <label htmlFor="Yes" className="mr-4">
              Sí
            </label>
            <input
              type="radio"
              id="No"
              name="isProductQuantityMultiply"
              value="No"
              onChange={formik.handleChange}
              checked={formik.values.isProductQuantityMultiply === "No"}
              className="mr-2"
            />
            <label htmlFor="No">No</label>
          </div>
          {formik.errors.isProductQuantityMultiply &&
            formik.touched.isProductQuantityMultiply && (
              <div className="text-red-500 text-sm">
                {formik.errors.isProductQuantityMultiply}
              </div>
            )}
        </div>

        {/* Costo de Envío */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            COSTO DE ENVÍO <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="shippingCost"
            className="border border-gray-300 p-2 w-full rounded"
            value={formik.values.shippingCost}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.shippingCost && formik.touched.shippingCost && (
            <div className="text-red-500 text-sm">
              {formik.errors.shippingCost}
            </div>
          )}
        </div>

        {/* Envío y Devolución Editor */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            ENVÍO Y DEVOLUCIÓN <span className="text-red-500">*</span>
          </label>
          <JoditEditor
            value={editorContent}
            onBlur={(newContent) => {
              setEditorContent(newContent);
              formik.setFieldValue("shippingReturnPolicy", newContent);
            }}
          />
          {formik.errors.shippingReturnPolicy &&
            formik.touched.shippingReturnPolicy && (
              <div className="text-red-500 text-sm">
                {formik.errors.shippingReturnPolicy}
              </div>
            )}
        </div>

        {/* Botón de Enviar */}
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Guardar
        </button>
      </form>
    </div>
  );
};

export default ShippingReturns;
