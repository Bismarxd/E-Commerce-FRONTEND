"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "@/lib/axiosInstance";
import useToast from "@/hooks/useToast";
import Toast from "@/components/CustomToast";
import { useRouter } from "next/navigation";

interface FormValues {
  name: string;
  email: string;
  mobile: string;
  password: string;
}

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required("Nombre es Obligatorio"),
  email: Yup.string().email("Email Invalido").required("Email es Obligatorio"),
  mobile: Yup.string().required("Celular es Obligatorio"),
  password: Yup.string()
    .min(6, "Password is too short - should be 6 chars minimum")
    .required("Contraseña es Obligatorio"),
});

const Register: React.FC = () => {
  const { message, isVisible, showToast } = useToast();
  const navigate = useRouter()
  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      // console.log("Form submitted:", values);
      axiosInstance
        .post("/register", values)
        .then((data) => {
          if (data?.data?.status) {
            showToast(data?.data?.msg, 3000);

            setTimeout(() => {
              navigate.push('/login')
            }, 3000);
            
          }
        })
        .catch((error) => {
          showToast(error?.response?.data?.msg, 3000);
        });
    },
  });

  return (
    <div className="xl:container mx-auto px-2 xl:px-4 pt-0 md:py-8">
      <div className="w-full md:w-[70%] mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full flex flex-col md:flex-row mx-auto mt-10">
          <div className="w-[80%] md:w-1/2 mb-2 ml-5 md:ml-0">
            <Image
              src="/logoLogin.png"
              alt="Three women in stylish outfits standing in a row"
              className="w-full h-full object-cover"
              width={500}
              height={500}
            />
          </div>
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold text-orange-600 mb-6">
              Registrarse
            </h2>

            <form className="space-y-4" onSubmit={formik.handleSubmit}>
              <div>
                <label className="block text-gray-700">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  placeholder="Tu Nombre"
                  type="text"
                  {...formik.getFieldProps("name")}
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {formik.errors.name && formik.touched.name && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.name}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  placeholder="Correo Electronico"
                  type="email"
                  {...formik.getFieldProps("email")}
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {formik.errors.email && formik.touched.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-700">
                  Celular <span className="text-red-500">*</span>
                </label>
                <input
                  id="mobile"
                  placeholder="Nro. de Celular"
                  type="number"
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  {...formik.getFieldProps("mobile")}
                />
                {formik.errors.mobile && formik.touched.mobile && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.mobile}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  placeholder="Tu Contraseña"
                  type="password"
                  {...formik.getFieldProps("password")}
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {formik.errors.password && formik.touched.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 text-white rounded-lg py-2 mt-4 hover:bg-orange-700"
              >
                Registrarse
              </button>
            </form>

            <p className="mt-4 text-center text-gray-600">
              Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-orange-600">
                Iniciar Sesión
              </Link>
            </p>
            {isVisible && message && (
              <Toast
                message={message}
                type="success"
                onClose={() => showToast("", 0)} // Cerrar el toast manualmente
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
