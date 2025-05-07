"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaTimes } from "react-icons/fa";
import JoditEditor from "jodit-react";
import { axiosInstance } from "@/lib/axiosInstance";
import { Product, Category, Brand } from "@/types/types";

const ProductForm: React.FC<{
  open: boolean;
  setIsDrawerOpen: (value: boolean) => void;
  data?: Product;
  fetchProducts: () => Promise<void>;
}> = ({ data = {} as Product, open, setIsDrawerOpen, fetchProducts }) => {
  const [editorContent, setEditorContent] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [subCategoriesData, setSubCategoriesData] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isEdit, setIsEdit] = useState(false);

  const fetchCategories = async () => {
    axiosInstance.get("/categories").then((data) => {
      if (data?.data?.status) {
        setSubCategories(data?.data?.data);
      }
    });
    axiosInstance.get("/brands").then((data) => {
      if (data?.data?.status) {
        setBrands(data?.data?.data);
      }
    });
  };
  console.log(subCategories)

  useEffect(()=>{
    setSubCategoriesData(subCategories.filter((item) => item?.category===category))
  },[category])

  useEffect(() => {
    fetchCategories()
    if (Object.keys(data)?.length > 0) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
    if (data?.description) {
      setEditorContent(data?.description);
    }
  }, [data]);

  const formik = useFormik<Product>({
    initialValues: {
      _id: data?._id || "",
      name: data?.name || "",
      sku: data?.sku || "",
      category: data?.category || "",
      subcategory: data?.subcategory || "",
      barcode: data?.barcode || "",
      buyingPrice: data?.buyingPrice || 0,
      sellingPrice: data?.sellingPrice || 0,
      tax: data?.tax || "",
      brand: data?.brand || "",
      status: data?.status ? "Active" : "Inactive",
      canPurchaeAble: data?.canPurchaeAble ? "Yes" : "No",
      showStock: data?.showStock ? "Enable" : "Disable",
      refundable: data?.refundable ? "Yes" : "No",
      maximunPurchaseQuantity: data?.maximunPurchaseQuantity || 0,
      lowStockQuantityWarning: data?.lowStockQuantityWarning || 0,
      unit: data?.unit || "",
      weight: data?.weight || "",
      tags: data?.tags || "",
      description: data?.description || "",
      images: data?.images || [], // <-- Añadido
      videos: data?.videos || [], // <-- Añadido
      variations: data?.variations || [], // <-- Añadido
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio"),
      sku: Yup.string().required("El SKU es obligatorio"),
      // category: Yup.string().required("La categoría es obligatoria"),
      // barcode: Yup.string().required("El código de barras es obligatorio"),
      buyingPrice: Yup.number()
        .required("El precio de compra es obligatorio")
        .positive("Debe ser un número positivo"),
      sellingPrice: Yup.number()
        .required("El precio de venta es obligatorio")
        .positive("Debe ser un número positivo"),
      // brand: Yup.string().required("La marca es obligatoria"),
      maximunPurchaseQuantity: Yup.number().positive(
        "Debe ser un número positivo"
      ),
      lowStockQuantityWarning: Yup.number().positive(
        "Debe ser un número positivo"
      ),
      // weight: Yup.number().positive("Debe ser un número positivo"),
    }),
    onSubmit: (values) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, ...rest } = values;
      if (!isEdit) {
        axiosInstance
          .post("/product", {
            ...rest,
            refundable: values?.refundable === "Yes" ? true : false,
            showStock: values?.showStock === "Enable" ? true : false,
            canPurchaeAble: values?.canPurchaeAble === "Yes" ? true : false,
          })
          .then((data) => {
            if (data?.data?.status) {
              alert("Producto Añadido");
              formik.resetForm({});
              setIsDrawerOpen(!open);
            }
          })
          .catch((error) => {
            console.error(
              "Error en la solicitud:",
              error.response?.data || error
            );
          });
        fetchProducts();
      } else {
        axiosInstance
          .put(`/product/${(data as { _id: string })._id}`, {
            ...values,
            refundable: values?.refundable === "Yes" ? true : false,
            showStock: values?.showStock === "Enable" ? true : false,
            canPurchaeAble: values?.canPurchaeAble === "Yes" ? true : false,
          })
          .then((data) => {
            if (data?.data?.status) {
              alert("Producto Editado Correctamente");
              formik.resetForm({});
              setIsEdit(false);
              setIsDrawerOpen(!open);
            }
          });
        fetchProducts();
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-start">
      {open && (
        <div className="fixed top-0 z-50 right-0 h-full w-[80%] bg-white shadow-lg p-6 overflow-y-auto transition-transform transform">
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h2 className="text-xl font-semibold">
              {" "}
              {isEdit ? "Editar" : "Añadir"} Producto
            </h2>
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Campos de texto */}
              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 block w-full border ${
                    formik.touched.name && formik.errors.name
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm p-2`}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-sm">{formik.errors.name}</p>
                )}
              </div>
              {/* Sku */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  SKU *
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formik.values.sku}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 block w-full border ${
                    formik.touched.sku && formik.errors.sku
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm p-2`}
                />
                {formik.touched.sku && formik.errors.sku && (
                  <p className="text-red-500 text-sm">{formik.errors.sku}</p>
                )}
              </div>
              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Categoría *
                </label>
                <select
                  name="category"
                  value={formik.values.category}
                  onChange={(e)=>{formik.handleChange(e);setCategory(e.currentTarget.value)}}
                  onBlur={formik.handleBlur}
                  className={`mt-1 block w-full border ${
                    formik.touched.category && formik.errors.category
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm p-2`}
                >
                  <option value="" disabled>
                    Selecciona una categoría
                  </option>
                  <option value="Men">Hombre</option>
                  <option value="Women">Mujer</option>
                  <option value="Juniors">Niño</option>
                </select>
                {formik.touched.category && formik.errors.category && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.category}
                  </p>
                )}
              </div>

              {/* Sub Categories */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Sub Categoría *
                </label>
                <select
                  name="subcategory"
                  value={formik.values.subcategory}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 block w-full border ${
                    formik.touched.subcategory && formik.errors.subcategory
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm p-2`}
                >
                  <option value="" disabled>
                    Selecciona una categoría
                  </option>
                  {subCategoriesData.length ? subCategoriesData?.map((item, index)=>{
                    return  <option key={index} value={item?.subcategory}>{item?.subcategory}</option>
                  }): <option disabled>No Hay Datos</option>
                  }
                 
                
                </select>
                {formik.touched.subcategory && formik.errors.subcategory && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.subcategory}
                  </p>
                )}
              </div>

              {/* Codigo de barras */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Código de Barras *
                </label>
                <select
                  name="barcode"
                  value={formik.values.barcode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 block w-full border ${
                    formik.touched.barcode && formik.errors.barcode
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm p-2`}
                >
                  <option value="" disabled>
                    Selecciona un tipo
                  </option>
                  <option value="EAN-13">EAN-13</option>
                  <option value="UPC">UPC</option>
                  <option value="CODE-128">CODE-128</option>
                  <option value="QR">QR</option>
                </select>
                {formik.touched.barcode && formik.errors.barcode && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.barcode}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Precio de compra *
                </label>
                <input
                  type="number"
                  name="buyingPrice"
                  value={formik.values.buyingPrice}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 block w-full border ${
                    formik.touched.buyingPrice && formik.errors.buyingPrice
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm p-2`}
                />
                {formik.touched.buyingPrice && formik.errors.buyingPrice && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.buyingPrice}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Precio de venta *
                </label>
                <input
                  type="number"
                  name="sellingPrice"
                  value={formik.values.sellingPrice}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 block w-full border ${
                    formik.touched.sellingPrice && formik.errors.sellingPrice
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm p-2`}
                />
                {formik.touched.sellingPrice && formik.errors.sellingPrice && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.sellingPrice}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Marca *
                </label>
                <select
                  name="brand"
                  value={formik.values.brand}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 block w-full border ${
                    formik.touched.brand && formik.errors.brand
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm p-2`}
                >
                  <option value="" disabled>
                    Selecciona una marca
                  </option>
                  {brands.length ? brands?.map((item, index)=>{
                    return  <option key={index} value={item?.name}>{item?.name}</option>
                  }):  <option disabled>No Hay Datos</option>
                  }
                 
                </select>
                {formik.touched.brand && formik.errors.brand && (
                  <p className="text-red-500 text-sm">{formik.errors.brand}</p>
                )}
              </div>

              {/* Campos de tipo radio */}

              <div className="">
                <label className="text-sm font-medium text-gray-700">
                  Estado *
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      checked={formik.values.status === "Active"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    Activo
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="Inactive"
                      checked={formik.values.status === "Inactive"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    Inactivo
                  </label>
                </div>
              </div>

              <div className="">
                <label className="text-sm font-medium text-gray-700">
                  ¿Se puede comprar?
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="canPurchaeAble"
                      value="Yes"
                      checked={formik.values.canPurchaeAble === "Yes"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    Sí
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="canPurchaeAble"
                      value="No"
                      checked={formik.values.canPurchaeAble === "No"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>

              <div className="">
                <label className=" text-sm font-medium text-gray-700">
                  ¿Habilitar stock agotado?
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="showStock"
                      value="Enable"
                      checked={formik.values.showStock === "Enable"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    Habilitar
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="showStockOut"
                      value="Disable"
                      checked={formik.values.showStock === "Disable"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    Deshabilitar
                  </label>
                </div>
              </div>

              <div className="">
                <label className=" text-sm font-medium text-gray-700">
                  ¿Es reembolsable?
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="refundable"
                      value="Yes"
                      checked={formik.values.refundable === "Yes"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    Sí
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="refundable"
                      value="No"
                      checked={formik.values.refundable === "No"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>

              {/* Campos restantes */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cantidad Máxima de Compra
                </label>
                <input
                  type="number"
                  name="maximunPurchaseQuantity"
                  value={formik.values.maximunPurchaseQuantity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Advertencia de Bajo Stock
                </label>
                <input
                  type="number"
                  name="lowStockQuantityWarning"
                  value={formik.values.lowStockQuantityWarning}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Unidad *
                </label>
                <select
                  name="unit"
                  value={formik.values.unit}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 block w-full border ${
                    formik.touched.unit && formik.errors.unit
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm p-2`}
                >
                  <option value="" disabled>
                    Selecciona una unidad
                  </option>
                  <option value="unidad">Unidad</option>
                  <option value="paquete">Paquete</option>
                  <option value="docena">Docena</option>
                  <option value="kilogramo">Kilogramo</option>
                </select>
                {formik.touched.unit && formik.errors.unit && (
                  <p className="text-red-500 text-sm">{formik.errors.unit}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Peso
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formik.values.weight}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Etiquetas (Tags)
                </label>
                <input
                  type="text"
                  name="tags"
                  placeholder="Ingrese etiquetas separadas por comas"
                  value={formik.values.tags}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                {formik.touched.tags && formik.errors.tags && (
                  <p className="text-red-500 text-sm">{formik.errors.tags}</p>
                )}
              </div>

              {/* Campo de descripción */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Descripción *
                </label>
                <JoditEditor
                  value={editorContent}
                  onBlur={(newContent) => {
                    setEditorContent(newContent);
                    formik.setFieldValue("description", newContent);
                  }}
                />
                {formik.errors.description && formik.touched.description && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.description}
                  </div>
                )}
              </div>
              {/* Botones */}
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="submit"
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  {isEdit ? "Editar" : "Guardar"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductForm;
