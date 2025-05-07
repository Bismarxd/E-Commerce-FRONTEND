"use client";
import React, { useEffect, useState } from "react";
import { FiPlusCircle, FiX } from "react-icons/fi"; // Iconos de React Icons
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // Para validaciones
import { axiosInstance } from "@/lib/axiosInstance";
import { AddressCardProps } from "@/types/types";

// Componente de la tarjeta de dirección
const AddressCard: React.FC<AddressCardProps> = ({
  fullName,
  email,
  phone,
  streetAddress,
  country,
  state,
  city,
  zipCode,
}) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-start w-full sm:w-1/2 md:w-[45%] ">
    <div>
      <h2 className="text-lg font-semibold">{fullName}</h2>
      <p className="text-sm text-gray-600">{email}</p>
      <p className="text-sm text-gray-600">
        {phone},{country},{city},{state},{zipCode}
      </p>
      <p className="text-sm text-gray-600">{streetAddress}</p>
    </div>
    <div className="text-gray-400">
      <i className="fas fa-ellipsis-h"></i>
    </div>
  </div>
);

// Componente para añadir una nueva tarjeta de dirección
const AddNewAddressCard: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <div className="bg-red-50 p-4 rounded-lg shadow-md flex justify-center items-center w-full sm:w-1/2 md:w-[45%]">
    <button className="text-red-500 flex items-center" onClick={onClick}>
      <FiPlusCircle className="mr-2" />
      <span className="font-semibold">Actualizar Dirección</span>
    </button>
  </div>
);

// Validación del formulario con Yup
const validationSchema = Yup.object({
  fullName: Yup.string().required("Nombre completo es obligatorio"),
  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("Correo electrónico es obligatorio"),
  phone: Yup.string().required("Teléfono es obligatorio"),
  streetAddress: Yup.string().required("Dirección es obligatoria"),
  country: Yup.string().required("País es obligatorio"),
  state: Yup.string().required("Estado es obligatorio"),
  city: Yup.string().required("Ciudad es obligatoria"),
  zipCode: Yup.string().required("Código postal es obligatorio"),
});

// Componente del Modal para la dirección
const AddressModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  dataUser?: AddressCardProps;
  getAddress: () => void;
}> = ({ isOpen, onClose, dataUser, getAddress }) =>
  isOpen ? (
    <div className="min-h-screen fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-4xl mt-5">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Dirección</h2>
          <button className="text-red-500 text-xl" onClick={onClose}>
            <FiX />
          </button>
        </div>
        <Formik
          initialValues={{
            fullName: dataUser?.fullName || "",
            email: dataUser?.email || "",
            phone: dataUser?.phone || "",
            streetAddress: dataUser?.streetAddress || "",
            country: dataUser?.country || "",
            state: dataUser?.state || "",
            city: dataUser?.city || "",
            zipCode: dataUser?.zipCode || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Form values", values);
            axiosInstance
              .put("/users", { billingAddress: values })
              .then((data) => {
                if (data?.data?.status) {
                  alert("Actualizado");
                  getAddress();
                }
              });
            onClose(); // Cierra el modal al enviar el formulario
          }}
        >
          {() => (
            <Form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nombre completo <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    name="fullName"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Correo electrónico
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Teléfono <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="number"
                    name="phone"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Dirección <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    name="streetAddress"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="streetAddress"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    País <span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="select"
                    name="country"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  >
                    <option value="">Selecciona un país</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Estados Unidos">Estados Unidos</option>
                    <option value="España">España</option>
                    {/* Añadir más opciones según sea necesario */}
                  </Field>
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Estado <span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="select"
                    name="state"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  >
                    <option value="">Selecciona un estado</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Rajshahi">Rajshahi</option>
                    {/* Añadir más opciones según sea necesario */}
                  </Field>
                  <ErrorMessage
                    name="state"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Ciudad <span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="select"
                    name="city"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  >
                    <option value="">Selecciona una ciudad</option>
                    <option value="Mirpur">Mirpur</option>
                    <option value="Dhanmondi">Dhanmondi</option>
                    {/* Añadir más opciones según sea necesario */}
                  </Field>
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Código postal <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="number"
                    name="zipCode"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="zipCode"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="bg-orange-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Actualizar dirección
                </button>
                <button
                  type="button"
                  className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                  onClick={onClose}
                >
                  Cancelar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  ) : null;

// Componente principal
const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  //Obtener los atos del usuario
  const [dataUser, setDataUser] = useState<AddressCardProps>();

  const getAddress = async () => {
    await axiosInstance.get("/user").then((data) => {
      if (data?.data?.status) {
        setDataUser(data?.data?.user?.billingAddress);
      }
    });
  };

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-red-500 mb-6">Direccion</h1>
      <div className="flex flex-col gap-4">
        <AddressCard
          fullName={dataUser?.fullName ?? ""}
          email={dataUser?.email ?? ""}
          phone={dataUser?.phone ?? ""}
          city={dataUser?.city ?? ""}
          country={dataUser?.country ?? ""}
          state={dataUser?.state ?? ""}
          streetAddress={dataUser?.streetAddress ?? ""}
          zipCode={dataUser?.zipCode ?? ""}
        />

        <AddNewAddressCard onClick={handleOpenModal} />
      </div>

      <AddressModal
        getAddress={getAddress}
        dataUser={dataUser}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default App;
