"use client"
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { axiosInstance } from '@/lib/axiosInstance';
import { AxiosError } from 'axios';

const ChangePassword: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .required('La contraseña actual es obligatoria')
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),
      newPassword: Yup.string()
        .required('La nueva contraseña es obligatoria')
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),
      confirmPassword: Yup.string()
        .required('La confirmación de la contraseña es obligatoria')
        .oneOf([Yup.ref('newPassword')], 'Las contraseñas deben coincidir'),
    }),
    onSubmit: async (values) => {
      // Handle form submission here

      if (values.newPassword !== values.confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }
    
      try {
        const response = await axiosInstance.put("/user/change-password", {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        });
    
        if (response?.data?.status) {
          alert("Contraseña actualizada");
        } else {
          alert(response?.data?.message || "Error desconocido");
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          alert(error.response?.data?.message || "Error desconocido");
        } else {
          alert("Error en la solicitud");
        }
      }
    },
  }); 

  return (
    <main className="bg-white p-8 rounded-lg shadow-md w-full ">
      <h1 className="text-2xl font-bold text-orange-600 mb-6">Cambiar Contraseña</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="oldPassword"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Antigua Contraseña <span className="text-red-500">*</span>
          </label>
          <input
            id="oldPassword"
            name="oldPassword"
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.oldPassword && formik.errors.oldPassword && (
            <div className="text-sm text-red-500">{formik.errors.oldPassword}</div>
          )}
        </div>
        <div className="flex mb-4">
          <div className="w-1/2 mr-2">
            <label
              htmlFor="newPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Nueva Contraseña <span className="text-red-500">*</span>
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <div className="text-sm text-red-500">{formik.errors.newPassword}</div>
            )}
          </div>
          <div className="w-1/2 ml-2">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirmar Contraseña <span className="text-red-500">*</span>
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="text-sm text-red-500">{formik.errors.confirmPassword}</div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </main>
  );
};

export default ChangePassword;
