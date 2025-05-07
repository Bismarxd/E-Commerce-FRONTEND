import React, { Dispatch, SetStateAction } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AiOutlineClose } from "react-icons/ai";
import { axiosInstance } from "@/lib/axiosInstance";

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  streetAddress: string;
}

interface AddressFormProps {
  isOpen: boolean;
  onClose: () => void;
  showBillingAddress: boolean;
  billingAddress?: FormValues; // ✅ Esto indica que es un objeto con la estructura de FormValues
  shippingAddress?: FormValues;
  title: string;
  fetchAddress: () => void;
  setAddressType?: Dispatch<SetStateAction<string>>; 
}

const AddressForm: React.FC<AddressFormProps> = ({
  isOpen,
  onClose,
  showBillingAddress,
  billingAddress,
  shippingAddress,
  title,
  fetchAddress,


}) => {
  if (!isOpen) return null;

  const validationSchema = Yup.object({
    fullName: Yup.string().required("El nombre completo es obligatorio"),
    email: Yup.string().required("El email es obligatorio"),
    phone: Yup.string().required("El teléfono es obligatorio"),
    country: Yup.string().required("El país es obligatorio"),
    state: Yup.string().required("El estado es obligatorio"),
    city: Yup.string().required("La ciudad es obligatoria"),
    zipCode: Yup.string().required("El código postal es obligatorio"),
    streetAddress: Yup.string().required("La dirección es obligatoria"),
  });

  // Handler para el submit del formulario
  const handleSubmit = (values: FormValues) => {
 
    if (showBillingAddress) {
      try {
        axiosInstance
          .put("/users", {
            shippingAddress: values,
            billingAddress: showBillingAddress ? values : null,
          })
          .then((data) => {
            if (data?.data?.status) {
              alert("Añadido");
              fetchAddress();
            }
          });

        onClose(); // Cierra el formulario después de enviar
      } catch (error) {
        console.log("El error es:", error);
      }
    } else {
      if (title === "Dirección de Facturación") {
        try {
          axiosInstance
            .put("/users", { billingAddress: values })
            .then((data) => {
              if (data?.data?.status) {
                alert("Añadido");
                fetchAddress();
              }
            });

          onClose(); // Cierra el formulario después de enviar
        } catch (error) {
          console.log("El error es:", error);
        }
      }
      if (title === "Dirección de Envio") {
        try {
          axiosInstance
            .put("/users", { shippingAddress: values })
            .then((data) => {
              if (data?.data?.status) {
                alert("Añadido");
                fetchAddress();
              }
            });

          onClose(); // Cierra el formulario después de enviar
        } catch (error) {
          console.log("El error es:", error);
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-red-500 text-xl">
            <AiOutlineClose />
          </button>
        </div>
        <Formik
          initialValues={{
            fullName: showBillingAddress
              ? title === "Dirección de Facturación"
                ? billingAddress?.fullName || ""
                : shippingAddress?.fullName || ""
              : billingAddress?.fullName || "",

            email: showBillingAddress
              ? title === "Dirección de Facturación"
                ? billingAddress?.email || ""
                : shippingAddress?.email || ""
              : billingAddress?.email || "",

            phone: showBillingAddress
              ? title === "Dirección de Facturación"
                ? billingAddress?.phone || ""
                : shippingAddress?.phone || ""
              : billingAddress?.phone || "",

            country: showBillingAddress
              ? title === "Dirección de Facturación"
                ? billingAddress?.country || ""
                : shippingAddress?.country || ""
              : billingAddress?.country || "",

            state: showBillingAddress
              ? title === "Dirección de Facturación"
                ? billingAddress?.state || ""
                : shippingAddress?.state || ""
              : billingAddress?.state || "",

            city: showBillingAddress
              ? title === "Dirección de Facturación"
                ? billingAddress?.city || ""
                : shippingAddress?.city || ""
              : billingAddress?.city || "",

            zipCode: showBillingAddress
              ? title === "Dirección de Facturación"
                ? billingAddress?.zipCode || ""
                : shippingAddress?.zipCode || ""
              : billingAddress?.zipCode || "",

            streetAddress: showBillingAddress
              ? title === "Dirección de Facturación"
                ? billingAddress?.streetAddress || ""
                : shippingAddress?.streetAddress || ""
              : billingAddress?.streetAddress || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre Completo *
                </label>
                <Field
                  name="fullName"
                  type="text"
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Correo Electrónico
                </label>
                <Field
                  name="email"
                  type="email"
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Teléfono *
                </label>
                <Field
                  name="phone"
                  type="number"
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  País *
                </label>
                <Field
                  name="country"
                  as="select"
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                >
                  <option value="">Selecciona un país</option>
                  <option value="Bolivia">Bolivia</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Brazil">Brasil</option>
                </Field>
                <ErrorMessage
                  name="country"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Estado *
                </label>
                <Field
                  name="state"
                  type="text"
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
                <ErrorMessage
                  name="state"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ciudad *
                </label>
                <Field
                  name="city"
                  type="text"
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Código Postal *
                </label>
                <Field
                  name="zipCode"
                  type="text"
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
                <ErrorMessage
                  name="zipCode"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Dirección *
                </label>
                <Field
                  name="streetAddress"
                  type="text"
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
                <ErrorMessage
                  name="streetAddress"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-red-500 text-white rounded-md"
              >
                Guardar Dirección
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddressForm;
