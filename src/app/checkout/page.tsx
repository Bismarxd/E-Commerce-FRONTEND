"use client";
import AddressSection from "@/components/AddressSection";
import AddressForm from "@/components/AdressForm";
import { axiosInstance } from "@/lib/axiosInstance";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

interface Address {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  streetAddress: string;
}

interface OrderSummary {
  subtotal: number;
  tax: number;
  shippingCharge: number;
  discount: number;
  total: number;
}

interface Product {
  name: string;
  sellingPrice: number;
  images: { url: string }[];
}

interface VariationData {
  color: string;
  size: string;
  sku: string;
}

interface CartItem {
  product: Product;
  variationData: VariationData;
  quantity: number;
}

interface AddressState {
  billingAddress: Address;
  shippingAddress: Address;
  paymentType?: string;
  orderType?: string;
}

const Checkout: React.FC = () => {
  const [orderSummary, setOrderSummary] = useState<OrderSummary>({
    subtotal: 0,
    tax: 0,
    shippingCharge: 0,
    discount: 0,
    total: 0,
  });

  const generateOrderSummary = (
    items: CartItem[],
    taxRate = 0.3,
    shippingCharge = 10,
    discountRate = 0
  ): OrderSummary => {
    const subtotal = items.reduce(
      (total, item) => total + item.product.sellingPrice * item.quantity,
      0
    );
    const tax = subtotal * taxRate;
    const discount = subtotal * discountRate;
    const total = subtotal + tax + shippingCharge - discount;

    return {
      subtotal: Number(subtotal.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      shippingCharge: Number(shippingCharge.toFixed(2)),
      discount: Number(discount.toFixed(2)),
      total: Number(total.toFixed(2)),
    };
  };

  const [showBillingAddress, setShowBillingAddress] = useState(true);

  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [addressType, setAddressType] = useState("");
  const [addresses, setAddresses] = useState<AddressState>({
    billingAddress: {
      fullName: "",
      email: "",
      phone: "",
      country: "",
      state: "",
      city: "",
      zipCode: "",
      streetAddress: "",
    },
    shippingAddress: {
      fullName: "",
      email: "",
      phone: "",
      country: "",
      state: "",
      city: "",
      zipCode: "",
      streetAddress: "",
    },
  });
  const [items, setItems] = useState<CartItem[]>([]);

  const handleOpenForm = (title: string) => {
    setAddressType(title);
    setIsAddressFormOpen(true);
  };

  const handleEditForm = (title: string) => {
    setAddressType(title);
    setIsAddressFormOpen(true);
  };
  const handleCloseForm = () => setIsAddressFormOpen(false);

  // const [deliveryMethod, setEntregaMethod] = useState<"Entrega" | "Recoger">(
  //   "Entrega"
  // );

  const fetchAddress = async () => {
    await axiosInstance.get("/user").then((data) => {
      if (data?.data?.status) {
        setAddresses({
          shippingAddress: data?.data?.user?.shippingAddress,
          billingAddress: data?.data?.user?.billingAddress,
        });
      }
    });

    await axiosInstance.get("/cart").then((data) => {
      if (data?.data?.status) {
        setItems(data?.data?.data?.items);
        // Calcular y actualizar orderSummary inmediatamente
        const summary = generateOrderSummary(data?.data?.data?.items);
        setOrderSummary(summary);
      }
    });
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  const handleSaveAndPay = () => {
    const data = {
      paymentType: addresses?.paymentType,
      orderType: addresses?.orderType,
      shippingAddress: addresses?.shippingAddress,
      billingAddress: addresses?.billingAddress,
      total: orderSummary?.total,
      shippingCharge: orderSummary?.shippingCharge,
      discount: orderSummary?.discount,
      tax: orderSummary?.tax,
      subtotal: orderSummary?.subtotal,
      items: items?.map((item) => {
        return {
          productName: item?.product.name,
          productImage: item?.product?.images?.[0]?.url,
          price: item?.product.sellingPrice,
          color: item?.variationData?.color,
          size: item?.variationData?.size,
          quantity: item?.quantity,
          sku: item?.variationData?.sku,
        };
      }),
    };
    console.log("Order data being sent:", data);

    axiosInstance.post("order", data).then((data) => {
      if (data?.data?.status) {
        alert("Añadido Orden");
      }
    });
  };



  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">
        Proporcione su Información de Envío
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        Verifique su información antes de continuar
      </p>
      {/* Progress Bar */}
      <div className="flex items-center mb-6">
        <div className="flex-1">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
              1
            </div>
            <div className="flex-1 h-1 bg-green-500"></div>
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
              2
            </div>
            <div className="flex-1 h-1 bg-gray-300"></div>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
              3
            </div>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span>Carrito</span>
            <span>Verificar</span>
            <span>Pagar</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Tipo de Envío */}
        <div className="flex-1">
          <h2 className="text-gray-800 font-medium mb-2">Tipo de Envío</h2>
          <select
            name="orderType"
            className="w-full rounded-xl border border-gray-300 bg-slate-700 text-white px-4 py-2 shadow focus:outline-none focus:ring-2 focus:ring-slate-400"
            onChange={(e) =>
              setAddresses((prev) => ({
                ...prev,
                orderType: e.target.value,
              }))
            }
            
          >
            <option value="Presencial">Presencial</option>
            <option value="Delivery">Delivery</option>
            <option value="Preventa">Preventa</option>
            <option value="Envio">Envio</option>
          </select>
        </div>

        {/* Tipo de Pago */}
        <div className="flex-1">
          <h2 className="text-gray-800 font-medium mb-2">Tipo de Pago</h2>
          <select
            name="paymentType"
            className="w-full rounded-xl border border-gray-300 bg-slate-700 text-white px-4 py-2 shadow focus:outline-none focus:ring-2 focus:ring-slate-400"
            onChange={(e) =>
              setAddresses((prev) => ({
                ...prev,
                paymentType: e.target.value,
              }))
            }
            
          >
            <option value="Efectivo">Efectivo</option>
            <option value="Transferencia">Transferencia</option>
            <option value="Qr">QR</option>
          </select>
        </div>
      </div>

      {/* Entrega / Recoger Switch */}
      {/* <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            deliveryMethod === "Entrega"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setEntregaMethod("Entrega")}
        >
          Entrega
        </button>
        <button
          className={`px-4 py-2 rounded ${
            deliveryMethod === "Recoger"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setEntregaMethod("Recoger")}
        >
          Recoger
        </button>
      </div> */}

      <div className="gap-3">
        <AddressSection
          title="Dirección de Envio"
          handleOpenForm={handleOpenForm}
          handleEditForm={handleEditForm}
          addresses={addresses}
        />

        {!showBillingAddress ? (
          <AddressSection
            title="Dirección de Facturación"
            handleOpenForm={handleOpenForm}
            handleEditForm={handleEditForm}
            addresses={addresses}
          />
        ) : (
          ""
        )}

        <div className="mt-5">
          <input
            onChange={(e) => setShowBillingAddress(e?.target?.checked)}
            type="checkbox"
            checked={showBillingAddress}
            className="mr-2"
          />{" "}
          Guardar la dirección de envío como dirección de facturación
        </div>
      </div>

      <div className="mb-6">
        {items.map((item, index) => {
          return (
            // Necesitas el return para renderizar cada item
            <div
              key={index}
              className="bg-white shadow-md p-4 rounded-md flex items-center gap-3 mt-4"
            >
              <div>
                <img
                  className="w-20 h-20 rounded"
                  src={item?.product?.images?.[0]?.url}
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  {item?.product?.name +
                    ", " +
                    item?.variationData?.size +
                    ", " +
                    item?.variationData?.color}
                </h2>
                <p>
                  <b>Cantidad: </b>
                  {item?.quantity}
                </p>
                <p>
                  <b>Precio:</b> Bs.{item?.product.sellingPrice}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white p-4 rounded shadow mt-6">
        <h2 className="text-lg font-semibold mb-4">Resumen del Pedido</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal (Monto Parcial)</span>
            <span>Bs. {orderSummary?.subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Impuesto</span>
            <span>Bs. {orderSummary?.tax}</span>
          </div>
          <div className="flex justify-between">
            <span>Cargo de Envío</span>
            <span>Bs. {orderSummary?.shippingCharge}</span>
          </div>
          <div className="flex justify-between">
            <span>Descuento</span>
            <span>Bs. {orderSummary?.discount}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Monto Total</span>
            <span>Bs. {orderSummary?.total}</span>
          </div>
        </div>
        <button className="bg-blue-100 text-blue-500 px-4 py-2 rounded w-full flex items-center justify-between mt-4">
          <span>Aplicar Código de Cupón</span>
          <FaArrowRight />
        </button>
      </div>

      <div className="flex justify-between mt-6">
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">
          Volver al Carrito
        </button>
        <button
          onClick={handleSaveAndPay}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Guardar y Pagar
        </button>
      </div>

      {isAddressFormOpen && (
        <AddressForm
          fetchAddress={fetchAddress}
          title={addressType}
          setAddressType={setAddressType}
          billingAddress={addresses?.billingAddress}
          shippingAddress={addresses?.shippingAddress}
          showBillingAddress={showBillingAddress}
          isOpen={isAddressFormOpen}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default Checkout;
