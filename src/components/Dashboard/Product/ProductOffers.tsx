"use client";
import React, { useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaSave } from "react-icons/fa";
import { useParams } from "next/navigation";
import { axiosInstance } from "@/lib/axiosInstance";
import { Offers } from "@/types/types";

export interface ProductOffersProps {
    offer?: Offers;
  }


const ProductOffers: React.FC<ProductOffersProps> = ({ offer }) => {
  const params = useParams();
  const initialValues = useMemo(
    () => ({
      discountPercentage: offer?.discountPercentage || 0,
      flashSale: offer?.flashSale ? "Yes" : "No",
      startDate: offer?.startDate ? new Date(offer.startDate) : new Date(),
      endDate: offer?.endDate ? new Date(offer.endDate) : new Date(),
    }),
    [offer]
  );
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      discountPercentage: Yup.number()
        .min(0, "El descuento debe ser al menos del 0%")
        .max(100, "El descuento no debe exceder el 100%")
        .required("El descuento es obligatorio"),
      flashSale: Yup.string().required(
        "La selección de venta flash es obligatoria"
      ),
      startDate: Yup.date().required("La fecha de inicio es obligatoria"),
      endDate: Yup.date()
        .min(
          Yup.ref("startDate"),
          "La fecha de fin debe ser posterior a la de inicio"
        )
        .required("La fecha de fin es obligatoria"),
    }),
    onSubmit: (values) => {
      const adjustTimezoneOffset = (date: Date) => {
        return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      };
      const formattedValues = {
        ...values,
        startDate: adjustTimezoneOffset(values.startDate)?.toISOString(),
        endDate: adjustTimezoneOffset(values.endDate).toISOString(),
        discountPercentage: Number(values.discountPercentage),
        flashSale: values.flashSale === "Yes",
      };

      axiosInstance
        .put(`/product/${params?.slug?.[0]}`, { offers: formattedValues })
        .then((data) => {
          if (data?.data?.status) {
            alert("Añadido oferta");
          }
        });
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6">Oferta</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fecha de inicio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              FECHA DE INICIO DE LA OFERTA{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <DatePicker
                selected={formik.values.startDate}
                onChange={(date) => formik.setFieldValue("startDate", date)}
                showTimeSelect
                dateFormat="Pp"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <FaCalendarAlt className="absolute inset-y-0 right-3 top-3 text-gray-400" />
            </div>
            {formik.touched.startDate && formik.errors.startDate && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.startDate as string}
              </div>
            )}
          </div>

          {/* Fecha de fin */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              FECHA DE FIN DE LA OFERTA <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <DatePicker
                selected={formik.values.endDate}
                onChange={(date) => formik.setFieldValue("endDate", date)}
                showTimeSelect
                dateFormat="Pp"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <FaCalendarAlt className="absolute inset-y-0 right-3 top-3 text-gray-400" />
            </div>
            {formik.touched.endDate && formik.errors.endDate && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.endDate as string}
              </div>
            )}
          </div>

          {/* Porcentaje de descuento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PORCENTAJE DE DESCUENTO <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="discountPercentage"
              value={formik.values.discountPercentage}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {formik.touched.discountPercentage &&
              formik.errors.discountPercentage && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.discountPercentage}
                </div>
              )}
          </div>

          {/* Venta Flash */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ¿DESEA INCLUIR EN LA VENTA FLASH?{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="mt-2 flex items-center">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="flashSale"
                  value="Yes"
                  checked={formik.values.flashSale === "Yes"}
                  onChange={formik.handleChange}
                  className="form-radio h-4 w-4 text-red-600 transition duration-150 ease-in-out"
                />
                <span className="ml-2 text-sm text-gray-700">Sí</span>
              </label>
              <label className="flex items-center ml-6">
                <input
                  type="radio"
                  name="flashSale"
                  value="No"
                  checked={formik.values.flashSale === "No"}
                  onChange={formik.handleChange}
                  className="form-radio h-4 w-4 text-red-600 transition duration-150 ease-in-out"
                />
                <span className="ml-2 text-sm text-gray-700">No</span>
              </label>
            </div>
            {formik.touched.flashSale && formik.errors.flashSale && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.flashSale}
              </div>
            )}
          </div>
        </div>

        {/* Botón de Guardar */}
        <div className="mt-6">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <FaSave className="mr-2" /> Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductOffers;
