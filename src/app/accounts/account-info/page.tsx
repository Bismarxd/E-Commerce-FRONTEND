"use client"
import React, { useEffect, useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "@/lib/axiosInstance";
import { User } from "@/types/types";

const AccountInformation: React.FC = () => {
  const [dataUser, setDataUser] = useState<User | null>(null);

  const fetchUser = async () => {
    await axiosInstance.get("user").then((data) => {
      if (data?.data?.status) {
        setDataUser(data?.data?.user);
      }
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required("Nombre Completo es obligatorio"),
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("Correo Electrónico es obligatorio"),
    mobile: Yup.string().required("Teléfono es obligatorio"),
  });

  return (
    <Formik
      initialValues={{
        name: dataUser?.name || "", // ✅ Cambio de fullName a name
        email: dataUser?.email || "",
        mobile: dataUser?.mobile ? String(dataUser.mobile) : "", // ✅ Convertir a string
      }}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Form submitted", values);
        axiosInstance.put("users", values).then((data) => {
          if(data?.data?.status)
          {
            alert("Usuario Actualizado")
            fetchUser()
          }
        })
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Información de Cuenta</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo <span className="text-red-600">*</span>
                </label>
                <Field
                  type="text"
                  name="name" // ✅ Debe coincidir con validationSchema
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                <ErrorMessage name="name" component="div" className="text-sm text-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo Electrónico <span className="text-red-600">*</span>
                </label>
                <Field
                  type="email"
                  name="email"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                <ErrorMessage name="email" component="div" className="text-sm text-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Teléfono <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <Field
                    type="number"
                    name="mobile" // ✅ Debe coincidir con validationSchema
                    placeholder="123456789"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                </div>
                <ErrorMessage name="mobile" component="div" className="text-sm text-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subir Imagen
                </label>
                <Field
                  type="file"
                  name="image"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <button
                  type="submit"
                  className="bg-red-600 text-white rounded-lg px-4 py-2 mt-4 hover:bg-red-700"
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default AccountInformation;
