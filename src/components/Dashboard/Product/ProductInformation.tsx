"use client";
import React from "react";
import { Product } from "@/types/types";

interface ProductInformationProps {
  product: Product;
}

const ProductInformation: React.FC<ProductInformationProps> = ({ product }) => {
  return (
    <div className="p-4 md:p-8 g-white shadow rounded-md">
      <div className="border-b pb-4 mb-4">
        <h1 className="text-lg md:text-xl font-semibold shadow text-gray-500">
          Información del Producto
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between">
            <span className="font-semibold">Nombre</span>
            <span>{product.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Categoría</span>
            <span>{product.category}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Marca</span>
            <span>{product.brand}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Precio de Compra</span>
            <span>{product.buyingPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Cantidad Máxima de Compra</span>
            <span>{product.maximunPurchaseQuantity}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Peso</span>
            <span>{product.weight || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Comprable</span>
            <span>{product.canPurchaeAble === "Yes" ? "Sí" : "No"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Reembolsable</span>
            <span>{product.refundable === "Yes" ? "Sí" : "No"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Etiquetas</span>
           <span>{product.tags}</span>
          </div>
        </div>
        <div className="">
          <div className="flex justify-between">
            <span className="font-semibold">SKU</span>
            <span>{product.sku}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Código de Barras</span>
            <span>{product.barcode}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Impuesto</span>
            <span>{product.tax}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Precio de Venta</span>
            <span>{product.sellingPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Advertencia de Bajo Stock</span>
            <span>{product.lowStockQuantityWarning}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Unidad</span>
            <span>{product.unit}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Mostrar Stock Agotado</span>
            <span>{product.showStock === "Enable" ? "Habilitado" : "Deshabilitado"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Estado</span>
            <span>{product.status === "Active" ? "Activo" : "Inactivo"}</span>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-lg md:text-xl font-semibold">Descripción</h2>
        <p
          className="mt-2 text-sm md:text-base"
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></p>

        {/* <h3 className="text-lg md:text-xl font-semibold mt-4">Beneficios</h3>
        <ul className="list-disc list-inside mt-2 text-sm md:text-base">
          {product.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
        <h3 className="text-lg md:text-xl font-semibold mt-4">
          Detalles del Producto
        </h3>
        <ul className="list-disc list-inside mt-2 text-sm md:text-base">
          {product.productDetails.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default ProductInformation;
