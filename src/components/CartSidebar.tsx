import { IoClose } from "react-icons/io5";
import { Transition } from "@headlessui/react";
import { axiosInstance } from "@/lib/axiosInstance";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";  // Importar js-cookie


interface CartSideProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CartSideBar: React.FC<CartSideProps> = ({ isOpen, setIsOpen }) => {
  const [cart, setCart] = useState([]);
  const router = useRouter()

  const fetchCart = async () => {
    try {
      const response = await axiosInstance.get("/cart");
  
      if (response?.data?.status) {
        setCart(response?.data?.data );
      } else {
        console.error("Error en la respuesta:", response.data);
      }
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
    }
  };
  

  useEffect(() => {
    const token = Cookies.get("token");  // Obtener el token de las cookies
    if (token) {
      fetchCart();  // Solo si el token existe, realizamos el fetch
    } else {
      console.log("Usuario no autenticado, no se puede obtener el carrito.");
    }
  }, []);

  const updateCartItem = async (
    productId: string,
    variationId: string,
    newQuantity: number
  ) => {
    try {
      const response = await axiosInstance.put(`/cart/${productId}`, {
        quantity: newQuantity,
        variationId: variationId,
      });
      if (response?.data?.status) {
        fetchCart(); // Actualizar el carrito tras la modificación
      }
    } catch (error) {
      console.error("Error al actualizar el carrito:", error);
    }
  };

  const handleDeleteProduct = async (
    productId: string,
    variationId: string
  ) => {
    try {
      await axiosInstance
        .delete(`/cart/${productId}/${variationId}`)
        .then((data) => {
          if (data?.data?.data) {
            fetchCart();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const clearCart = async () => {
    try {
      await axiosInstance.delete("/cart");
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex justify-end z-50 ${
        isOpen ? "block translate-x-100" : "hidden translate-x-0"
      } transition-x-100`}
    >
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-0"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <Transition
        show={isOpen}
        enter="transform transition ease-in-out"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition ease-in-out duration-300"
      >
        <div className="w-[400px] bg-white h-full shadow-lg transform overflow-y-auto">
          {/* Header */}
          <div className="p-4 border-0 border-gray-200 flex justify-between items-center">
            <h2>Carrito de Compras</h2>
            <button className="text-gray-600 hover:text-gray-900">
              <IoClose onClick={() => setIsOpen(false)} />
            </button>
          </div>

          {/* Productoss del Carrito */}
          <div className="p-4">
            <div className="flex flex-col">
              {cart?.items?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center w-full border-b pb-4"
                  >
                    <img
                      src={`${item?.product?.images[0]?.url}`}
                      alt="Carrito item"
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="ml-4 w-full flex justify-between items-center">
                      <div className="w-1/2">
                        <div>
                          <h3 className="text-sm font-semibold">
                            {item?.product?.name} - {item?.variationData?.color+", "+item?.variationData?.size}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {"Bs." + item?.product?.buyingPrice}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <button
                              onClick={() =>
                                updateCartItem(
                                  item.product._id,
                                  item.variation,
                                  item.quantity - 1
                                )
                              }
                              className="text-gray-600 border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="text-m font-medium">
                              {item?.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateCartItem(
                                  item.product._id,
                                  item.variation,
                                  item.quantity + 1
                                )
                              }
                              className="text-gray-600 border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="w-1/2 flex justify-end">
                        <button
                          onClick={() => {
                            handleDeleteProduct(
                              item?.product?._id,
                              item?.variation
                            );
                          }}
                          className="w-8 h-8 p-2 shadow rounded-full bg-red-300 hover:bg-red-700"
                        >
                          <MdDelete className="text-red-700 hover:text-red-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            </div>
              {cart?.items?.length > 0 ? (
                <div className="p-4 border-t border-gray-200">
                  <button
                    onClick={clearCart}
                    className="mb-3 w-full  text-red-500 p-3 rounded-lg hover:text-red-700 transition"
                  >
                    Borrar Productos
                  </button>
                  <button onClick={() => {router.push("/checkout"); setIsOpen(false)}} className="w-full bg-[#ff450070] text-white p-3 rounded-lg hover:bg-[#ff4500] transition">
                    Proceder con la Compra
                  </button>{" "}
                </div>
              ) : (
                <img alt="carrito vacio" src="/carritoVacio.png" className="w-56 h-56 block mx-auto"/>
              )}
            
        
        </div>
      </Transition>
    </div>
  );
};

export default CartSideBar;
