"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { axiosInstance } from '@/lib/axiosInstance';
import useToast from '@/hooks/useToast';
import Toast from '@/components/CustomToast';
import { useRouter } from 'next/navigation';

import Cookies from "js-cookie"

interface FormValues {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Email Invalido').required('El Email es Obligatorio'),
  password: Yup.string().min(6, 'La Contraeña es demasido Corta - Son 6 caracteres Minimo').required('El Password es Obligatorio'),
});

const Login: React.FC = () => {
  const { message, isVisible, showToast } = useToast();
  const [successToast, setSuccessToast] = useState(true);
  const navigate = useRouter();
  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      axiosInstance
              .post("/login", values)
              .then((data) => {
                if (data?.data?.status) {
                  setSuccessToast(true);
                  showToast(data?.data?.msg, 3000);
                  Cookies.set('token', data?.data?.token, {expires:1})
                  Cookies.set('role', data?.data?.role, {expires:1})

                  setTimeout(() => {
                    if (data?.data?.role === "admin") {
                      navigate.push('/dashboard');
                    } else {
                      navigate.push("/")
                    }
                  }, 3000); 

                  
                }
              })
              .catch((error) => {
                setSuccessToast(false);
                showToast(error?.response?.data?.msg,3000);
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
            <h2 className="text-2xl font-bold text-orange-600 mb-6">Iniciar Sesión</h2>

            <form className="space-y-4" onSubmit={formik.handleSubmit}>
              <div>
                <label className="block text-gray-700">Email <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  {...formik.getFieldProps('email')}
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {formik.errors.email && formik.touched.email && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                )}
              </div>

              <div>
                <label className="block text-gray-700">Password <span className="text-red-500">*</span></label>
                <input
                  type="password"
                  {...formik.getFieldProps('password')}
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {formik.errors.password && formik.touched.password && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 text-white rounded-lg py-2 mt-4 hover:bg-orange-700"
              >
                Iniciar Sesión
              </button>
            </form>

            <p className="mt-4 text-center text-gray-600">
              ¿No tienes una cuenta?{' '}
              <Link href="/register" className="text-orange-600">
                Registrarse
              </Link>
            </p>
          </div>
        </div>
      </div>
      {isVisible && message && (
              <Toast
                message={message}
                type={successToast ? "success" : "error"}
                onClose={() => showToast("", 0)}
              />
            )}
    </div>
  );
};

export default Login;
